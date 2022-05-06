import { nanoid } from "nanoid"
import forgotPasswordMail from "../../../Mail/forgotPassword.mail"
import Team, { teamI } from "../../../models/team.model"
import Token from "../../../models/token.model"
import { controller, errorFormatter } from "../../common"

const generateToken: controller = async (req, res) => {
  const { teamName } = req.body as teamI
  try {
    const team = await Team.findOne({ teamName: teamName.trim() }).lean()

    if (!team) return res.status(404).send("Team not registered")

    const token = nanoid(21)
    await Token.create({
      teamName: teamName,
      token,
    })

    const resetLink = encodeURI(
      (process.env.NODE_ENV === "production"
        ? "https://wartrade.netlify.app/forgotPassword/"
        : "http://localhost:3000/forgotPassword/") +
        teamName +
        "/" +
        token
    )

    await forgotPasswordMail(team.leader.email, resetLink)

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
