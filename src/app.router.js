import authRouter from './modules/Auth/auth.router.js'
import userRouter from './modules/User/user.router.js'
import postRouter from './modules/post/post.router.js'
import connectDB from '../DB/connection.js'
import path from "path";
import { fileURLToPath } from "url";
const __dirname=path.dirname(fileURLToPath(import.meta.url))

import { globalErrHandling } from './utils/errorHandling.js'

const initApp = (app, express) => {

    //Convert Buffer Data
    app.use(express.json({}))
    
    //read static files
    app.use("/uploads", express.static(path.join(__dirname,'./uploads')))

    //APP routing

    app.get('/', (req, res) => res.send('Hello World!'))
    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/post", postRouter)


    app.all("*", (req, res, next) => {
        return res.json({ message: "In-valid method or URL or Both please check your routing" })
    })

    app.use(globalErrHandling)
    // DB connection
    connectDB()

}

export default initApp