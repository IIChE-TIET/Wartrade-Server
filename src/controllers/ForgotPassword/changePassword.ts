import { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import Team from "../../models/team.model"
import { controller, errorFormatter } from "../common"

const changePassword: controller = async (req, res) => {
  const { password } = req.body

  try {
    const token = req.cookies["wartrade"]
    if (!token) return res.clearCookie("wartrade-forgot").sendStatus(400)

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      teamName: string
    }
    if (!verifiedToken)
      return res.clearCookie("wartrade-forgot").sendStatus(400)

    await Team.updateOne(
      { teamName: verifiedToken.teamName },
      {
        $set: {
          password: await hash(password, 10),
        },
      }
    ).lean()

    return res.status(200).send({ message: "Password Updated" })
  } catch (err) {
    console.log({ generateToken: err })
    const e = errorFormatter(err.message)
    console.log({ generateToken: e })
    return res.status(400).send(e)
  }
}

export default changePassword
