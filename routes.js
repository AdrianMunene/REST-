//routes
const express = require('express');
const router = express.Router();

const { 
    getClients,
    createClient, 
    getRooms, 
    createRoom,
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    welcome
} = require('./controllers');

router.route('/').get(welcome);
router.route('/clients').get(getClients).post(createClient);
router.route('/rooms').get(getRooms).post(createRoom);
router.route('/bookings').get(getBookings).post(createBooking);
router.route('/bookings/:id').put(updateBooking).delete(deleteBooking);


module.exports = router;