const express=require("express");
const path=require('path');
const mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    database:'skill_software',
    user:'aniket',
    password:'joshi',
});
connection.connect((err)=>{
    if (err){
        console.log(err)
    }
    console.log('connected as id'+connection.threadId)
})

const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded());
const ejs = require('ejs');
app.set('view enjine','ejs');
//path.join(__dirname+'/index.html')
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/mainpage.html'))
})
app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/login.html'))
    
})


app.post('/login',(req,res)=>{
    var userid=req.body.userid
    var password=req.body.password
    var query2='select password from usertable where user_id=\"'+ userid+ '\"';
    function working(){
        res.redirect('/teacher')
    }
    function notworking(){
        res.redirect('/login')
    }
    connection.query(query2,(err,res)=>{
        if(err){
            throw err;
        }
        if (userid=='teacher1'){
            var pass=res[0]["password"];
            if (password==pass){
                working()
            }
            else{
                notworking()
            }
        }
        
    })
    
    
})
app.get('/teacher',(req,res)=>{
    res.sendFile(path.join(__dirname+'/teacher.html'))
})
app.get('/t_attendance',(req,res)=>{
    var att_q="select student_id,total_lectures,present from attendance"
    function send_query(tablet){
        res.render('t_attendance.ejs',{table:tablet});
    }
    
    // var t_div=document.getElementById("at_table")
    var table1="<table><tr><th>Student Name</th><th>Total lectures</th><th>Present Lectures</th></tr>"
    connection.query(att_q,(err,res)=>{
        res.forEach(element => {
            console.log(element)
            var id=element["student_id"]
            var total_lectures=element["total_lectures"]
            var present=element["present"]
            var table="<tr><td>"+id+"</td><td>"+total_lectures+"</td><td>"+present+"</td></tr>"
            table1=table1+table
            
        })
        table1=table1+"</table>"
        console.log(table1)
        send_query(table1)
    })
    
})
app.post('/t_attendance',(req,res)=>{
    st1=req.body.st_1_att
    st2=req.body.st_2_att
    st3=req.body.st_3_att
    st4=req.body.st_4_att
    if(st1=='on'){
        connection.query("update attendance SET total_lectures=total_lectures+1, present=present+1 WHERE student_id='student1'")
    }
    else{
        connection.query("update attendance SET total_lectures=total_lectures+1 WHERE student_id='student1'")
    }
    if(st2=='on'){
        connection.query("update attendance SET total_lectures=total_lectures+1, present=present+1 WHERE student_id='student2'")
    }
    else{
        connection.query("update attendance SET total_lectures=total_lectures+1 WHERE student_id='student2'")
    }
    if(st3=='on'){
        connection.query("update attendance SET total_lectures=total_lectures+1, present=present+1 WHERE student_id='student3'")
    }
    else{
        connection.query("update attendance SET total_lectures=total_lectures+1 WHERE student_id='student3'")
    }
    if(st4=='on'){
        connection.query("update attendance SET total_lectures=total_lectures+1, present=present+1 WHERE student_id='student4'")
    }
    else{
        connection.query("update attendance SET total_lectures=total_lectures+1 WHERE student_id='student4'")
    }



    res.redirect('/t_attendance')
})
app.get('/t_marks',(req,res)=>{
    var att_q="select student_id,marks,outof from marks"
    function send_query(tablet){
        res.render('t_marks.ejs',{table:tablet});
    }
    
    // var t_div=document.getElementById("at_table")
    var table1="<table><tr><th>Student Name</th><th>Marks</th><th>Out of</th></tr>"
    connection.query(att_q,(err,res)=>{
        res.forEach(element => {
            console.log(element)
            var id=element["student_id"]
            var total_lectures=element["marks"]
            var present=element["outof"]
            var table="<tr><td>"+id+"</td><td>"+total_lectures+"</td><td>"+present+"</td></tr>"
            table1=table1+table
            
        })
        table1=table1+"</table>"
        console.log(table1)
        send_query(table1)
    })
    
})
app.get('/timetable',(req,res)=>{
    res.sendFile(path.join(__dirname+'/timetable.html'))
})
app.listen(3000,()=>{
    console.log("Server is started on port 3000")
})