import { DocumentDefinition } from "mongoose"
import { teamI } from "../models/team.model"

const GenPayload = (team: DocumentDefinition<teamI>) => ({
  teamName: team.teamName,
  leaderName: team.leader.name,
  code: team.code,
  members: team.members?.map(m => m.name),
  money: team.money,
  infra: team.infra,
  defensePoints: team.defensePoints + team.sharedDefensePoints,
  inAlliance: team.inAlliance ? "True" : "False",
  allianceWith: team.inAlliance
    ? team.allianceHistory[team.allianceHistory.length - 1].teamName
    : "None",
  bombs: team.bombs.flat(),
  allowed: team.allowed,
})

export default GenPayload
