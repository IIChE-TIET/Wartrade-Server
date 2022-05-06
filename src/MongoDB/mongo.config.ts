import mongoose from "mongoose"

const MongoConfig = () => {
  const MongoURI = process.env.MONGODB_URI

  mongoose.connect(MongoURI)

  const connection = mongoose.connection

  connection.once("open", () =>
    console.log("\x1b[36mDatabase is Connected\x1b[0m")
  )
}

export default MongoConfig
