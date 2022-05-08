import { Request, Response, Router } from "express"
import Crisis from "../controllers/Admin/Crisis"
import AdminLogin from "../controllers/Admin/login"
import AdminSignup from "../controllers/Admin/signup"
import getTeams from "../controllers/getTeams"
import changePassword from "../controllers/Public/ForgotPassword/changePassword"
import generateToken from "../controllers/Public/ForgotPassword/generateToken"
import verifyToken from "../controllers/Public/ForgotPassword/verifyToken"
import login from "../controllers/Public/Login"
import createTeam from "../controllers/Public/Registration/createTeam"
import joinTeam, {
  memberAlreadyExists,
  teamExistsandHasSpace,
} from "../controllers/Public/Registration/joinTeam"
import teamStats from "../controllers/Public/TeamStats"
import Team from "../models/team.model"

const publicRouter = Router()

publicRouter.get("/", getTeams)

publicRouter.post("/", login)

publicRouter.post("/create", createTeam)

publicRouter.post("/join", teamExistsandHasSpace, memberAlreadyExists, joinTeam)

publicRouter.get("/view", teamStats)

publicRouter.post("/forgotPassword/generateToken", generateToken)

publicRouter.post("/forgotPassword/verifyToken/:teamName/:token", verifyToken)

publicRouter.post("/forgotPassword/change", changePassword)

publicRouter.post("/adminLogin", AdminLogin)

publicRouter.post("/adminSignup", AdminSignup)

publicRouter.get("/crisis", Crisis)

publicRouter.get("/update", async (req: Request, res: Response) => {
  try {
    await Team.updateMany(
      {},
      {
        $set: {
          defensePointCost: 2500,
        },
      }
    )
    return res.status(200).send({ message: "Updated" })
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

export default publicRouter
