import { controller } from "../../common"

const logout: controller = async (req, res) => {
  return res.clearCookie("wartrade").sendStatus(200)
}
export default logout
