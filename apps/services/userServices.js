const User = require('../models/user');

module.exports = {
    login: function (username, password) {
        let userCache;
        return User.findOne({ username: username})
            .then(userFound => {
                userCache = userFound;
                console.log(userCache)
                if(!userCache) return Promise.reject();
                const userData = Object.assign({}, userCache._doc)
                delete userData.password;
                console.log(userData)
                return Promise.resolve(userData)
                // const phoneId = userFound.phone_id;
                // return Phone.findOne({_id: phoneId})
            })
        // .then(phone => {
        //     // console.log(phone)
        //     // const userData = Object.assign({sdt: phone.sdt}, userCache._doc)
        //     delete userData.password;
        //     // delete userData.phone_id
        //     // return Promise.resolve(userData)
        //     return Promise.resolve(userCache)
        // })
    },
    register: function (user) {
        return new Promise(function (res, rej) {
            // const role = Role.findOne({role: user.role}).then(roleFound => {
            //     user.role_id = roleFound._id;

            let newUser = new User(user);
            newUser.save(function (err) {
                if (err) {
                    rej({ message: "error" })
                } else {
                    res(newUser)
                    
                }
            });
        });
    }
    
}