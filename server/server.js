//requiring express
const express = require('express');
//make a server
const app = express();
const PORT = 5000;
//bodyParser is like a mail sorter... **see bodyParser app below
//IMPORT body parser
const bodyParser = require('body-parser');

const dataLibrary = [];
const answers = [];

//**add bodyParser app to add a new line of text to the dataLibrary
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

//**GET & POST Routes go here **//

// start the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

app.post('/calc', (req, res) => {
    console.log('POST calc', req.body);

    let input1 = Number(req.body.num1);
    let operator = req.body.math;
    let input2 = Number(req.body.num2);

    dataLibrary.push(req.body);
    //console.log(dataLibrary.num1)
    
    // function calculate (num1, operator, num2) {
    //     let answer = input1 + input2;
    //     return answer;
    // }

    //200 ok
    //201 CREATED

    res.sendStatus(200);
})


//-------------GET ROUTES---------------//
//localhost:5000/calc
app.get('/calc', (req, res) => {
    // /calc route
    // get route to /calc

    console.log('GET /calc!');
    //server must respond!
    res.send(dataLibrary);
})

// function addNum(num1, num2) {
//   //let sum = num1  + num2;
//     let sum = dataLibrary.num1 + dataLibrary.num2
//     return sum;
// }