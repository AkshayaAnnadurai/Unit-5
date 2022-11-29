app.get("/users",(req,res)=>{
    res.send(dbFile.users)
  })

  app.get("/users/:id",(req,res)=>{
    let {id} =req.params
    let user=dbFile.users.find((p) =>p.id=== Number(id))
    if(!user){
      res.status(404).send(`No user found with id =${id}`)
    }
   
    res.send(user)
  })


  app.delete("/users/:id", (req,res)=>{
    let {id} =req.params
     let index=dbFile.users.findIndex((p) =>p.id=== Number(id))
  dbFile.users.splice(index,1)
  updateDb(dbFile,dbFile.users)
  res.send(dbFile.users)
  })

  app.post("/users/", (req,res)=>{
    dbFile.users=[...dbFile.users,{
      ...req.body,
      id:dbFile.users.length +1
    }]
    updateDb(dbFile,dbFile.users)
   res.send("Data Added Successfully")
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