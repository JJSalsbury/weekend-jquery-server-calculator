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

    calculate(req.body);
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

function calculate (solution) {
    let input1 = Number(solution.num1);
    let math = solution.math;
    let input2 = Number(solution.num2);
    
    switch (math) {
        case '+':
            answer = input1 + input2;
            dataLibrary.push(`${answer} = ${input1} + ${input2}`);
            answers.push(answer);
            break;

        case '-':
            answer = input1 - input2;
            dataLibrary.push(`${answer} = ${input1} - ${input2}`);
            answers.push(answer);
            break;
        case '*':
            answer = input1 * input2;
            dataLibrary.push(`${answer} = ${input1} * ${input2}`);
            answers.push(answer);
            break;
        case '/':
            answer = input1 / input2;
            dataLibrary.push(`${answer} = ${input1} / ${input2}`);
            answers.push(answer);
            break;
    }
}
