const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');

const app=express();
app.use(cors());
app.use(bodyparser.json());

// connection mysql server
const db=mysql.createConnection(
    {
host:'localhost',
user:'root',
password:'',
database:'userinfo',
port:3306
  
    
    });

//check database connection
db.connect(err=>{
    if(err){console.log('err')}
    else{
    console.log("Database connected successfully...");
    }
});


//get all data
app.get('/users',(req,res)=>{
    //console.log("Gell all users")
    let qrr=`select * from users`;
    db.query(qrr,(err,result)=>{
        if(err){
            console.log(err,'errs')
        }
        if(result.length>0){
           res.send( {message:'All users Data',
                        data:result
                    } )
        }
    })
});


//get data by id
app.get('/user/:id',(req,res)=>{
    //console.log("get data by id "+req.params.id)
    let qrId=req.params.id;
    let qrr=`select * from users where id=${qrId}`;
    db.query(qrr,(err,result)=>{
        if(err){
            console.log(err,'errs')
        }
        if(result.length>0){
           res.send( {message:'Get user data by Id',
                        data:result
                    } )
        }else{
            res.send({
                message: 'user data not available for this Id'
            })
        }
    })
});


//post data
app.post('/user',(req,res)=>{
    console.log("post data success "+req.body.fullname)
    let fullName=req.body.fullname;
    let eMail=req.body.email;
    let Mobile=req.body.mobile;
    let qrr=`INSERT INTO users (fullname, email, mobile) VALUES ('${fullName}','${eMail}','${Mobile}')`;
    db.query(qrr,(err,result)=>{
        if(err){
            console.log(err,'errs')
        }
        res.send( {message:'user data created successfully',
                        data:result
             } )
       
    })
  
});

//Update user by id
app.put('/user/:id',(req,res)=>{
    //console.log("data updated "+req.body);
    let Uid=req.params.id;
    let fullName=req.body.fullname;
    let eMail=req.body.email;
    let Mobile=req.body.mobile;

    let qrr=`UPDATE users SET fullname='${fullName}',email='${eMail}',mobile='${Mobile}' WHERE id='${Uid}'`;
    db.query(qrr,(err,result)=>{
        if(err){
            console.log(err,'errs')
        }
        res.send( {message:'user data updated successfully',
                        data:result
             } )
       
    })

})

//delete by id
app.delete('/user/:id',(req,res)=>{
    //console.log("delete successfully"+req.params.id);
    let Uid= req.params.id;
    let qrr=`DELETE FROM users WHERE id='${Uid}'`;
    db.query(qrr,(err,result)=>{
        if(err){
            console.log(err,'errs')
        }
        res.send( {message:'user data deleted successfully',
                        //data:result
             } )
       
    })

})


app.listen(3000,()=>{
    console.log("Server is running on 3000 port..."); 
});