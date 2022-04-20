import mongoose, { Document } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { member } from "./team.model"

export const MemberSchema = new mongoose.Schema<member>({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  rollNo: {
    type: String,
    required: [true, "Please enter your rollNo"],
    unique: [true, "Roll Number already in use. Try Logging In isntead"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email id"],
    unique: [true, "Email already in use. Try Logging In isntead"],
  },
  phone: {
    type: String,
    maxlength: [10, "Phone number should of 10 digits"],
    minlength: [10, "Phone number should of 10 digits"],
    required: [true, "Please enter your phone number"],
    unique: [true, "Phone Number already in use. Try Logging In isntead"],
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

MemberSchema.plugin(uniqueValidator, {
  message: "{PATH} already in use.",
})

const Member = mongoose.model<member & Document>("Member", MemberSchema)

export default Member
