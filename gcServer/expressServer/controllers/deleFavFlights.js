const User = require('../models/User');
const { FaveOneWayFlight, FaveRoundTripFlight } = require('../models/Flight');

const deleteFavFlightsByid = async (req, res) => {
    console.log("Test2")
    const { user_id, _id } = req.body;
    console.log("user_id " + user_id)
    console.log("_id " + _id)
    try {
        const user = await User.findById(user_id);
        console.log("user " + user)
        if (user) {
            const oneWayFavFlight = await FaveOneWayFlight.findById(_id);
            console.log("oneWayFavFlight " + oneWayFavFlight)
            if (oneWayFavFlight) {
                const deleteOneWay = await FaveOneWayFlight.deleteOne({ _id: _id });
                const dlt = await User.updateOne({ _id: user_id }, { $pull: { favoriteOneWayFlights: _id } });
                const favoriteOneWayFlights = await User.findById(user_id)
                    .populate({
                        path: 'favoriteOneWayFlights'

                    });
                const favoriteRoundTripFlights = await User.findById(_id)
                    .populate({
                        path: 'favoriteRoundTripFlights'

                    });
                    if(favoriteRoundTripFlights.favoriteRoundTripFlights == null){
                        return res.json({ success: true, favoriteOneWayFlights: favoriteOneWayFlights.favoriteOneWayFlights, favoriteRoundTripFlights: "" });
                    }
                return res.json({ success: true, favoriteOneWayFlights: favoriteOneWayFlights.favoriteOneWayFlights, favoriteRoundTripFlights: favoriteRoundTripFlights.favoriteRoundTripFlights });
            } else {
                const deleteRound = await FaveRoundTripFlight.deleteOne({ _id: _id });
                console.log("deleteRound " + deleteRound)
                const dlt = await User.updateOne({ _id: user_id }, { $pull: { favoriteRoundTripFlights: _id } });
                const favoriteOneWayFlights = await User.findById(user_id)
                    .populate({
                        path: 'favoriteOneWayFlights'

                    });
                const favoriteRoundTripFlights = await User.findById(_id)
                    .populate({
                        path: 'favoriteRoundTripFlights'

                    });
                    if(favoriteOneWayFlights.favoriteOneWayFlights == null){
                        return res.json({ success: true, favoriteOneWayFlights: "", favoriteRoundTripFlights: favoriteRoundTripFlights.favoriteRoundTripFlights });
                    }
                return res.json({ success: true, favoriteOneWayFlights: favoriteOneWayFlights.favoriteOneWayFlights, favoriteRoundTripFlights: favoriteRoundTripFlights.favoriteRoundTripFlights });
            }
        } else
            return res.status(404).json({ success: false, error: 'User not found' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { deleteFavFlightsByid };
