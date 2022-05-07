import { nanoid } from "nanoid"
import createTeamMail from "../../../Mail/createTeam.mail"
import Team, { teamI } from "../../../models/team.model"
import { controller, errorFormatter, toBool } from "../../common"

const createTeam: controller = async (req, res) => {
  if (!toBool(process.env.CREATE_NEW_TEAM_ALLOWED))
    return res.status(400).send({ message: "Registrations Have Stopped." })

  const { teamName, leader, password } = req.body as teamI

  try {
    const exists = await Team.findOne({
      $or: [
        { teamName },
        { "leader.email": leader.email },
        { "members.email": leader.email },
        { "leader.phone": "leader.phone" },
        { "members.phone": leader.phone },
      ],
    }).lean()
    if (exists)
      return res
        .status(500)
        .send({ message: "Team Name/Email/Phone  Already in use" })
    const code = nanoid(9)
    await Team.create({
      teamName,
      password,
      leader,
      code,
    })

    createTeamMail(leader.email, teamName, code)

    return res.status(201).send({ message: `Team "${teamName}" Created` })
  } catch (err) {
    console.log(err)

    const e = errorFormatter(err.message)
    console.log({ createTeam: e })
    return res.status(500).send(e)
  }
}

export default createTeam
