import teamJoinMail from "../../../Mail/teamJoin.mail"
import Team, { member, teamI } from "../../../models/team.model"
import { controller, errorFormatter } from "../../common"

type body = { member: member; code: teamI["code"] }

export const teamExistsandHasSpace: controller = async (req, res, next) => {
  const { code }: body = req.body
  try {
    const exists = await Team.findOne({ code })
    if (!exists)
      return res.status(404).send({ message: "Team Code Invalid >_<" })
    else if (exists.members.length >= parseInt(process.env.TEAM_STRENGTH) - 1)
      return res
        .status(406)
        .send({ message: "Team Already Full  ╮ (. ❛ ᴗ ❛.) ╭" })
    else req.team = exists
    next()
  } catch (err) {
    const e = errorFormatter(err.message)
    console.log({ teamExistsandHasSpace: e })

    return res.status(500).send(e)
  }
}

export const memberAlreadyExists: controller = async (req, res, next) => {
  const { member }: body = req.body
  try {
    const alreadyMmeber = await Team.findOne({
      $or: [
        {
          "leader.email": member.email,
        },

        {
          "leader.phone": member.phone,
        },
        {
          "members.email": member.email,
        },

        {
          "members.phone": member.phone,
        },
      ],
    }).lean()
    if (alreadyMmeber)
      return res
        .status(400)
        .send({ message: "Already a member of a Guild.\nTry logging in." })
    else next()
  } catch (err) {
    const e = errorFormatter(err.message)
    console.log({ memberDoesntExist: e })

    return res.status(500).send(e)
  }
}

const joinTeam: controller = async (req, res) => {
  const { member }: body = req.body

  try {
    const { team } = req
    await team.updateOne({
      $push: {
        members: member,
      },
    })

    teamJoinMail(team.leader.email, member.name, member.email, team.teamName)

    return res.status(200).send({ message: "Added to Team" })
  } catch (err) {
    console.log(err)
    const e = errorFormatter(err.message)
    console.log({ joinTeam: e })
    return res.status(500).send(e)
  }
}

export default joinTeam
