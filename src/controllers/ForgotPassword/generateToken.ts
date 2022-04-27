import { nanoid } from "nanoid"
import Team from "../../models/team.model"
import Token from "../../models/token.model"
import { controller, errorFormatter } from "../common"

const generateToken: controller = async (req, res) => {
  const { teamName } = req.body
  try {
    console.log(teamName)
    const team = await Team.findOne({ teamName: teamName })

    if (!team) return res.send("Team not registered")

    const token = nanoid(6)
    await Token.create({
      teamName,
      token,
    })

    const link = `${process.env.BASE_URL}/reset-password/${teamName}/${token}`
    console.log(link)

    return res
      .status(200)
      .send({ message: "Reset Link Sent to the Requested Mail" })
  } catch (err) {
    console.log({ generateToken: err })
    const e = errorFormatter(err.message)
    console.log({ generateToken: e })
    return res.status(400).send(e)
  }
}

export default generateToken
