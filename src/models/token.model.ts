import mongoose, { Document } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

type tokenI = {
  teamName: string
  token: string
  createdAt?: Date
} & Document

const TokenSchema = new mongoose.Schema<tokenI>({
  teamName: {
    type: String,
    unique: true,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1000,
  },
})

TokenSchema.plugin(uniqueValidator, {
  message: "Team has already generated a token",
})

const Token = mongoose.model<tokenI>("Token", TokenSchema)
export default Token
