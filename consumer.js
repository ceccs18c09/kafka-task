const {Kafka} = require("kafkajs")

async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["localhost:9092"]
         })

        const consumer = kafka.consumer({groupId: "User"})
        console.log("Connecting.....")  
        await consumer.connect()
        console.log("Connected!")
        
        await consumer.subscribe({
            "topic": "User",
            "fromBeginning": true
        })
        
        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received Message ${result.message.value} on partition ${result.partition}`)
            }
        })
 

    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        
    }


}

run();