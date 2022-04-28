import { Router } from "express"
import generateToken from "../controllers/ForgotPassword/generateToken"
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

publicRouter.post("/forgot-password", generateToken)

export default publicRouter
