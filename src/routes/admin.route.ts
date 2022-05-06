import { Router } from "express"
import createAlliance from "../controllers/Admin/Alliance/createAlliance.controller"
import trading from "../controllers/Admin/Trading/trading.controller"

const adminRouter = Router()

adminRouter.post("/createAlliance", createAlliance)

adminRouter.post("/trade", trading)

export default adminRouter
