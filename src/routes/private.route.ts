import { Router } from "express"
import attack from "../controllers/Private/Attack/attack.controller"
import buyBombs from "../controllers/Private/BuyBombs/buyBombs.controller"
import buyDefensePoints from "../controllers/Private/BuyDefensePoints/buyDefensePoints.controller"
import logout from "../controllers/Private/Logout"
import getProfile from "../controllers/Private/Profile/getProfile"
import gameActive from "../Middleware/gameActive"

const privateRouter = Router()

privateRouter.get("/", getProfile)

privateRouter.get("/logout", logout)

privateRouter.post("/buyBombs", gameActive, buyBombs)

privateRouter.post("/buyDefensePoints", gameActive, buyDefensePoints)

privateRouter.post("/attack", gameActive, attack)

export default privateRouter
