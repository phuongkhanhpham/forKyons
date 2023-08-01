const axios = require('axios');

// call get API using axios
async function getCerebryToken(callback) {
    try {
        const getTokenUrl = `https://staging.sparkbackend.cerebry.co/api/v4/partner/user/kyons-student-app-kp96.freelancer+4@gmail.com/token/`;
        const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMjQ5NzcsInVzZXJuYW1lIjoicGFydG5lckBrc3ZuLmNvbSIsImV4cCI6MTY4MTk5OTAwNywiZW1haWwiOiJwYXJ0bmVyQGtzdm4uY29tIiwib3JpZ19pYXQiOjE2ODE5ODQ2MDcsImF1ZCI6IlB5dGhvbkFwaSIsImlzcyI6IkNlcmVicnkifQ.KCCIcmVFKqqFVgobru_pA834E1tIERvqVb9N0V_mkp8';

        const response = await axios.get(getTokenUrl, {
        headers: {
            'jwt-token': authToken
        }
        });

        responseData = response.data.token; // Assign the response data to the variable
        callback(responseData); // Call the callback function with the API data
    } catch (error) {
        console.error('Error making API call:', error.message)
    }
    }

module.exports = { getCerebryToken };
