import Team, { teamI } from "../../../models/team.model"
import { controller, errorFormatter, toBool } from "../../common"
import { findBombByName } from "../BuyBombs/BombsList"
import GenPayload from "./../../GenPayload"

const COOLDOWN_TIME = 3 * 60 * 1000

const DEFENSE_POWER = 10_000

const BASE_DEFENSE = 1_000_000

const BASE_BOUNTY = (defensePoints: number) => defensePoints * 1700

const BOUNTY_PERCENTAGE = 15

const ALLIANCE_HIT = 20

const attackWon = (attackStrength: number, defenseStrength: number) =>
  attackStrength - defenseStrength - BASE_DEFENSE > 0

const inCooldown = (lastAttack: Date) =>
  lastAttack && Date.now() - lastAttack.getTime() < COOLDOWN_TIME

const inAliiance = (defendingTeam: teamI, attackingTeam: teamI) =>
  defendingTeam.inAlliance &&
  attackingTeam.inAlliance &&
  defendingTeam.allianceHistory[defendingTeam.allianceHistory.length - 1]
    .teamName === attackingTeam.teamName

const Attack: controller = async (req, res) => {
  if (!toBool(process.env.ROUND2_ACTIVE) && !toBool(process.env.ROUND3_ACTIVE))
    return res
      .status(400)
      .send({ message: "Attacking Not Available in this round" })

  const { teamName, choosenBombs } = req.body as {
    teamName: string
    choosenBombs: { bombName: string; quantity: number }[]
  }

  console.log({ choosenBombs })

  if (!teamName || !choosenBombs)
    return res.status(400).send({ message: "Incomplete Information" })

  if (choosenBombs.length <= 0)
    return res.status(400).send({ message: "Please Select Bombs" })

  const id = req.teamId

  try {
    const defendingTeam = await Team.findOne({ countryName: teamName })
    if (inCooldown(defendingTeam.lastAttack))
      return res.status(406).send({
        message: `You were too slow. The country is under cooldown, and can't be attacked right now for ${
          (Date.now() - defendingTeam.lastAttack.getTime()) / 1000
        }sec `,
      })

    const attackingTeam = await Team.findById(id)

    if (teamName === attackingTeam.teamName)
      return res.status(406).send({ message: "Can't Attack yourself 🤦‍♂️" })

    if (inAliiance(defendingTeam, attackingTeam))
      return res.status(406).send({ message: "Can't attack allianced country" })

    const attackStrength = choosenBombs.reduce((prev, current) => {
      const bomb = findBombByName(current.bombName)
      return (
        prev +
        bomb.value * current.quantity * (bomb.unit === "Mt" ? 1_000_000 : 1_000)
      )
    }, 0)

    const totalDefensePoints =
      defendingTeam.defensePoints + defendingTeam.sharedDefensePoints

    const defenseStrength =
      (defendingTeam.defensePoints + defendingTeam.sharedDefensePoints) *
      DEFENSE_POWER

    const newBombsList = attackingTeam.bombs

    choosenBombs.forEach(selected => {
      const pool = newBombsList[findBombByName(selected.bombName).pool]

      const index = pool.findIndex(p => p.bombName === selected.bombName)
      if (index < -1 || pool[index].quantity < selected.quantity)
        return res.status(406).send({
          message: "Bomb doesn't exists or insufficient quantity of bomb.",
        })
      pool[index].quantity -= selected.quantity
    })

    if (attackWon(attackStrength, defenseStrength)) {
      const bounty = (defendingTeam.money * BOUNTY_PERCENTAGE) / 100

      const infraGain =
        Math.min(
          (attackStrength - defenseStrength - BASE_DEFENSE) / defenseStrength,
          0.5
        ) * defendingTeam.infra

      let lostDefense =
        -1 *
        Math.min(
          (attackStrength - defenseStrength - BASE_DEFENSE) / DEFENSE_POWER,
          200
        )
      if (totalDefensePoints + lostDefense < 0)
        lostDefense = -1 * defendingTeam.defensePoints

      await attackingTeam.updateOne({
        $inc: {
          money: bounty + BASE_BOUNTY(totalDefensePoints),
          infra: infraGain,
        },
        $set: {
          bombs: newBombsList,
        },
        $push: {
          logs: {
            logType: "War",
            message:
              "Attacked successfully on " +
              teamName +
              " and gained $" +
              (bounty + BASE_BOUNTY(totalDefensePoints)) +
              " and " +
              infraGain +
              " Infrastructure",
          },
        },
      })

      attackingTeam.money += bounty + BASE_BOUNTY(totalDefensePoints)
      attackingTeam.infra += infraGain
      attackingTeam.bombs = newBombsList

      if (defendingTeam.inAlliance)
        await Team.updateOne(
          {
            teamName:
              defendingTeam.allianceHistory[
                defendingTeam.allianceHistory.length - 1
              ].teamName,
          },
          {
            $inc: {
              defensePoints: (lostDefense * ALLIANCE_HIT) / 100,
            },
            $set: {
              inAlliance: false,
              sharedDefensePoints: 0,
            },
            $push: {
              logs: {
                logType: "War",
                message:
                  "Allied Country Failed to defend attack by " +
                  attackingTeam.teamName,
              },
            },
          }
        )
      await defendingTeam.updateOne({
        $inc: {
          money: -1 * bounty,
          infra: -1 * infraGain,
          defensePoints: lostDefense,
        },

        $set: {
          inAlliance: false,
          sharedDefensePoints: 0,
          lastAttack: new Date(),
        },

        $push: {
          logs: {
            logType: "War",
            message:
              "Failed to defend attack by " +
              attackingTeam.teamName +
              ". Lost $" +
              bounty +
              " , " +
              infraGain +
              " infra and " +
              lostDefense +
              " defensePoints",
          },
        },
      })

      return res.status(200).send({
        message: "Attack Carried Out Successfully.",
        profile: GenPayload(attackingTeam),
      })
    } else {
      await attackingTeam.updateOne({
        $set: {
          bombs: newBombsList,
        },
        $push: {
          logs: {
            logType: "War",
            message: "Attacked Failed on " + teamName,
          },
        },
      })

      attackingTeam.bombs = newBombsList

      if (defendingTeam.inAlliance)
        await Team.updateOne(
          {
            teamName:
              defendingTeam.allianceHistory[
                defendingTeam.allianceHistory.length - 1
              ].teamName,
          },
          {
            $set: {
              inAlliance: false,
              sharedDefensePoints: 0,
            },
            $push: {
              logs: {
                logType: "War",
                message:
                  "Allied Country defended successfully attack by " +
                  attackingTeam.teamName,
              },
            },
          }
        )
      await defendingTeam.updateOne({
        $set: {
          inAlliance: false,
          sharedDefensePoints: 0,
          lastAttack: new Date(),
        },

        $push: {
          logs: {
            logType: "War",
            message:
              "Defended Successfully attack by " + attackingTeam.teamName,
          },
        },
      })
      return res
        .status(406)
        .send({ message: "Attack Lost", profile: GenPayload(attackingTeam) })
    }
  } catch (err) {
    console.log({ attack: err })
    const e = errorFormatter(err.message)
    console.log({ attack: e })
    return res.status(400).send(e)
  }
}

export default Attack
