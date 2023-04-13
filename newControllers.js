//create client, get client
//create room, get room
//create booking, get booking - 
//Can only create booking if clientId and roomId exist and if booking status of said room is 0
//delete booking to free up room
const fs = require('fs');

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
    const {clientId} = req.body;
    if(!clientId){
        return res.status(400).json({success: false, message: 'Please provide an ID'});
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
    const {roomId} = req.body;
    if(!roomId){
        return res.status(400).json({success: false, message: 'Please provide an ID'});
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
    const {clientId, roomId} = req.body;
    if(!clientId && roomId){
        return res.status(400).json({success: false, message: 'Please provide an ID'});
    }
    dataObj["bookings"].push(req.body);
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
    createBooking
}