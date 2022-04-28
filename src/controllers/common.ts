import { NextFunction, Request, Response } from "express"
import { DocumentDefinition } from "mongoose"
import { teamI } from "../models/team.model"

export type controller = (
  req: Request & { team: teamI; teamId: teamI["_id"] },
  res: Response,
  next: NextFunction
) => Promise<Response>

type objectI = { [key: string]: string }

type sanitize = (input: string | objectI) => string | objectI

export const sanitize: sanitize = input => {
  if (typeof input === "string") return input.trim()
  const sanitized: {
    [key: string]: string
  } = {}
  Object.entries(input).forEach(
    ([key, value]) => (sanitized[key] = value.trim())
  )
  return sanitized
}

export const errorFormatter = (e: any) => {
  let errors: string[] = []

  const allErrors = e.substring(e.indexOf(":") + 1).trim()
  const allErrorsArrayFormat = allErrors
    .split(",")
    .map((err: any) => err.trim())
  allErrorsArrayFormat.forEach((error: any) => {
    const [key, value]: [string, any] = error
      .split(":")
      .map((err: any) => err.trim())
    errors.push(value)
  })

  return errors
}

export const genPayload = (team: DocumentDefinition<teamI>) => ({
  teamName: team.teamName,
  leaderName: team.leader.name,
  code: team.code,
  members: team.members?.map(m => m.name),
})
