import { Express } from "express"
import authenticate from "../Middleware/authenticate"
import isAdmin from "../Middleware/isAdmin"
import adminRouter from "./admin.route"
import privateRouter from "./private.route"
import publicRouter from "./public.route"

const Routes = (app: Express) => {
  app.use("/", publicRouter)
  app.use("/private", authenticate, privateRouter)
  app.use("/admin", isAdmin, adminRouter)
}

export default Routes
