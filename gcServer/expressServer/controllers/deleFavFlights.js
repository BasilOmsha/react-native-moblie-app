// const User = require('../models/User');
// const { FaveOneWayFlight, FaveRoundTripFlight } = require('../models/Flight');

// // const deleteFavFlightsByid = async (req, res) => {
// //     try {
// //         const { _id } = req.body;

// //         // Find the user by ID and populate favoriteFlights with OneWayFlight and RoundTripFlight data
// //         const favoriteOneWayFlights = await User.findById(_id)
// //             .populate({
// //                 path: 'favoriteOneWayFlights'
                
// //             });

// //             const favoriteRoundTripFlights = await User.findById(_id)
// //             .populate({
// //                 path: 'favoriteRoundTripFlights'
                
// //             });

// //         if (!favoriteOneWayFlights || !favoriteRoundTripFlights) {
// //             return res.status(404).json({ success: false, error: 'User not found' });
// //         }

// //         // User found, return their favorite flights with populated data
// //         res.json({ success: true, favoriteOneWayFlights: favoriteOneWayFlights.favoriteOneWayFlights, favoriteRoundTripFlights: favoriteRoundTripFlights.favoriteRoundTripFlights });
// //     } catch (error) {
// //         res.status(500).json({ success: false, error: error.message });
// //     }
// // };

// // module.exports = { deleteFavFlightsByid };
