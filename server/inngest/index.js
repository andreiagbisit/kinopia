import { Inngest } from 'inngest'
import User from '../models/User.js'
import Booking from '../models/Booking.js'
import Show from '../models/Show.js'
import sendEmail from '../configs/nodeMailer.js'

// INNGEST - CLIENT TO SEND/RECEIVE EVENTS
export const inngest = new Inngest({ id: 'movie-ticket-booking' })

// INNGEST - SAVE USER DATA TO DATABASE
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    
    async({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }

        await User.create(userData)
    }
)

// INNGEST - DELETE USER FROM DATABASE
const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    
    async({ event }) => {
        const {id} = event.data
        await User.findByIdAndDelete(id)
    }
)

// INNGEST - UPDATE USER DATA FROM DATABASE
const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    
    async({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }

        await User.findByIdAndUpdate(id, userData)
    }
)

// INNGEST - CANCEL BOOKING + RELEASE SHOW SEATS 
// IF THE BOOKING PROCESS DID NOT REACH PAYMENT AFTER 10 MINUTES
const releaseSeatsAndDeleteBooking = inngest.createFunction (
    {id: 'release-seats-delete-booking'},
    {event: 'app/checkpayment'},
    async ({ event, step }) => {
        const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000)
        await step.sleepUntil('wait-for-10-minutes', tenMinutesLater)

        await step.run('check-payment-status', async () => {
            const bookingId = event.data.bookingId
            const booking = await Booking.findById(bookingId)

            // IF PAYMENT IS NOT MADE, RELEASE SEATS + DELETE BOOKING
            if(!booking.isPaid) {
                const show = await Show.findById(booking.show)
                booking.bookedSeats.forEach((seat) => {
                    delete show.occupiedSeats[seat]
                })

                show.markModified('occupiedSeats')
                await show.save()
                await Booking.findByIdAndDelete(booking._id)
            }
        })
    }
)

// INNGEST - SEND EMAIL WHEN USER BOOKS A SHOW
const sendBookingConfirmationEmail = inngest.createFunction (
    {id: 'send-booking-confirmation-email'},
    {event: 'app/show.booked'},
    async ({ event, step }) => {
        const { bookingId } = event.data
        const booking = await Booking.findById(bookingId).populate({
            path: 'show',
            populate: {path: 'movie', model: 'Movie'}
        }).populate('user')

        await sendEmail({
            to: booking.user.email,
            subject: `Booking Confirmation: '${booking.show.movie.title}' 🎞️`,
            body: `
            <div style="font-family: Arial, sans-serif; background-color: #09090B; padding: 30px;">
                <div style="max-width: 600px; margin: auto; background: #1A1A1D; padding: 25px; border-radius: 10px; color: #FFFFFF;">       
                    <h2 style="color: #FFFFFF; margin-top: 0;">
                        Hello ${booking.user.name},
                    </h2>

                    <p style="font-size: 15px; line-height: 1.6;">
                        Ready for <strong style="color: #7545F8;">"${booking.show.movie.title}"</strong>? Your booking is confirmed!
                    </p>

                    <div style="background: #27272A; padding: 15px; border-radius: 8px; margin: 18px 0;">
                        <p style="margin: 0; font-size: 15px;">
                            <strong style="color: #A78BFA;">Date:</strong> 
                            ${new Date(booking.show.showDateTime).toLocaleDateString('en-PH', { timeZone: 'Asia/Manila' })}
                            <br/>
                            
                            <strong style="color: #A78BFA;">Time:</strong> 
                            ${new Date(booking.show.showDateTime).toLocaleTimeString('en-PH', { timeZone: 'Asia/Manila' })}
                        </p>
                    </div>

                    <p style="font-size: 15px; line-height: 1.6;">
                        Wishing you a great movie experience! 🍿✨
                    </p>

                    <p style="font-size: 15px; line-height: 1.6;">
                        Thanks for choosing <strong style="color: #7545F8;">Kinopia</strong>—see you at the cinema!
                        <br/><br/>
                        
                        <span style="color: #BBBBBB;">— The Kinopia Crew</span>
                    </p>
                </div>
            </div>`
        })
    }
)

export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    releaseSeatsAndDeleteBooking,
    sendBookingConfirmationEmail
]