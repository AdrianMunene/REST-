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
    updateBoooking,
    deleteBooking,
    welcome
} = require('./controllers');

router.route('/').get(welcome);
router.route('/clients').get(getClients).post(createClient);
router.route('/rooms').get(getRooms).post(createRoom);
router.route('/bookings').get(getBookings).post(createBooking);
router.route('/bookings/:id').put(updateBoooking).delete(deleteBooking);


module.exports = router;