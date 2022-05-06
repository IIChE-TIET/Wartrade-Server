import jwt from "jsonwebtoken"
import { controller } from "../controllers/common"

const authenticate: controller = async (req, res, next) => {
  const token = req.cookies["wartrade"]
  if (!token) return res.clearCookie("wartrade").sendStatus(400)

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET) as {
    id: string
  }
  if (verifiedToken) {
    req.teamId = verifiedToken.id
    next()
  } else return res.clearCookie("wartrade").sendStatus(403)
}

export default authenticate
