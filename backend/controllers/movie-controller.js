import jwt from 'jsonwebtoken';
import Movie from '../models/Movie.js';
import Bookings from '../models/Bookings.js';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const addMovie = async (req, res) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; 
    if(!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({message:"Token Not Found"});
    }
    // console.log(extractedToken);

    let adminId;
    const decodedToken = jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) =>{
        if(err) {
            return res.status(400).json({message:`${err.message}`});
        }else{
            adminId = decrypted.id;
            return; 
        }
    });

    const {title, description, releaseDate, posterUrl, featured, actors} = req.body;
    if(!title && title.trim() === "" && !description && description.trim() === "" && !posterUrl && posterUrl.trim() === "" ) {
        return res.status(422).json({message:"Invalid inputs"});
    }
    let movie;
    try {
        movie = new Movie({title, description, releaseDate : new Date(`${releaseDate}`), posterUrl, featured, actors, admin: adminId});
        const session = await mongoose.startSession();
        const admniUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({session});
        admniUser.addedMovies.push(movie);
        await admniUser.save({session});
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }
    if(!movie) {
        return res.status(500).json({message:"Request failed"});
    }

    return res.status(201).json({message:"Movie added successfully", movie});
    
}

export const getAllMovies = async (req, res) => {
    let movies;
    try {
        movies = await Movie.find();
    } catch (error) {
        return console.log(error);
    }

    if(!movies) {
        return res.status(404).json({message:"Request Failed"});
    }
    return res.status(200).json({movies});
}

export const getMovieById = async (req, res) => {
    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id)
    } catch (error) {
        return console.log(error);
    }

    if(!movie) {
        return res.status(404).json({message:"Invalid movie id"});
    }
    return res.status(200).json({movie});
}

export const deleteMovie = async (req, res) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; 
    if(!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({message:"Token Not Found"});
    }

    let adminId;
    const decodedToken = jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) =>{
        if(err) {
            return res.status(400).json({message:`${err.message}`});
        }else{
            adminId = decrypted.id;
            return; 
        }
    });

    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id).populate("admin bookings");
        if (!movie) throw new Error("Movie not found");

        const session = await mongoose.startSession();
        session.startTransaction();
        movie.admin.addedMovies.pull(movie._id);
        await movie.admin.save({ session });

        for (const bookingId of movie.bookings) {
            const bookingDetails = await Booking.findById(bookingId).populate("user");
            if (bookingDetails) {
                await Booking.findByIdAndDelete(booking, { session });
                bookingDetails.user.bookings.pull(bookingId);
                await bookingDetails.user.save({ session });
            }
        }
        await Movie.findByIdAndDelete(movieId, { session });
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        // if (session) await session.abortTransaction();
        return console.log(error);
    }

    return res.status(200).json({message:"Movie deleted successfully"});
}