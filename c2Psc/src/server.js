const express=require("express")

const productRouter=require("./features/products/products.router")

const userRouter=require("./features/users/users.router")
const cartRouter=require("./features/cartItems/cartItems.router")

const dbConnect=require("./config/db")
let PORT=8000
const app=express()
app.use(express.json())
app.use("/products", productRouter)

app.use("/users",userRouter)

app.use("/carts",cartRouter)
app.listen(PORT, async()=>{

    await dbConnect()
    console.log(`Server at http://localhost:${PORT}`)
})