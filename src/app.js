const express =require("express")
const app=express()

app.listen(3000 , ()=>
{console.log("listening on port 3000")}
);
app.use("/test",(req,res) =>{
    res.send("Hello test")
})
app.use("/",(req,res)=>{
    res.send("Hello Home Page!!")
})


