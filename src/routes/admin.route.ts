import { Router } from "express"
import createAlliance from "../controllers/Admin/Alliance/createAlliance.controller"
import adminLogout from "../controllers/Admin/logout"
import trading from "../controllers/Admin/Trading/trading.controller"
import gameActive from "../Middleware/gameActive"

const adminRouter = Router()

adminRouter.get("/logout", adminLogout)

adminRouter.post("/alliance", gameActive, createAlliance)

adminRouter.post("/trading", gameActive, trading)

export default adminRouter
