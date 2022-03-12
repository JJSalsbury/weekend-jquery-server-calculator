console.log('client loaded!');

//*

$(document).ready(handleReady);

function handleReady() {
    console.log('JQuery ready to roll!');

    //after adding a button to html and two fields...
    $('#submit').on('click', handleSubmit);
    $('#add').on('click', handleSubmit);
    $('#subtract').on('click', handleSubmit);
    $('#multiply').on('click', handleSubmit);
    $('#divide').on('click', handleSubmit);
    $('#clear').on('click', handleSubmit);

getData();
}

//function to handleSubmit btn when clicked. added listener
function handleSubmit() {
    console.log('clicked!');
    let num1 = $('#num1').val();
    let num2 = $('#num2').val();
    console.log(num1, num2);
    
    $.ajax({
        url: '/calc',
        method: 'POST',
        //data will become req.body on the server
        data: {
            num1: num1,
            num2: num2
        }
    }).then(function(response) {
        console.log(response)
        
        //DOM is out of sync, need to GET again, call the getData function
        // //Call render function to render to DOM.
        // render(response); !!!!made it show undefined in console on click then would
        // showed appended data after second click
        //
        getData();

        //empty inputs on DOM
        $('#num1').val('');
        $('#num2').val('');
    })
}

//Created function to clear input on button click.
function handleClear(){
    $('input').val('');
    // $('#num2').val('');
}


//AJAX!!!!!! REQ AND RESPONSE. starts from client, server responds...
function getData(){
    console.log('GET dataLibrary');
    //ajax method built into Jquery. you call it and ask it what to do...
    $.ajax({
        //tells ajax we going here
        url : '/calc',
        //tells ajax we request something
        method: 'GET'
        //.then tells the server what to do after the time it takes for the request to get across the net. we made an
        //anonymous function
    }).then(function(response) {
        //this is asking for the res.send(); on the server in thr app.get route...
        console.log(response)
        //log- ** NOW... append the data in the response to the DOM
        
        //Call render function to render to web pass argument
        render(response);
    
    }).catch(function(error) {
        //this is catching errors for the res.send(); on the server in thr app.get route...
        console.log(error);
        alert('error in GET!')
})
    console.log('end of getData Function...')
}//end of getData

function render(calculations) {
    //wash away old data
    $('#calc').empty();
    console.log('In render Function');
    //
    for (const calc of calculations) {
        $('#calc').append(`<li>${calc.num1} ${calc.num2}</li>`)
    } 
}