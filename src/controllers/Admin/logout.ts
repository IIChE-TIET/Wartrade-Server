import { controller } from "../common"

const adminLogout: controller = async (req, res) => {
  return res.clearCookie("wartrade-admin").sendStatus(200)
}
export default adminLogout
