import { Router } from "express"
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

export default publicRouter
