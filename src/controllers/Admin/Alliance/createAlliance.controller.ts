import { Response } from "express"
import Team from "../../../models/team.model"
import { controller, errorFormatter, toBool } from "../../common"

const PERCENTAGE_OF_POINTS_SHARED = 20

const check_if_already_in_alliance = async (
  teamName: string,
  res: Response
) => {
  const team = await Team.findOne({ teamName: teamName })
  if (team.inAlliance) {
    res.status(400).send({
      message:
        teamName +
        " is already in an alliance with " +
        team.allianceHistory[team.allianceHistory.length - 1].teamName,
    })
    return null
  }

  return team
}

const createAlliance: controller = async (req, res) => {
  if (
    !toBool(process.env.ROUND1_ACTIVE) &&
    !toBool(process.env.ROUND2_ACTIVE) &&
    !toBool(process.env.ROUND3_ACTIVE)
  )
    return res
      .status(400)
      .send({ message: "Buying Defense Points Not Available yet." })

  const { teamName1, teamName2 } = req.body

  if (!teamName1 || !teamName2)
    return res.status(400).send({ message: "Specify the Team Names!" })

  try {
    const team1 = await check_if_already_in_alliance(teamName1, res)
    if (!team1) return
    const team2 = await check_if_already_in_alliance(teamName2, res)
    if (!team2) return

    await team1.updateOne({
      $set: {
        inAlliance: true,
        sharedDefensePoints: Math.floor(
          (team2.defensePoints * PERCENTAGE_OF_POINTS_SHARED) / 100
        ),
      },
      $push: {
        allianceHistory: { teamName: teamName2 },
        logs: {
          logType: "Alliance Formed",
          message:
            "Alliance between " + teamName1 + " and " + teamName2 + " created.",
        },
      },
    })

    await team2.updateOne({
      $set: {
        inAlliance: true,
        sharedDefensePoints: Math.floor(
          (team1.defensePoints * PERCENTAGE_OF_POINTS_SHARED) / 100
        ),
      },
      $push: {
        allianceHistory: { teamName: teamName1 },
        logs: {
          logType: "Alliance Formed",
          message:
            "Alliance between " + teamName1 + " and " + teamName2 + " created.",
        },
      },
    })

    return res.status(200).send({
      message:
        "Alliance between " + teamName1 + " and " + teamName2 + " created.",
    })
  } catch (err) {
    console.log({ createAlliance: err })
    const e = errorFormatter(err.message)
    console.log({ createAlliance: e })
    return res.status(400).send(e)
  }
}

export default createAlliance
