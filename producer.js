const express= require('express');
const mysql= require('mysql2');
const {Kafka} = require("kafkajs")

const msg='hii'

var app = express();

app.use(express.json());

var db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anjana@123',
    database: 'task3'

})

db.connect((err)=>{

    if(!err){

        console.log("Connected to mysql");
    }

    else{

        console.log("Not connected");
    }
})



app.get('/api/employee/',(req,res)=>{

    const msg="hello"
    let sql =`Select * from emp`;
    db.query(sql,(err,result)=>{
        if(err) {
            res.send("err");
        }
        else{
            let data ='success';
            if(result[2]!=null) {
                run(data);
            }
                else{
                    console.log("Count of employee is less than 2");
                }
               
            res.send(result); }
    })




    async function run(data){
        try
        {
             const kafka = new Kafka({
                  "clientId": "myapp",
                  "brokers" :["localhost:9092"]
             })
    
            const producer = kafka.producer();
            console.log("Connecting.....")
            await producer.connect()
            console.log("Connected!")
            //A-M 0 , N-Z 1 
            const partition = msg
            
            const result1 =  await producer.send({
                "topic": "User",
                "messages": [
                    {
                        "value": data,
                        "partition": 1
                    }
                ]
            })
            
        }
        catch(ex)
        {
            console.error(`Something bad happened ${ex}`)
        }
    
    
    }



});


app.listen(5000,()=>{
    console.log("The server is listening on port 5000");
}) 