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
    leader: {
      type: MemberSchema,
      required: true,
      _id: false,
    },
    members: { type: [MemberSchema], default: [], _id: false },
  },
  { timestamps: true }
)

TeamSchema.pre<teamI>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const Team = mongoose.model<teamI>("Team", TeamSchema)

export default Team
