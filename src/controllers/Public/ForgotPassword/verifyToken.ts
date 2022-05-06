import Team from "../../../models/team.model"
import Token from "../../../models/token.model"
import { controller, errorFormatter } from "../../common"

const verifyToken: controller = async (req, res) => {
  const { token, teamName } = req.params
  console.log({ teamName, token })

  try {
    const validToken = await Token.findOne({
      teamName: teamName,
      token: token,
    }).lean()

    if (!validToken)
      return res.status(403).send({ message: "Invalid Token or expired" })

    const team = await Team.findOne({ teamName }, { _id: 1 }).lean()

    return res.status(200).send({ id: team._id })
  } catch (err) {
    console.log({ generateToken: err })
    const e = errorFormatter(err.message)
    console.log({ generateToken: e })
    return res.status(400).send(e)
  }
}

export default verifyToken
