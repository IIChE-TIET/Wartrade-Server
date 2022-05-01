import { Router } from "express"
import changePassword from "../controllers/ForgotPassword/changePassword"
import generateToken from "../controllers/ForgotPassword/generateToken"
import verifyToken from "../controllers/ForgotPassword/verifyToken"
import getTeams from "../controllers/getTeams"
import login from "../controllers/Login"
import createTeam from "../controllers/Registration/createTeam"
import joinTeam, {
  memberAlreadyExists,
  teamExistsandHasSpace,
} from "../controllers/Registration/joinTeam"

const publicRouter = Router()

publicRouter.get("/", getTeams)

publicRouter.post("/", login)

publicRouter.post("/create", createTeam)

publicRouter.post("/join", teamExistsandHasSpace, memberAlreadyExists, joinTeam)

publicRouter.post("/forgotPassword/generateToken", generateToken)

publicRouter.post("/forgotPassword/verifyToken/:teamName/:token", verifyToken)

publicRouter.post("/forgotPassword/change", changePassword)

export default publicRouter
