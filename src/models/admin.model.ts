import bcrypt from "bcrypt"
import { Document, model, Schema } from "mongoose"

type adminI = Document & {
  name: string
  password: string
}

const AdminSchema = new Schema<adminI>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

AdminSchema.pre<adminI>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const Admin = model<adminI>("Admin", AdminSchema)

export default Admin
