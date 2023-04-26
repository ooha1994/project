const express = require('express')
const app=express()
const cors = require("cors");
var fs = require('fs');
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get("/api", (req,res)=>{
    res.json({"users" : ["userone","usertwo"]})
})
app.post("/api/login", (req,res)=>{
    console.log("login api called")
    const email = req.body.emailaddress;
    const password = req.body.password;
    var data = fs.readFileSync("registeredusers.json");
    var myObject = JSON.parse(data);
    for(var i=0;i<myObject.length;i++){
		if(myObject[i].emailAddress ==email & myObject[i].password==password){
			var message = "User existed"
            var firstname = myObject[i].firstName
            var level = myObject[i].level
            var lastname = myObject[i].lastName
			// res.send("User existed")
		}
	}
    if(message=="User existed"){
        res.send({'message':"users exists",'firstname':firstname,'lastname':lastname,'level':level,'email':email})
    }
    else{
        res.send({'data':{'message':'user doesnt exist'}})
    }



})
// app.get('/getUsers', function(req, res){
//     console.log("get users called")
//     fs.readFile(__dirname + "/" + "test.json", 'utf8', function(err, data){
//         console.log("in read file")
//         console.log(data);
//         res.end(data); // you can also use res.send()
//     });
// })   
app.post('/api/register', function(req, res){
    console.log("called register api")
    const email = req.body.emailAddress;
    var data = fs.readFileSync("registeredusers.json");
    var myObject = JSON.parse(data);
    for(var i=0;i<myObject.length;i++){
		console.log("email address",myObject[i].emailAddress)
		if(myObject[i].emailAddress==email){
			var message = "User existed"
			// res.send("User existed")
		}
	}
    if(message=="User existed"){
        res.send({message:"User already exists..."})
    }
    else{
        myObject.push(req.body);
        var newData2 = JSON.stringify(myObject);  
        fs.writeFile("registeredusers.json", newData2, (err) => {
            if (err) throw err;
            res.send({message:"User registered"})
        });   

    }
 
})

//This API is used to insert new scheduled appointments
app.post('/api/newschedules', function(req, res){
    console.log("newschedules api called")
    const min = 10; // minimum value
    const max = 99999; // maximum value
    const serialNumber = Math.floor(Math.random() * (max - min + 1)) + min;
     var data = fs.readFileSync("newschedulesdata.json")
     var myObject = JSON.parse(data);
     const newscheduledata = req.body;
     newscheduledata['scheduleid'] = serialNumber.toString();
     myObject.push(req.body);
     var newData2 = JSON.stringify(myObject); 
     fs.writeFile("newschedulesdata.json", newData2, (err) => {
        if (err) throw err;
        res.send({message:"New schedule registered"})
    }); 

})
//This API is used to get professor who scheduled appointments
app.post('/api/getprofessors', function(req, res){
    // console.log("getprofessors api called")
    var data = fs.readFileSync("newschedulesdata.json")
    var myObject = JSON.parse(data);
    var professors=[];
    for(var i=0;i<myObject.length;i++){
        professors.push(myObject[i].name);
    }
    const uniqueArr = [...new Set(professors)];
    res.send(uniqueArr)
})

//this api is called when typeaheaddropdown.js available scchedules to students
app.post('/api/test', function(req, res){
    console.log("test api called")
    const professorname = req.body.professor;
    var data = fs.readFileSync("newschedulesdata.json")
    var myObject = JSON.parse(data);
    var availableslots=[];
    for(var i=0;i<myObject.length;i++){
        if(myObject[i].name==professorname){
            if(myObject[i].status=='open'){
                availableslots.push(myObject[i]);
                // myObject[i]["clicked"]= false;
            }            
        }    
    }
    res.send(availableslots)
})

app.post('/api/getappointments', function(req, res){
    console.log("get appointments api called")
    const name = req.body.name;
    const level = req.body.level;
    var data = fs.readFileSync("studentappointments.json")
    var myObject = JSON.parse(data);
    var studentappointments=[];
    var professorappointments=[];
    if(level=="student"){
        for(var i=0;i<myObject.length;i++){
            if(name == myObject[i].studentname) 
                studentappointments.push(myObject[i]);
        }
        res.send({"studentappointments":studentappointments})
        // console.log("studentappointments",studentappointments)
    }
    if(level=="professor"){
        console.log("gIn professor level")
        console.log("name",name)
        for(var i=0;i<myObject.length;i++){ 
            if(name == myObject[i].professorname) 

                // console.log("myObject[i]",myObject[i])
                professorappointments.push(myObject[i]);
        }
        console.log("professorappointments",professorappointments)
        res.send({"professorappointments":professorappointments})
    }
    
})
app.post('/api/bookappointment', function(req, res){
    const min = 10; // minimum value
    const max = 99999; // maximum value
    const serialNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("book appointments api called")
    const appointmentdata = req.body;
    appointmentdata['boookingid'] = serialNumber.toString();
    console.log("appointmentdata",appointmentdata)
    // const name = req.body.name;
    // const level = req.body.level;
    var data = fs.readFileSync("studentappointments.json")
    var myObject = JSON.parse(data);
    // console.log("myObject",myObject)
    myObject.push(appointmentdata);
    var newData2 = JSON.stringify(myObject);
    // console.log("newData2",newData2) 
    fs.writeFile("studentappointments.json", newData2, (err) => {
        if (err) throw err;
            res.send({message:"Appointment booked"})
    });  


    
})

app.post('/api/closeappointments', function(req, res){
    console.log("book appointments api called")
    const bookingid = req.body.bookingid;
    console.log("bookingid",bookingid)
    // const name = req.body.name;
    // const level = req.body.level;
    var data = fs.readFileSync("studentappointments.json")
    var myObject = JSON.parse(data);
    for(var i=0;i<myObject.length;i++){
        if(bookingid == myObject[i].boookingid) 
        {
            if(myObject[i].status == "open"){
                console.log("item is opened")
                myObject[i].status = 'closed'
                console.log("myObject[i].status",myObject[i].status )
            }            
        }  
    } 
    fs.writeFileSync('studentappointments.json', JSON.stringify(myObject),(err)=>{
        if (err) throw err;
        res.send({message:"Appointment closed"})
    });


    
})
app.post('/api/getappointmentcount', function(req, res){
    console.log("get student appointments count api called")
    const name = req.body.name;
    const level = req.body.level;
    var data = fs.readFileSync("studentappointments.json")
    var myObject = JSON.parse(data);
    var studentopenappointments=[];
    var studentcloseapoointments=[];
    var professoropenappointments=[];
    var professorcloseapoointments=[];
    if(level=="student"){
        console.log("fetching student details")
        for(var i=0;i<myObject.length;i++){
            if(name == myObject[i].studentname)
            {
                if(myObject[i].status == "closed"){
                    studentcloseapoointments.push(myObject[i]);
                }
                else{
                    studentopenappointments.push(myObject[i]);
                }
            }                    
        } 
        res.send({"studentopenappointments":studentopenappointments,"studentcloseapoointments":studentcloseapoointments})           
    }
    if(level=="professor"){
        console.log("fetching professor details")
        for(var i=0;i<myObject.length;i++){
            if(name == myObject[i].professorname)
            {
                if(myObject[i].status == "closed"){
                    professorcloseapoointments.push(myObject[i]);
                }
                else{
                    professoropenappointments.push(myObject[i]);
                }
            }                    
        }
        console.log("professoropenappointments",professoropenappointments) 
        res.send({"professoropenappointments":professoropenappointments,"professorcloseapoointments":professorcloseapoointments})  
    }
    
})

app.post('/api/getschduledappointments', function(req, res){
    console.log("getschduledappointments api called")
    const professorname = req.body.name;
    var data = fs.readFileSync("newschedulesdata.json")
    var myObject = JSON.parse(data);
    var scheduledslots=[];
    for(var i=0;i<myObject.length;i++){
        if(myObject[i].name==professorname){
            scheduledslots.push(myObject[i]);
            // if(myObject[i].status=='open'){
            //     scheduledslots.push(myObject[i]);
            //     // myObject[i]["clicked"]= false;
            // }            
        }    
    }
    res.send(scheduledslots)
})

app.post('/api/closeschedule', function(req, res){
    console.log("close schedule api called")
    const scheduleid = req.body.scheduleid;
    // const name = req.body.name;
    // const level = req.body.level;
    var data = fs.readFileSync("newschedulesdata.json")
    var myObject = JSON.parse(data);
    for(var i=0;i<myObject.length;i++){
        if(scheduleid == myObject[i].scheduleid) 
        {
            if(myObject[i].status == "open"){
                console.log("item is opened")
                myObject[i].status = 'closed'
                console.log("myObject[i].status",myObject[i].status )
            }            
        }  
    } 
    fs.writeFileSync('newschedulesdata.json', JSON.stringify(myObject),(err)=>{
        if (err) throw err;
        res.send({message:"Schedule closed"})
    });   
})
app.post("/api/getuserdetails", (req,res)=>{
    console.log("getuserdetails API called")
    const email = req.body.email;
    var data = fs.readFileSync("registeredusers.json");
    var myObject = JSON.parse(data);
    for(var i=0;i<myObject.length;i++){
        if(myObject[i].emailAddress==email){ 
            var data = myObject[i];
            var message="User existed"

			// res.send("User existed")
		}
    }
    if(message=="User existed"){
        res.send(data)
    }
    else{
        res.send("user doesn't exists")
    }

})


app.listen(4000,()=>{console.log("server started on 4000")})