import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Admin from "../../models/admin.model"
import { controller, errorFormatter } from "./../common"

const AdminLogin: controller = async (req, res) => {
  const errMessage = "Incorrect Team Name or Password"
  const successMessage = "Login Successfull"

  const { name, password } = req.body

  if (!name || !password) return res.status(400).send({ message: errMessage })
  try {
    const admin = await Admin.findOne({ name: name.trim() }).lean()
    if (!admin) return res.status(404).send({ message: errMessage })
    const sanitizedPassword = password.trim()
    if (!(await bcrypt.compare(sanitizedPassword, admin.password)))
      return res.status(404).send({ message: errMessage })

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_ADMIN_SECRET
    )

    return res
      .cookie("wartrade-admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .status(200)
      .send({ message: successMessage })
  } catch (err) {
    console.log({ login: err })
    const e = errorFormatter(err.message)
    console.log({ login: e })
    return res.status(400).send(e)
  }
}

export default AdminLogin
