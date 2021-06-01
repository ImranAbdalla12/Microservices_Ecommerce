const nats = require('node-nats-streaming')

console.clear()

const stand = nats.connect('nice', 'abc', {
    url: 'http://localhost:4222'
})

stand.on('connect', () => {
    console.log('Publisher contected to NATS')

    const data = JSON.stringify({
        id: '123',
        title: 'laptop',
        price: 20
    }) 

    stand.publish('product:created', data, () => {
        console.log('Event published!')
    })
})