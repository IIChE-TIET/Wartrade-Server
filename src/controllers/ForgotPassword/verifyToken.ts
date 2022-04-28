import jwt from "jsonwebtoken"
import Token from "../../models/token.model"
import { controller, errorFormatter } from "../common"

const verifyToken: controller = async (req, res) => {
  const { token, teamName } = req.body

  try {
    const validToken = await Token.findOne({ teamName: teamName, token: token })
    console.log(validToken)
    if (!validToken)
      return res.status(403).send({ message: "Invalid Token or expired" })

    const payload = jwt.sign({ teamName }, process.env.JWT_SECRET)

    return res
      .cookie("wartrade-forgot", payload, {
        maxAge: 1000 * 60 * 10,
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .status(200)
      .send({ access: true })
  } catch (err) {
    console.log({ generateToken: err })
    const e = errorFormatter(err.message)
    console.log({ generateToken: e })
    return res.status(400).send(e)
  }
}

export default verifyToken
