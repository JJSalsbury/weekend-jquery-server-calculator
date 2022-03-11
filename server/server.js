//requiring express
const express = require('express');
//make a server
const app = express();
const PORT = 5000;
//bodyParser is like a mail sorter... **see bodyParser app below
//IMPORT body parser
const bodyParser = require('body-parser');



let dataLibrary = [
    // { text: 'I\'m not going to school just for the academics - I wanted to share ideas, to be around people who are passionate about learning.', author: 'Emma Watson' },
    // { text: 'Remember there\'s no such thing as a small act of kindness. Every act creates a ripple with no logical end.', author: 'Scott Adams' },
    // { text: 'Intelligence plus character-that is the goal of true education.', author: 'Martin Luther King, Jr.' }
];


//**add bodyParser app to add a new line of text to the quoteLIST
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

//**GET & POST Routes go here **//

// start the server
app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

app.post('/calc', (req, res) => {
    console.log('POST calc', req.body);

    dataLibrary.push(req.body);

    //200 ok
    //201 CREATED

    res.sendStatus(200);
})

//localhost:5000/calc
app.get('/calc', (req, res) => {
    // /quotes route
    // get route to /quotes

    console.log('GET /calc!');
    //server must respond!
    res.send(dataLibrary);

})
