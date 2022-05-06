import Team from "../../../models/team.model"
import { controller, errorFormatter } from "../../common"
import GenPayload from "../../GenPayload"
import { findBombByName } from "./BombsList"

const buyBombs: controller = async (req, res) => {
  const { bombName, quantity } = req.body as {
    bombName: string
    quantity: number
  }

  if (!bombName || !quantity)
    return res.status(400).send({ message: "bad Request" })

  const bomb = findBombByName(bombName)

  if (!bomb) return res.status(404).send({ message: "Bomb Not Found" })

  if (bomb.limit < quantity)
    return res.status(400).send({ message: "Pool Limit Exceeded" })

  const id = req.teamId

  try {
    const team = await Team.findById(id)

    if (!team) return res.clearCookie("wartrade").sendStatus(400)

    const cost = quantity * bomb.price

    if (cost > team.money)
      return res.status(406).send({ message: "Insufficient Funds" })
    const teamBombPool = team.bombs[bomb.pool]
    const numOfBombsInPool = teamBombPool
      ? teamBombPool.reduce((prev, current) => prev + current.quantity, 0)
      : 0

    if (numOfBombsInPool + quantity > bomb.limit)
      return res.status(400).send({ message: "Pool Limit Exceeded" })

    const newBombsList = team.bombs

    const bombAlreadyBought = newBombsList[bomb.pool]
      ? newBombsList[bomb.pool].findIndex(bomb => bomb.bombName === bombName)
      : -1

    if (bombAlreadyBought > -1)
      newBombsList[bomb.pool][bombAlreadyBought].quantity++
    else newBombsList[bomb.pool].push({ quantity, bombName })

    await team.updateOne({
      $inc: {
        money: -1 * cost,
      },
      $set: {
        bombs: newBombsList,
      },
      $push: {
        logs: {
          logType: "Bomb",
          message: quantity + " " + bombName + " bought.",
        },
      },
    })

    team.money -= cost
    team.bombs = newBombsList

    return res.status(200).send({
      message: quantity + " " + bombName + " bought.",
      profile: GenPayload(team),
    })
  } catch (err) {
    console.log({ buyBombs: err })
    const e = errorFormatter(err.message)
    console.log({ buyBombs: e })
    return res.status(400).send(e)
  }
}

export default buyBombs
