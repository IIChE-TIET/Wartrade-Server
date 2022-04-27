import { Router } from "express"
import logout from "../controllers/Logout"
import getProfile from "../controllers/Profile/getProfile"

const privateRouter = Router()

privateRouter.get("/", getProfile)

privateRouter.get("/logout", logout)

export default privateRouter
