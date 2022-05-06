import { Response } from "express"
import Team, { teamI } from "../../../models/team.model"
import { controller, errorFormatter } from "../../common"
import { bomb, findBombByName } from "../../Private/BuyBombs/BombsList"

const checkBombExistsAndQuantity = (
  team: teamI,
  bomb: {
    bombName: string
    limit: number
    pool: number
  } & bomb,
  quantity: number,
  res: Response
) => {
  const bombToSell = team.bombs[bomb.pool].find(
    b => b.bombName === bomb.bombName
  )
  if (!bombToSell) {
    res.status(404).send({ message: "The Requested Bomb doesn't exist." })
    return false
  } else if (bombToSell.quantity < quantity) {
    res.status(400).send({
      message:
        "The Requested country doesn't have enough of the requested bombs.",
    })
    return false
  } else return true
}

const checkMoneyAndPoolLimit = (
  team: teamI,
  bomb: {
    bombName: string
    limit: number
    pool: number
  } & bomb,
  quantity: number,
  money: number,
  res: Response
) => {
  if (team.money < money * quantity) {
    res.status(406).send({ message: "Country doesn't have enough money." })
    return false
  }

  const numOfBombsInPool = team.bombs[bomb.pool].reduce(
    (prev, current) => prev + current.quantity,
    0
  )

  if (bomb.limit < numOfBombsInPool + quantity) {
    res.status(406).send({ message: "Pool Limit Exceeded" })
    return false
  } else return true
}

const updatedBombsAfterSelling = (
  bombs: teamI["bombs"],
  bomb: {
    bombName: string
    limit: number
    pool: number
  } & bomb,
  quantity: number
) => {
  bombs[bomb.pool] = bombs[bomb.pool].map(b => {
    if (b.bombName === bomb.bombName) b.quantity -= quantity
    return b
  })

  return bombs
}

const updatedBombsAfterBuying = (
  bombs: teamI["bombs"],
  bomb: {
    bombName: string
    limit: number
    pool: number
  } & bomb,
  quantity: number
) => {
  let bombAlreadyExists = false
  bombs[bomb.pool].map(b => {
    if (b.bombName === bomb.bombName) {
      b.quantity += quantity
      bombAlreadyExists = true
    }
    return b
  })
  if (!bombAlreadyExists)
    bombs[bomb.pool].push({ bombName: bomb.bombName, quantity })

  return bombs
}

const trading: controller = async (req, res) => {
  const { countrySellingName, countryBuyingName, bombName } = req.body
  const quantity = parseInt(req.body.quantity)
  const money = parseInt(req.body.money)

  if (
    !countrySellingName ||
    !countryBuyingName ||
    !bombName ||
    !quantity ||
    !money
  )
    return res.status(400).send({ message: "Incorrect Parameters" })
  const bomb = findBombByName(bombName)

  try {
    const countrySelling = await Team.findOne({ teamName: countrySellingName })
    if (!checkBombExistsAndQuantity(countrySelling, bomb, quantity, res)) return
    const countryBuying = await Team.findOne({ teamName: countryBuyingName })
    if (!checkMoneyAndPoolLimit(countryBuying, bomb, quantity, money, res))
      return

    let updatedBombsList = updatedBombsAfterSelling(
      countrySelling.bombs,
      bomb,
      quantity
    )

    await countrySelling.updateOne({
      $set: {
        bombs: updatedBombsList,
      },
      $inc: {
        money: money * quantity,
      },
      $push: {
        logs: {
          logType: "Trade",
          message: `${quantity} ${bombName} sold to ${countryBuyingName} at ${money} each`,
        },
      },
    })

    updatedBombsList = updatedBombsAfterBuying(
      countryBuying.bombs,
      bomb,
      quantity
    )

    await countryBuying.updateOne({
      $set: {
        bombs: updatedBombsList,
      },
      $inc: {
        money: -1 * money * quantity,
      },
      $push: {
        logs: {
          logType: "Trade",
          message: `${quantity} ${bombName} bought from ${countrySellingName} at ${money} each`,
        },
      },
    })

    return res.status(200).send({ message: "Trading Successfull." })
  } catch (err) {
    console.log({ trading: err })
    const e = errorFormatter(err.message)
    console.log({ trading: e })
    return res.status(400).send(e)
  }
}

export default trading
