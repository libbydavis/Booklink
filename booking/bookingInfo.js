module.exports = {
    getBookedTimes : async function (companyID, client) {
        const ObjectId = require('mongodb').ObjectId;
        let bookingTimeResult = await client.db('Booking').collection('bookedTimes').findOne({"_id": new ObjectId(companyID)});
        console.log(bookingTimeResult)
        if (bookingTimeResult) {
            return bookingTimeResult;
        }
        return false;
    }
}
