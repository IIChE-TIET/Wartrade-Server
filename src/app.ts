import ExpressConfig from "./Express/express.config"
import MongoConfig from "./MongoDB/mongo.config"
import Routes from "./routes"

process.env.NODE_ENV !== "production" && require("dotenv").config()
const PORT = process.env.PORT || 5000

const app = ExpressConfig()

MongoConfig()

Routes(app)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
