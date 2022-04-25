import mongoose, { Document } from "mongoose"
import { member } from "./team.model"

export const MemberSchema = new mongoose.Schema<member>({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email id"],
  },
  phone: {
    type: String,
    maxlength: [10, "Phone number should of 10 digits"],
    minlength: [10, "Phone number should of 10 digits"],
    required: [true, "Please enter your phone number"],
  },
  branch: {
    type: String,
    required: [true, "Please enter your branch"],
  },
  year: {
    type: String,
    required: [true, "Please select your year of study"],
  },
})

const Member = mongoose.model<member & Document>("Member", MemberSchema)

export default Member
