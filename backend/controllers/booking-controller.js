import Booking from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const newBooking = async(req, res) => {
    const { movie, date, seatNumber, user } = req.body;

    let existingMovie;
    let existingUser;
    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }

    if(!existingMovie ) {
        return res.status(404).json({message:"Movie Not Found With Given ID"});
    }
    if(!existingUser) {
        return res.status(404).json({message:"User Not Found With Given ID"});
    }

    let booking;

    try {
        booking = await Booking.create({ movie, date: new Date(`${date}`), seatNumber, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session});
        await session.commitTransaction();

    } catch (error){
        return console.log(error);
    }

    if(!booking) { 
        return res.status(500).json({message:"Unable to create a booking!!"});
    }

    return res.status(201).json({message:"Booking created successfully", booking});
    
}

export const getBookingById = async(req, res) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findById(id)
    } catch (error) {
        return console.log(error);
    }

    if(!booking) {
        return res.status(500).json({message:"Invalid booking id"});
    }
    return res.status(200).json({booking});
}

export const deleteBooking = async(req, res) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findByIdAndDelete(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save({session});
        await booking.movie.save({session});
        session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }

    return res.status(200).json({message:"Booking deleted successfully"});
}

export const getAllBookings = async(req, res) => {
    let bookings;
    try {
        bookings = await Booking.find().populate("user movie");
    } catch (error) {
        return console.log(error);
    }

    if(!bookings) {
        return res.status(500).json({message:"Request Failed"});
    }
    return res.status(200).json({bookings});
}