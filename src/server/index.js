const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const bodyParser = require('body-parser')
let dataType = {};
const dotenv = require('dotenv');
dotenv.config();


const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

// app.post('/test', function(req, responseData) {
//     let newURL = req.body.url;
//     textapi.sentiment({ url: newURL },
//         function(err, res) {
//             if (err === null) {
//                 dataTyple.polarity = res.polarity;
//                 dataTyple.polarity_confidence = res.polarity_confidence;
//                 dataTyple.subjectivity = res.subjectivity;
//                 dataTyple.subjectivity_confidence = res.subjectivity_confidence;
//                 responseData.send(dataTyple);
//             } else {
//                 console.log(`following error: ${err}`)
//             }
//         });
// });

app.post('/add', informationTrip);

function informationTrip(req, res) {
    dataType['depCity'] = req.body.depCity;
    dataType['arrCity'] = req.body.arrCity;
    dataType['depDate'] = req.body.depDate;
    // dataType['returnDay'] = req.body.returnDay;
    dataType['weather'] = req.body.weather;
    dataType['summary'] = req.body.summary;
    dataType['daysLeft'] = req.body.daysLeft;
    res.send(dataType);
}

// designates what port the app will listen to for incoming requests
// app.listen(8081, function() {
//     console.log('Example app listening on port 8081!')
// })
const port = 8081;
/* Spin up the server*/
const server = app.listen(port, listening);

function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};