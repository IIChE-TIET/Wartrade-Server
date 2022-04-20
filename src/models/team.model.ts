import bcrypt from "bcrypt"
import mongoose, { Document } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { MemberSchema } from "./member.model"

export type member = {
  name: string
  rollNo: string
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
  members?: member[]
}

const TeamSchema = new mongoose.Schema<teamI & Document>(
  {
    teamName: {
      type: String,
      unique: [true, "Team Name already in use. Use a Different Team Name"],
      required: [true, "Team Name is required"],
    },
    password: {
      type: String,
      minlength: [6, "Password should be of minimum 6 characters"],
      required: [true, "Please enter the Password"],
    },
    code: {
      type: String,
      required: true,
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

TeamSchema.plugin(uniqueValidator, {
  message: "{PATH} already in use.",
})

const Team = mongoose.model<teamI>("Team", TeamSchema)

export default Team
