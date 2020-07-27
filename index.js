const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactlist=[
    {
        name:"abhishek",
        phone:"1111111111"
    },
    {
        name:"naman",
        phone:"1234567890"
    }
]

app.get('/',function(req,res){
    
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching the contacts from DB!');
            return;
        }
        return res.render('home',{title:"Contacts List",contact_list:contacts});
    });
      
});

app.get('/practice',function(req,res){
   
    return res.render('practice',{title:"lets play football"});  
});

app.post('/create-contact',function(req,res){

   // contactlist.push(req.body);
   Contact.create({
       name:req.body.name,
       phone:req.body.phone
   },function(err,newContact){
       if(err){
           console.log('error creating a contact!');
           return;
       }
       console.log('****',newContact);
       return res.redirect('back');  
   });
    
});

// for deleting contact
app.get('/delete-contact',function(req,res){
    //Get the id(property) request.query.(any)
    let id=req.query.id;
    
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting object from database');
            return;
        }
        return res.redirect('back');
    });

});

app.listen(port,function(err){
    if(err)
    {
        console.log("error in running the server",err);
        
    }
    console.log("Yay!,my express server is running on port: ",port);
});