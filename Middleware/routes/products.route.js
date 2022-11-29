const express=require("express")
const app=express.Router()


const fs=require("fs")
//dirname
const dbFile=JSON.parse(fs.readFileSync(`${__dirname}/../../db.json`, {encoding : "utf-8"}))
    // const dbFile=JSON.parse(fs.readFileSync("./db.json", {encoding : "utf-8"}))

    const updateDb=(updatedData)=>{
      fs.writeFileSync(`${__dirname}/../../db.json`,JSON.stringify(updatedData),{encoding :"utf-8"})
    }

//create




//   app.get("/",(req,res)=>{
//     res.write("<h1>Congrats</h1>")
//     res.end()
//   })
  // app.get("/products",(req,res)=>{
  //   res.write("<h1>Products</h1>")
  //   res.end()
  // })

// get

  app.get("/", (req,res)=>{
    res.send(dbFile.products)
  })

 
  // get by Id
  app.get("/:id", (req,res)=>{
    let {id} =req.params
    let product=dbFile.products.find((p) =>p.id=== Number(id))
    if(!product){
      res.status(404).send(`No product found with id =${id}`)
    }
   
    res.send(product)
  })

  

  //delete
app.delete("/:id", (req,res)=>{
  let {id} =req.params
   let index=dbFile.products.findIndex((p) =>p.id=== Number(id))
let data= dbFile.products.splice(index,1)
updateDb(dbFile,dbFile.products)
res.send(dbFile.products)
})



//post

app.post("/", (req,res)=>{
  dbFile.products=[...dbFile.products,{
    ...req.body,
    id:dbFile.products.length +1
  }]
  updateDb(dbFile,dbFile.products)
 res.send("Data Added Successfully")
})



//patch

app.patch("/:id",(req,res)=>{
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
 module.exports=app
