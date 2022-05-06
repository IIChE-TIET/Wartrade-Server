import bcrypt from "bcrypt"
import mongoose, { Document } from "mongoose"
import { MemberSchema } from "./member.model"

export type member = {
  name: string
  phone: string
  year: string
  branch: string
  email: string
}

export type teamI = Document & {
  teamName: string
  password: string
  code: string
  leader: member
  allowed?: boolean
  members?: member[]
  money?: number
  infra?: number
  bombs?: {
    bombName: string
    quantity: number
  }[][]
  defensePoints?: number
  inAlliance?: boolean
  sharedDefensePoints?: number
  allianceHistory?: { teamName: string }[]
  logs?: { logType: string; message: string }[]
  lastAttack?: Date
}

const TeamSchema = new mongoose.Schema<teamI & Document>(
  {
    teamName: {
      type: String,
      required: [true, "Team Name is required"],
    },
    password: {
      type: String,
      minlength: [8, " Password should be of minimum 8 characters"],
      required: [true, "Please enter the Password"],
    },
    code: {
      type: String,
      required: true,
    },
    allowed: {
      type: Boolean,
      default: true,
    },
    money: {
      type: Number,
      default: 3_000_000,
    },
    infra: { default: 250_000, type: Number },
    leader: {
      type: MemberSchema,
      required: true,
      _id: false,
    },
    members: { type: [MemberSchema], default: [], _id: false },
    bombs: {
      type: [[{ bombName: String, quantity: Number }]],
      default: [[], [], [], [], []],
      _id: false,
    },
    defensePoints: {
      type: Number,
      default: 0,
    },
    sharedDefensePoints: {
      type: Number,
      default: 0,
    },
    inAlliance: {
      type: Boolean,
      default: false,
    },
    allianceHistory: {
      type: [
        {
          teamName: String,
        },
      ],
      default: [],
      _id: false,
    },
    lastAttack: {
      type: Date,
      required: false,
    },
    logs: {
      type: [{ logType: String, message: String }],
      default: [],
      _id: false,
    },
  },
  { timestamps: true }
)

TeamSchema.pre<teamI>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const Team = mongoose.model<teamI>("Team", TeamSchema)

export default Team
