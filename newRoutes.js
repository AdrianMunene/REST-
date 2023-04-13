const express = require('express');
const router = express.Router();

const { 
    getClients,
    createClient, 
    getRooms, 
    createRoom,
    getBookings,
    createBooking
} = require('./newControllers');

router.route('/clients').get(getClients).post(createClient);
router.route('/rooms').get(getRooms).post(createRoom);
router.route('/bookings').get(getBookings).post(createBooking);

module.exports = router;