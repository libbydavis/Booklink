const bcrypt = require('bcryptjs');

module.exports = {
    authenticate : async function (email, password, client) {
        let result = await client.db('Login').collection('userDetails').findOne({email: email});
        let authenticated = false;
        if (result) {
            authenticated = bcrypt.compareSync(password, result.password);
        }
        return authenticated;
    },

    register : async function (registrationDetails, client) {
        let user = {
            email: registrationDetails.email,
            firstName: registrationDetails.firstName,
            lastName: registrationDetails.lastName,
            phone: registrationDetails.phone
        };

        let salt = bcrypt.genSaltSync(10);
        let hashPass = bcrypt.hashSync(registrationDetails.password, salt);
        user.password = hashPass;

        let register = await client.db('Login').collection('userDetails').insertOne(user);

        if (register.acknowledged) {
            return true;
        }
        return false;

    }
}
