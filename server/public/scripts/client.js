//Log'd to show client.js loaded.
console.log('client loaded!');
//Log'd to show js sourced.
console.log('js loaded!');

//Jquery call to document initiate starting output to DOM.
$(document).ready(handleReady);

//Created function to handle ready tasks.
function handleReady() {
    //Log'd to show JQuery sourced.
    console.log('JQuery loaded!');
    //Jquery call to target button element in html, as displayed on the DOM.
    //Will call functions on click.
    $('#equals').on('click', handleSubmit);
    $('.operator').on('click', handleOperator);
    $('#clear').on('click', handleClear);

    //Call to getData Function to run in handleReady
    getData();
}//end of handleReady function

//function to handleSubmit tasks when = button is clicked on the DOM by the user.
function handleSubmit() {
    let num1 = $('#num1').val();
    let num2 = $('#num2').val();
    console.log('User Input (num1):', num1, 'User Input (num 2):', num2);
    console.log('Sending dynamic data (user inputs) to server');

    //AJAX!!!!!! REQ AND RESPONSE. starts from client, server responds...
    //ajax method: POST request. Requests the get route from the server and the type request. 
    $.ajax({
        url: '/calc',
        method: 'POST',
        //data will become req.body on the server
        //created object keys to take in user input
        data: {
            num1: num1,
            math: math,
            num2: num2
        }
    }).then(function (response) {
        //Log'd to show post route in server OK (res.sendStatus(200)).
        console.log(response)
        //Call to getData function to initiate in handleSubmit
        getData();

        //empty inputs on DOM
        $('#num1').val('');
        $('#num2').val('');
    })
}//end of handleSubmit function

//Created function to clear input on button click.
function handleClear() {
    //Jquery call to input elements and empty on DOM
    $('input').val('');
}//end of handle clear function

//Created function to get data from the server.
//AJAX!!!!!! REQ AND RESPONSE. starts from client, server responds...
function getData() {
    console.log('GET data');
    //ajax method: GET request. Requests the get route from the server and the type of request.
    $.ajax({
        //direction to '/calc' route from server.
        url: '/calc',
        //direction to request a type of route (GET route).
        method: 'GET'   
    })

    //Used .then to initiate server action after receipt of the GET request.
    //Will receive res.send(answers) from the server, as directed in the app.get/answers route.
    .then(function (response) {
        //Log'd response from server in console 
        console.log('data[]; (on server.js):', response);
        //NOW... append the data in the response to the DOM
        //Call render function to initiate in getData Function. Should render data to DOM.
        render(response);
    })
    
    //Used .catch method to catch errors for the res.send() on the server in the app.get route.
    .catch(function (error) {
        //logged to see error incase alert isn't working.
        console.log(error);
        //created alert to display to the DOM indicating error in GET /calc request.
        alert('error in GET /calc!');
    })
    //ajax method: GET request. Requests the get route from the server and the type of request.
    $.ajax({
        //direction to '/answers' route from server.
        url: '/answers',
        //direction to request a type of route (GET route).
        method: 'GET'
    })

    //Used .then method to initiate server action after receipt of the GET request.
    //Will receive res.send(answers) from the server, as directed in the app.get/answers route.
    .then(function (response) {
        console.log('answers[]; (on server.js):', response);
        //client responds with product from userAnswers function.
        userAnswer(response);
    })
    
    //Used .catch method to catch errors for the res.send() on the server in the app.get route.
    .catch(function (error) {
        //logged to see error incase alert isn't working.
        console.log(error);
        //created alert to display to the DOM indicating error in GET /answers request.
        alert('error in GET /answers!');
    })
    console.log('end of getData Function');
}//end of getData Function.

//Created function to render to the DOM.
//Called in getData Function.  
//(Calculation as an parameter), Argument is rec.body from the server side post route.
function render(calculation) {
    //Clear old data.
    $('#calc').empty();
    //Log'd to show in render function.
    console.log('Render Function Operable');
    //Created for of loop through the response from the server (req.body from the server side POST route).
    for (const answer of calculation) {
        //Jquery call to prepend to calc element in html
        $('#calc').prepend(`<li>${answer}</li>`);
    }
}//end of renderFunction.

//declares a variable that the handleOperator can define.
let math = 0;

//Created function to handle operator click from user.
function handleOperator() {
    //Jquery call to target text on click and set the value to operations. 
    math = $(this).text();
}//end of handleOperator function.

//Created function to handle userAnswer
//(Calculation as parameter). Argument is rec.body from the server side post route.
function userAnswer(calculation) {
    //clears old data to the DOM.
    $('#results').empty();
    //Jquery call to prepend to the answer to the users calculation to the DOM. 
    //Since I only want to prepend the last item property, I use the object length -1.
    $('#results').prepend(calculation[calculation.length - 1]);
}//end of userAnswer function.


