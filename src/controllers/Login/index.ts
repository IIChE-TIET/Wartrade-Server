import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Team from "../../models/team.model"
import { controller, genPayload } from "../common"

const login: controller = async (req, res) => {
  const errMessage = "Incorrect Team Name or Password"
  const successMessage = "Login Successfull"
  const { teamName, password } = req.body as {
    teamName: string
    password: string
  }

  if (!teamName || !password)
    return res.status(400).send({ message: errMessage })
  try {
    const team = await Team.findOne({ teamName: teamName.trim() }).lean()
    if (!team) return res.status(404).send({ message: errMessage })
    const sanitizedPassword = password.trim()
    if (!(await bcrypt.compare(sanitizedPassword, team.password)))
      return res.status(404).send({ message: errMessage })

    const token = jwt.sign(
      {
        id: team._id,
      },
      process.env.JWT_SECRET
    )

    return res
      .cookie("wartrade", token, {
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .status(200)
      .send({ message: successMessage, team: genPayload(team) })
  } catch (err) {
    console.error({ Login: err })
    return res.status(500).send(err)
  }
}

export default login
