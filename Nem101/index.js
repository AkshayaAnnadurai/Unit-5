
const http=require("http")
const fs=require("fs")

const akFile=fs.readFileSync("./index.html", {encoding : "utf8"})
const dbFile=JSON.parse(fs.readFileSync("./db.json", {encoding : "utf8"}))
const updatedFile=(filename,updatedData)=>{
    fs.writeFileSync(filename,updatedData)
}
const app=http.createServer((req,res)=>{
    if(req.url=== "/files")
    {
        res.write(akFile)
       
    }
    else if(req.url==="/")
    {
        res.write("<h1>HomePage</h1>")
    }
    else if(req.url.startsWith("/products"))
   
    {
        if(req.method=== "GET")
        {
        // res.setHeader("content-type", "application/json")
        res.write(JSON.stringify(dbFile.products))
        
    }
    else if(req.method==="DELETE")
    {
        let id=req.url.replace("/products/","")
        let updatedData=dbFile.products.filter((el)=>el.id!==id)
        dbFile.products=updatedData
        updatedFile("./db.json",JSON.stringify(dbFile))
        res.write(JSON.stringify(dbFile.products))
        
    }
    }
    else if(req.url.startsWith("/users"))
    {
        if(req.method==="GET")
        {
            res.write(JSON.stringify(dbFile.users))
        }
        else if(req.method=== "DELETE")
        {
            let id=req.url.replace("/users/","")
            let updatedData=dbFile.users.filter((el)=>el.id!==id)
            dbFile.users=updatedData
            updatedFile("./db.json",JSON.stringify(dbFile))
            res.write(JSON.stringify(dbFile.users))
        }
    }
    res.end()
})

app.listen(3000, ()=>{
    console.log("Started at http://localhost:3000");
})