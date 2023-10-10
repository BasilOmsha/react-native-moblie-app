const User = require('../models/User');
const { FaveOneWayFlight, FaveRoundTripFlight } = require('../models/Flight');

const addFlightsToFavorite = async (req, res) => {
    const { _id, outboundFlights, returnFlights, capitalCityFrom, capitalCityTo } = req.body;

    try {
        let user;
        user = await User.findOne({ _id: _id });
        console.log('User: ' + user._id);
        if (!user) {
            res.status(401).json({ success: false, msg: "User Not Foudn!" });
        } else {
            if (outboundFlights && outboundFlights.length > 0 && (!returnFlights || returnFlights.length === 0)) {
                // Handle one-way trip
                const oneWayFlights = await FaveOneWayFlight.create(outboundFlights);

                // Find the user by ID and update the favoriteTrips array
                user = await User.findByIdAndUpdate(
                    _id,
                    { $push: { favoriteOneWayFlights: oneWayFlights } }, // Assuming you have a favoriteTrips field in your User schema
                    { new: true }
                );
            }

            else if (returnFlights && returnFlights.length > 0) {
                // Handle round trip
                // const oneWayFlights = await OneWayFlight.create(outboundFlights);
                const roundTripFlights = await FaveRoundTripFlight.create(returnFlights.map(rt => ({
                    outbound: rt.outbound,
                    return: rt.return
                })));

                // Find the user by ID and update the favoriteTrips array
                user = await User.findByIdAndUpdate(
                    _id,
                    { $push: { favoriteRoundTripFlights: roundTripFlights } }, // Assuming you have a favoriteTrips field in your User schema
                    { new: true }
                );
            } else {
                return res.status(400).json({ success: false, error: 'Invalid flight data structure' });
            }
        }

        res.json({ success: true, user: user, msg: "Flight added to favorites successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { addFlightsToFavorite };

