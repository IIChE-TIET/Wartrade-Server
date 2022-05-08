import Team, { teamI } from "../../models/team.model"
import { controller } from "../common"
import { getBannedBombs } from "../Private/BuyBombs/BombsList"

const removeBannedBombs = (
  bannedBombs: {
    bombName: string
    value: number
    unit: "Mt" | "Kt"
    price: number
    element: string[]
    pool: number
  }[],
  ownedBombs: teamI["bombs"]
) => {
  if (!bannedBombs) return ownedBombs

  const filteredBombs: teamI["bombs"] = [[], [], [], [], []]
  bannedBombs.forEach(bannedBomb => {
    const pool = ownedBombs[bannedBomb.pool].filter(
      b => b.bombName !== bannedBomb.bombName
    )
    filteredBombs[bannedBomb.pool].push(...pool)
  })
  return filteredBombs
}

const Crisis: controller = async (req, res) => {
  try {
    const teams = await Team.find(
      { allowed: true },
      { bombs: 1, countryName: 1, banned: 1 }
    ).lean()

    teams.forEach(async team => {
      const ownedBombs = team.bombs.flat()
      const bannedBombs = getBannedBombs(team.banned.toLowerCase())

      const filteredBombs = removeBannedBombs(bannedBombs, team.bombs)

      console.log(ownedBombs.length - filteredBombs.flat().length)

      if (bannedBombs.length > 0) {
        await Team.findByIdAndUpdate(team._id, {
          $set: {
            bombs: filteredBombs,
          },
          $push: {
            logs: {
              logType: "CRISIS",
              message: "Bombs were revoked due to crisis",
            },
          },
        })
      }
    })

    return res.status(200).send({ teams })
  } catch (err) {
    console.log({ crisis: err })
    return res.status(500).send(err)
  }
}

export default Crisis
