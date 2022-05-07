import { controller, toBool } from "../controllers/common"

const gameActive: controller = async (req, res, next) => {
  if (!toBool(process.env.GAME_START))
    return res
      .status(400)
      .send({ message: "Please Wait for the Game to Start." })

  next()
  return
}

export default gameActive
