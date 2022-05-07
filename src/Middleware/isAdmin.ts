import jwt from "jsonwebtoken"
import { controller } from "../controllers/common"

const isAdmin: controller = async (req, res, next) => {
  const token = req.cookies["wartrade-admin"]

  if (!token) return res.clearCookie("wartrade-admin").sendStatus(400)

  const verifiedToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET) as {
    id: string
  }
  if (verifiedToken) {
    next()
  } else return res.clearCookie("wartrade-admin").sendStatus(403)
}

export default isAdmin
