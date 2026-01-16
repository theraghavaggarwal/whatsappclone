import express from "express";
import mongoose from  "mongoose"; 
import Messages  from "./dbmessages.js";
import Pusher from "pusher";
import Cors from 'cors'

//
const app=express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1788403",
    key: "227a072182f348837e4a",
    secret: "ea649be33d7c4c8d0dea",
    cluster: "ap2",
    useTLS: true
  });
//
app.use(express.json())
app.use(Cors())


//
const connection_url= "mongodb+srv://raghavaggarwal8804:Abcd1234@cluster0.lyby9jw.mongodb.net/whatsappdb?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connection_url)


const db = mongoose.connection

db.once("open",()=>{
    console.log("db connected");

    const msgcollection=db.collection("messagecontents");
    const changeStream=msgcollection.watch()
    changeStream.on('change',(change)=>{
        console.log("a change");

        if(change.operationType==='insert'){
            const messagedetails=change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messagedetails.name,
                message:messagedetails.message,
                timestamp:messagedetails.timestamp,
                received:messagedetails.received
            });
        }else{
            console.log("Error")

        }
    })
})
//


//
app.get('/', (req,res)=>res.status(200).send("Hello"))

app.get('/messages/sync',(req,res)=>{

    Messages.find().then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            res.status(500).send(err)
        })
    }
)
app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body

    Messages.create(dbMessage).then(data=>{
            res.status(200).send('new message:\n'+data)
        }).catch(err=>{
            res.status(500).send(err)
        })
    }
)


//
app.listen(port,()=>console.log("listning on localhost:",port))