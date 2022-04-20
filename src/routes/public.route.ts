import { Router } from "express"
import getTeams from "../controllers/getTeams"
import createTeam from "../controllers/Registration/createTeam"
import joinTeam, {
  memberAlreadyExists,
  teamExistsandHasSpace,
} from "../controllers/Registration/joinTeam"

const publicRouter = Router()

publicRouter.get("/", getTeams)

publicRouter.post("/create", createTeam)

publicRouter.post("/join", teamExistsandHasSpace, memberAlreadyExists, joinTeam)

export default publicRouter
