//Require the library
const mongoose=require('mongoose');

//Connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//Acquire the connection(to check if it's successful)
const db=mongoose.connection;

//For any Error
db.on('error',console.error.bind(console,'Error connecting to db'));

//if up and running then print the message
db.once('open',function(){
    console.log("Successfully connected to database");
});