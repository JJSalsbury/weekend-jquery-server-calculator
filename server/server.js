//Installed express module in node 

//Importing/requiring express library
const express = require('express');

//Server creation:
const app = express();
const PORT = 5000;

//Importing/requiring body parser
const bodyParser = require('body-parser');

//Created empty arrays to store dynamic data.
const data = [];
const answers = [];

//added bodyParser app to add a new line of text to the data array
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// start the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

//**POST Routes**//

//POST route to localhost:5000/calc
app.post('/calc', (req, res) => {
    console.log('POST calc', req.body);
    
    //getData Function from client side will initiate a GET request for the url assignment, /calc.
    //The product of the calculate function becomes the req.body and will be the response from 
    //the server to the client.
    calculate(req.body);

    //Status code. Request is received and understood and is being processed.
    res.sendStatus(200);
})

//** GET Routes **//

//GET route to localhost:5000/calc
app.get('/calc', (req, res) => {
    //log'd to ensure that route is operation.
    console.log('GET /calc route OK');
    //Server responds with data array that holds dynamic data. 
    res.send(data);
})

//GET route to localhost:5000/answers
app.get('/answers', (req, res) => {
    //log'd to ensure that route is operation.
    console.log('GET /answers route OK');
    //Server responds with answers array that holds dynamic data.
    res.send(answers);
})

//Created function to calculate user input (2 numbers and a mathematics operator).
function calculate(solution) {
    console.log('In Calculate function');

    //Created variables and set their values to the properties from the ajax req.
    let input1 = Number(solution.num1);
    let math = solution.math;
    let input2 = Number(solution.num2);

    //Used a switch statement to execute based on each case. The value of math (the use
    //is checked in each case, then will execute condition and push the condition as 
    //a string to the data array and answers array.
    //pushed user input values to data array as a string.
    //pushed product of calculate function to answers array. 
    switch (math) {
        case '+':
            //condition
            answer = (Number(input1) + Number(input2));
            data.push(`${input1} + ${input2} = ${answer}`);
            answers.push(answer);
            break;

        case '-':
            //condition
            answer = (Number(input1) - Number(input2));
            data.push(`${input1} - ${input2} = ${answer}`);
            answers.push(answer);
            break;
        case 'x':
            //condition
            answer = (Number(input1) * Number(input2));
            data.push(`${input1} * ${input2} = ${answer}`);
            answers.push(answer);
            break;
        case '÷':
            answer = (Number(input1) / Number(input2));
            data.push(`${input1} / ${input2} = ${answer}`);
            answers.push(answer);
            break;
    }
}//end of calculate Function.



