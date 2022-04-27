import Team from "../../models/team.model"
import { controller, genPayload } from "../common"

const getProfile: controller = async (req, res) => {
  const id = req.teamId

  try {
    const team = await Team.findOne({ _id: id }).lean()
    if (!team || !team.allowed)
      return res.clearCookie("wartrade").sendStatus(400)
    const payload = genPayload(team)
    return res.status(200).send({
      team: payload,
    })
  } catch (err) {
    console.error({ getProfile: err })
    return res.status(500).send(err)
  }
}
export default getProfile
