const express=require("express")

const fs=require("fs")
//dirname
const dbFile=JSON.parse(fs.readFileSync(`${__dirname}/../db.json`, {encoding : "utf-8"}))
    // const dbFile=JSON.parse(fs.readFileSync("./db.json", {encoding : "utf-8"}))

    const updateDb=(updatedData)=>{
      fs.writeFileSync(`${__dirname}/../db.json`,JSON.stringify(updatedData),{encoding :"utf-8"})
    }

//create

const app=express()

app.use(express.json())

  app.get("/",(req,res)=>{
    res.write("<h1>Congrats</h1>")
    res.end()
  })
  // app.get("/products",(req,res)=>{
  //   res.write("<h1>Products</h1>")
  //   res.end()
  // })

// get

  app.get("/products", (req,res)=>{
    res.send(dbFile.products)
  })

  app.get("/users",(req,res)=>{
    res.send(dbFile.users)
  })
  // get by Id
  app.get("/products/:id", (req,res)=>{
    let {id} =req.params
    let product=dbFile.products.find((p) =>p.id=== Number(id))
    if(!product){
      res.status(404).send(`No product found with id =${id}`)
    }
   
    res.send(product)
  })

  app.get("/users/:id",(req,res)=>{
    let {id} =req.params
    let user=dbFile.users.find((p) =>p.id=== Number(id))
    if(!user){
      res.status(404).send(`No user found with id =${id}`)
    }
   
    res.send(user)
  })

  //delete
app.delete("/products/:id", (req,res)=>{
  let {id} =req.params
   let index=dbFile.products.findIndex((p) =>p.id=== Number(id))
let data= dbFile.products.splice(index,1)
updateDb(dbFile,dbFile.products)
res.send(dbFile.products)
})

app.delete("/users/:id", (req,res)=>{
  let {id} =req.params
   let index=dbFile.users.findIndex((p) =>p.id=== Number(id))
dbFile.users.splice(index,1)
updateDb(dbFile,dbFile.users)
res.send(dbFile.users)
})

//post

app.post("/products/", (req,res)=>{
  dbFile.products=[...dbFile.products,{
    ...req.body,
    id:dbFile.products.length +1
  }]
  updateDb(dbFile,dbFile.products)
 res.send("Data Added Successfully")
})

app.post("/users/", (req,res)=>{
  dbFile.users=[...dbFile.users,{
    ...req.body,
    id:dbFile.users.length +1
  }]
  updateDb(dbFile,dbFile.users)
 res.send("Data Added Successfully")
})

//patch

app.patch("/products/:id",(req,res)=>{
  let {id} =req.params
  dbFile.products=dbFile.products.map((el=>{
    if(el.id === Number(id)){
      return{
        ...el,
        ...req.body
      }
    }
    else return el
  }))
  updateDb(dbFile,dbFile.products)
  res.send("Data updated Correctly")
})

app.patch("/users/:id",(req,res)=>{
  let {id} =req.params
  dbFile.users=dbFile.users.map((el=>{
    if(el.id === Number(id)){
      return{
        ...el,
        ...req.body
      }
    }
    else return el
  }))
  updateDb(dbFile,dbFile.users)
  res.send("Data updated Correctly")
})

app.listen(8081,()=>{
    console.log("Started at: http://localhost:8081")
})