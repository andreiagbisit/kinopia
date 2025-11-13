import express from 'express'
import { getNowPlayingTrailers } from '../controllers/trailerController.js'

const trailerRouter = express.Router()

// GET ROUTE
trailerRouter.get('/now-playing-trailers', getNowPlayingTrailers)

export default trailerRouter
