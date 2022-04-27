import { nanoid } from "nanoid"
import Team, { teamI } from "../../models/team.model"
import { controller, errorFormatter } from "../common"

const createTeam: controller = async (req, res) => {
  const { teamName, leader, password } = req.body as teamI

  try {
    const exists = await Team.findOne({ teamName }).lean()
    if (exists) return res.status(500).send("Team Name Already in use")

    await Team.create({
      teamName,
      password,
      leader,
      code: nanoid(9),
    })

    return res.status(201).send({ message: `Team "${teamName}" Created` })
  } catch (err) {
    console.log(err)

    const e = errorFormatter(err.message)
    console.log({ createTeam: e })
    return res.status(500).send(e)
  }
}

export default createTeam
