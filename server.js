const express = require('express');
const server = express();
const port = 8000;

server.use(express.json())

const services = [
    { id:1,name:'service 1'},
    { id:2,name:'service 2'},
]

const booking = [];

server.get('/api/services',(req,res)=>{
    res.status(200).json({"data":services})
})

server.get('/api/services/:id',(req,res)=>{
    const serviceId = parseInt(req.params.id);
    const service = services.find(s=>s.id === serviceId);

    if(service){
        res.status(200).json({"data":service})
    }else{
        res.status(404).json({"Error": `service not found`});
    }
})


server.post('/api/bookings',(req,res)=>{
    const { serviceId, customerName, date} = req.body;

    const service = services.find(s=> s.id === serviceId);

    if(!service){
        return res.status(400).json({"Error": `Invalid serviceId`});
    }

    const newBooking = {
        id: booking.length+1,
        serviceId,
        customerName,
        date
    }

    booking.push(newBooking);
    res.status(200).json(newBooking)
})

server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})