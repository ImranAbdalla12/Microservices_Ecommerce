const nats = require('node-nats-streaming')
console.clear()
const { randomBytes} = require('crypto')

const stand = nats.connect('nice', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
})

stand.on('connect', () => {
    console.log('Listener connected to NATS!')
    const options = stand.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable().setDurableName('product-srv')

    stand.on('close', () => {
        console.log('NATS connection closed')
        process.exit()
    })

    const subscription = stand.subscribe('product:created', 'productsQueueGroup',  options)
    subscription.on('message', (msg) => {
     const data = msg.getData()
     console.log(`Received event #${msg.getSequence()} , with data: ${data}`) 
     msg.ack()
    })
})

process.on('SIGINT', () => stand.close())
process.on('SIGTERM', () => stand.close())