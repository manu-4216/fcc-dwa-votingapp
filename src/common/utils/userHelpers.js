var axios = require('axios');

var helpers = {
    isLoggedIn: function () {
        return axios.get('/checklogin')
            .then(function (response) {
                return response.loggenIn
            })
            .catch(function (err) {
                console.warn('Error in /checklogin', err);
            })
    }
}

module.exports = helpers
