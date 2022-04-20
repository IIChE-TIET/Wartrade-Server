import { Request, Response } from "express"
import Team from "../models/team.model"

const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find({}).lean()

    return res.status(200).send({ data: teams })
  } catch (err) {
    console.log({ getTeams: err })
    return res.status(500).send(err)
  }
}

export default getTeams
