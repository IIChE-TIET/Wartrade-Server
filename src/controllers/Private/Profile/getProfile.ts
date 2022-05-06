import Team from "../../../models/team.model"
import { controller, errorFormatter } from "../../common"
import GenPayload from "../../GenPayload"

const getProfile: controller = async (req, res) => {
  const id = req.teamId

  try {
    const team = await Team.findOne({ _id: id }).lean()
    if (!team) return res.clearCookie("wartrade").sendStatus(400)
    const payload = GenPayload(team)
    return res.status(200).send({
      team: payload,
    })
  } catch (err) {
    console.log({ profile: err })
    const e = errorFormatter(err.message)
    console.log({ profile: e })
    return res.status(400).send(e)
  }
}
export default getProfile
