const express=require("express")

const dbConnect=require("./config/db")
const userRouter=require("./features/Users/users.router")
const taskRouter=require("./features/Tasks/tasks.router")
let PORT=8080

const app=express()

app.use(express.json())

app.use("/users",userRouter)
app.use("/tasks",taskRouter)

app.listen(PORT,async()=>{
    await dbConnect()
    console.log(`Started at http://localhost:${PORT}`)
})