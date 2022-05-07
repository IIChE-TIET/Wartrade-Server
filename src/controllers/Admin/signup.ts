import Admin from "../../models/admin.model"
import { controller, errorFormatter } from "../common"

const AdminSignup: controller = async (req, res) => {
  const { name, password, code } = req.body

  if (!name || !password || !code)
    return res.status(400).send({ message: "Incomplete Parameters" })

  if (code !== process.env.ADMIN_CODE)
    return res.status(403).send({ message: "Incorrect Code" })

  try {
    await Admin.create({ name, password })
    return res.status(202).send({ message: "Admin Account Created" })
  } catch (err) {
    console.log({ profile: err })
    const e = errorFormatter(err.message)
    console.log({ profile: e })
    return res.status(500).send(e)
  }
}

export default AdminSignup
