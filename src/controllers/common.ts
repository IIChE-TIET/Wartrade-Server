import { NextFunction, Request, Response } from "express"
import { teamI } from "../models/team.model"

export type controller = (
  req: Request & { team: teamI; teamId: teamI["_id"] },
  res: Response,
  next: NextFunction
) => Promise<Response>

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

export const toBool = (str: string) => str === "true"
