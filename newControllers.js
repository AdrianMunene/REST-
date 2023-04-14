//create client, get client
//create room, get room
//create booking, get booking - 
//Can only create booking if clientId and roomId exist and if booking status of said room is 0
//delete booking to free up room
const fs = require('fs');
const Joi = require('joi');

const schema = fs.readFileSync('./data.schema.json', 'utf8');
const schemaObj = JSON.parse(schema);
const dataObj = {};
Object.keys(schemaObj).forEach(table => {
    dataObj[table] = [];
});

const getClients = (req, res)=>{
    res.status(200).json({success: true, data: dataObj["clients"]});
};

const createClient = (req, res) =>{
    const requestSchema = Joi.object({clientId: Joi.number().integer().min(0)});
    const {error} = requestSchema.validate(req.body);
    if (error){
        return res.status(400).json({success: false, message: 'Request body contains invalid arguments'})
    }
    dataObj["clients"].push(req.body);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data);
    res.status(201).json({success: true, data: dataObj["clients"]});
};

const getRooms = (req, res)=>{
    res.status(200).json({success: true, data: dataObj["rooms"]});
};

const createRoom = (req, res) =>{
    const requestSchema = Joi.object({roomId: Joi.number().integer().min(0)});
    const {error} = requestSchema.validate(req.body);
    if (error){
        return res.status(400).json({success: false, message: 'Request body contains invalid arguments'})
    }
    dataObj["rooms"].push(req.body);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data);
    res.status(201).json({success: true, data: dataObj["rooms"]});
};

const getBookings = (req, res)=>{
    res.status(200).json({success: true, data: dataObj["bookings"]});
};

const createBooking = (req, res) =>{
    const booking = req.body;
    if(!req.body.clientId || !req.body.roomId){
        return res.status(400).json({success: false, message: 'Please provide an room and client ID'});
    }
    //find corresponding roomId and clientId for the booking you're trying to create
    const clientLog = dataObj["clients"].find((clientLog)=> clientLog.clientId  === booking.clientId);
    const roomLog = dataObj["rooms"].find((roomLog)=> roomLog.roomId === booking.roomId);
    if(!clientLog || !roomLog){
        return res.status(400).json({success: false, message: 'room or client ID does not exist'});
    }
    //Add bookingId and checkInTime to booking object
    booking.bookingId = Number(req.body.clientId.toString() + req.body.roomId.toString());
    booking.checkInTime = new Date().toLocaleString();

    dataObj["bookings"].push(booking);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data);
    res.status(201).json({success: true, data: dataObj["bookings"]});
};

const updateBoooking = (req, res) =>{
    const {id} = req.params;
    const bookingLog = dataObj["bookings"].find((bookingLog)=> bookingLog.bookingId === Number(id));
    if(!bookingLog){
        return res.status(404).json({success: false, message: `no booking exists with ID ${id} `});
    }
    delete dataObj["bookings"].find((bookingLog)=> bookingLog.bookingId === id);

    bookingLog.checkOutTime = new Date().toLocaleString();

    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data);

    res.status(201).json({success: true, data: dataObj["bookings"]});
};

module.exports = { 
    getClients,
    createClient, 
    getRooms, 
    createRoom,
    getBookings,
    createBooking,
    updateBoooking
};