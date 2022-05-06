import { hash } from "bcrypt"
import Team from "../../../models/team.model"
import { controller, errorFormatter } from "../../common"

const changePassword: controller = async (req, res) => {
  const { password, id } = req.body

  try {
    await Team.updateOne(
      { _id: id },
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
