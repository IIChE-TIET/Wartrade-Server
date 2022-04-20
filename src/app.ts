import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"
import publicRouter from "./routes/public.route"

process.env.NODE_ENV !== "production" && require("dotenv").config()
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("tiny"))
app.use(helmet())

const MongoURI = process.env.MONGODB_URI

mongoose.connect(MongoURI)

const connection = mongoose.connection

connection.once("open", () =>
  console.log("\x1b[36mDatabase is Connected\x1b[0m")
)

//routes
app.use("/", publicRouter)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
