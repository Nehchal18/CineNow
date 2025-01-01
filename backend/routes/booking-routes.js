import express from 'express';
import { deleteBooking, getAllBookings, getBookingById, newBooking } from '../controllers/booking-controller.js';
const bookingsRouter = express.Router();

bookingsRouter.post('/', newBooking);
bookingsRouter.get('/:id', getBookingById);
bookingsRouter.delete('/:id', deleteBooking);
bookingsRouter.get('/', getAllBookings);

export default bookingsRouter;