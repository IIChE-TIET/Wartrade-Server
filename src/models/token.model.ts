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
    expires: 120,
  },
})

TokenSchema.plugin(uniqueValidator, {
  message: "This {PATH} has already generated a token",
})

const Token = mongoose.model<tokenI>("Token", TokenSchema)
export default Token
