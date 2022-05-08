import Team from "../../models/team.model"
import { controller, errorFormatter } from "../common"

const teamStats: controller = async (req, res) => {
  try {
    const teams = await Team.find({ allowed: true }).lean()

    const payload = teams.map(team => ({
      countryName: team.countryName,
      infra: Math.floor(team.infra),
      defense: Math.floor(team.defensePoints),
      money: Math.floor(team.money),
    }))

    return res.status(200).send({ teams: payload, message: "Successfull" })
  } catch (err) {
    const e = errorFormatter(err.message)
    console.log({ teamStats: e })

    return res.status(500).send(e)
  }
}

export default teamStats
