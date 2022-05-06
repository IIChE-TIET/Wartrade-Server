import { Router } from "express"
import createAlliance from "../controllers/Admin/Alliance/createAlliance.controller"
import trading from "../controllers/Admin/Trading/trading.controller"
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

const publicRouter = Router()

publicRouter.get("/", getTeams)

publicRouter.post("/", login)

publicRouter.post("/create", createTeam)

publicRouter.post("/join", teamExistsandHasSpace, memberAlreadyExists, joinTeam)

publicRouter.post("/forgotPassword/generateToken", generateToken)

publicRouter.post("/forgotPassword/verifyToken/:teamName/:token", verifyToken)

publicRouter.post("/forgotPassword/change", changePassword)

publicRouter.post("/alliance", createAlliance)

publicRouter.post("/trading", trading)

// publicRouter.get("/update", async (req: Request, res: Response) => {
//   try {
//     await Team.updateMany(
//       {},
//       {
//         $set: {
//           allowed: false,
//         },
//       }
//     )
//     return res.status(200).send({ message: "Updated" })
//   } catch (err) {
//     console.log(err)
//     return res.status(500).send(err)
//   }
// })

export default publicRouter
