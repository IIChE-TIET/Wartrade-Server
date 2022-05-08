import { DocumentDefinition } from "mongoose"
import { teamI } from "../models/team.model"
import { toBool } from "./common"

const GenPayload = (team: DocumentDefinition<teamI>) => ({
  teamName: team.teamName,
  countryName: team.countryName || "",
  leaderName: team.leader.name,
  code: team.code,
  members: team.members?.map(m => m.name),
  money: Math.floor(team.money),
  infra: Math.floor(team.infra),
  defensePoints: Math.floor(team.defensePoints + team.sharedDefensePoints),
  inAlliance: team.inAlliance ? "True" : "False",
  allianceWith: team.inAlliance
    ? team.allianceHistory[team.allianceHistory.length - 1].teamName
    : "None",
  bombs: team.bombs.flat(),
  allowed: team.allowed,
  gameStart: toBool(process.env.GAME_START),
  round1: toBool(process.env.ROUND1_ACTIVE),
  round2: toBool(process.env.ROUND2_ACTIVE),
  round3: toBool(process.env.ROUND3_ACTIVE),
  logs: team.logs,
})

export default GenPayload
