import Team from "../../../models/team.model"
import { controller, errorFormatter, toBool } from "../../common"
import GenPayload from "../../GenPayload"

const MAX_DEFENSE_POINTS = 1_000
const DEFENSE_POINT_COST = 2_500

const buyDefensePoints: controller = async (req, res) => {
  if (
    !toBool(process.env.ROUND1_ACTIVE) &&
    !toBool(process.env.ROUND2_ACTIVE) &&
    !toBool(process.env.ROUND3_ACTIVE)
  )
    return res
      .status(400)
      .send({ message: "Buying Defense Points Not Available yet." })

  const numOfPoints = parseInt(req.body.numOfPoints)
  if (numOfPoints > MAX_DEFENSE_POINTS)
    return res
      .status(406)
      .send({ message: "Exceeding Max Defense Points Limit" })

  const id = req.teamId
  try {
    const team = await Team.findById(id)
    console.log(team.defensePoints + numOfPoints)
    if (team.defensePoints + numOfPoints > MAX_DEFENSE_POINTS)
      return res
        .status(406)
        .send({ message: "Exceeding Max Defense Points Limit" })

    const cost = numOfPoints * DEFENSE_POINT_COST

    if (cost > team.money)
      return res.status(406).send({ message: "Insufficient Funds" })

    await team.updateOne({
      $inc: {
        defensePoints: numOfPoints,
        money: -1 * cost,
      },
      $push: {
        logs: {
          logType: "Defense Points",
          message: numOfPoints + " Defense Points Purchased",
        },
      },
    })

    const updatedTeam = team
    updatedTeam.defensePoints += numOfPoints
    updatedTeam.money -= cost

    return res.status(200).send({
      message: numOfPoints + " Defense Points Purchased",
      profile: GenPayload(updatedTeam),
    })
  } catch (err) {
    console.log({ buyDefensePoints: err })
    const e = errorFormatter(err.message)
    console.log({ buyDefensePoints: e })
    return res.status(400).send(e)
  }
}

export default buyDefensePoints
