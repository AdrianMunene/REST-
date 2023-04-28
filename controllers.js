//controllers
const fs = require('fs');
const Joi = require('joi');
const { stringify } = require('querystring');

const schema = fs.readFileSync('./data.schema.json', 'utf8');
const schemaObj = JSON.parse(schema);

const dataObj = {};

Object.keys(schemaObj).forEach(table => {
    dataObj[table] = [];
});

const welcome = (req, res)=>{
    res.status(200).json({message: 'Welcome to the booking system'});
};

const getClients = (req, res) => {
    res.status(200).json({ success: true, data: dataObj["clients"] });
};

const createClient = (req, res) => {
    const requestSchema = Joi.object({ clientId: Joi.number().integer().min(0) });
    const { error } = requestSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ success: false, message: 'Request body contains invalid arguments' })
    };

    const identical = dataObj["clients"].find((identical) => identical.clientId === req.body.clientId);

    if (identical) {
        return res.status(400).json({ success: false, message: 'Client with given ID already exists' });
    };

    dataObj["clients"].push(req.body);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data);
    res.status(201).json({ success: true, data: dataObj["clients"] });
};

const getRooms = (req, res) => {
    res.status(200).json({ success: true, data: dataObj["rooms"] });
};

const createRoom = (req, res) => {
    const requestSchema = Joi.object({ roomId: Joi.number().integer().min(0) });
    const { error } = requestSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: 'Request body contains invalid arguments' })
    }
    const identical = dataObj["rooms"].find((identical) => identical.roomId === req.body.roomId);
    if (identical) {
        return res.status(400).json({ success: false, message: 'room with given ID already exists' });
    };

    dataObj["rooms"].push(req.body);

    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data);
    res.status(201).json({ success: true, data: dataObj["rooms"] });
};

const getBookings = (req, res) => {
    res.status(200).json({ success: true, data: dataObj["bookings"] });
};

const createBooking = (req, res) => {
    const booking = req.body;

    if (!req.body.clientId || !req.body.roomId) {
        return res.status(400).json({ success: false, message: 'Please provide an room and client ID' });
    };

    const clientLog = dataObj["clients"].find((clientLog) => clientLog.clientId === booking.clientId);
    const roomLog = dataObj["rooms"].find((roomLog) => roomLog.roomId === booking.roomId);

    if (!clientLog || !roomLog) {
        return res.status(400).json({ success: false, message: 'room or client ID does not exist' });
    };

    const identical = dataObj["bookings"].find((identical) => identical.roomId === booking.roomId);

    if (identical) {
        return res.status(400).json({ success: false, message: 'room has already been assigned' });
    };

    booking.bookingId = Number(req.body.clientId.toString() + req.body.roomId.toString());

    booking.checkInTime = new Date().toLocaleString();

    dataObj["bookings"].push(booking);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data);
    res.status(201).json({ success: true, data: dataObj["bookings"] });
};

const updateBoooking = (req, res) => {
    const { id } = req.params;
    const bookingLog = dataObj["bookings"].find((bookingLog) => bookingLog.bookingId === Number(id));

    if (!bookingLog){
        return res.status(404).json({ success: false, message: `no booking exists with ID ${id} ` });
    };

    bookingLog.checkOutTime = new Date().toLocaleString();

    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data);
    res.status(201).json({ success: true, data: dataObj["bookings"] });
};

const deleteBooking = (req, res) => {
    const { id } = req.params;
    const bookingLog = dataObj["bookings"].find((bookingLog)=>bookingLog.bookingId === Number(id));

    if (!bookingLog){
        return res.status(404).json({ success: false, message: `no booking exists with ID ${id} ` });
    };
    
    const newObj = dataObj.bookings.filter((books) => books.bookingId !== bookingLog.bookingId);
    dataObj.bookings = newObj;

    const data = JSON.stringify(dataObj);   
    fs.writeFileSync('./data.json', data);
    res.status(201).json
    ({
        success: true, 
        message: `room with id ${id[1]} is now open for booking`, 
        data: dataObj["bookings"]
    }); 
};

module.exports = {
    getClients,
    createClient,
    getRooms,
    createRoom,
    getBookings,
    createBooking,
    updateBoooking,
    deleteBooking,
    welcome
};