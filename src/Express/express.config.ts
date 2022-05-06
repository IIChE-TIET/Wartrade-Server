import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

const ExpressConfig = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(morgan("tiny"))
  app.use(helmet())
  app.use(cookieParser())
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? "https://wartrade.netlify.app"
          : "http://localhost:3000",
      credentials: true,
    })
  )

  return app
}

export default ExpressConfig
