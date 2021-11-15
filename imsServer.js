//install and import express
const exp=require("express");
const app=exp();

//install and import mongodb
const mc=require("mongodb").MongoClient;
const dburl="mongodb://kumar007:kumar123@cluster0-shard-00-00-sxvmu.mongodb.net:27017,cluster0-shard-00-01-sxvmu.mongodb.net:27017,cluster0-shard-00-02-sxvmu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("err in connecting",err);
    }
    else{
        dbo=client.db('imsDatabase');
        console.log("connected to ims database");
    }
})


//assigning port
const port=4000;
app.listen(port,()=>{
    console.log(`port is running successfully at ${port}`);
})

//install and import path
const path=require("path");
app.use(exp.static(path.join(__dirname,'./dist/ims')));

//install and import
const bodyParser=require('body-parser');
app.use(bodyParser.json());


/* -------------------------------------- batch generating event handlers start here --------------------------------- */

//post batches
app.post('/batches/data',(req,res)=>{
           console.log(req.body);
           dbo.collection("batches").findOne({batchName:req.body.batchName},(err,userObj)=>{
           if(err){
               console.log("err in reading data",err);
           }
           else if(userObj!==null){
               res.json({message:"user already existed"});
           }
           else{
            dbo.collection("batches").insertOne(req.body,(err,result)=>{
                if(err){
                    console.log("err in save data",err);
                }
                else{
                    res.json({message:"record saved successfully"})
                }
                });
            }
        });
});




//this will read data from database and display complete list of batches 
// functionality of this get req handler recevied at batch.ts in ngonit

app.get('/readBatches/database',(req,res)=>{
    dbo.collection('batches').find().toArray((err,dataArray)=>{
        if(err){
            console.log("error in reading data",err);
        }
        else if(dataArray.length==0){
            res.json({message:"collection is empty"});
        }
        else{
            res.json({message:dataArray});
        }
    })
})


//update batch duration with put reqst handler

app.put("/updateDuration/database",(req,res)=>{
    //console.log(req.body);
    dbo.collection("batches").updateOne({batchName:req.body.batchName},{$set:{from:req.body.from,to:req.body.to}},(err,result)=>{
        if(err) throw err;
        else{
            dbo.collection("batches").find().toArray((err,updatedBatchArray)=>{
                if(err) throw err;
                else{
                    res.json({message:updatedBatchArray});
                }
            })
        }
    })
})

//delete batch using delete event reqst handler

app.delete('/removeBatch/database/:batchName',(req,res)=>{
    //console.log(req.params.batchName)
    dbo.collection('batches').deleteOne({batchName:req.params.batchName},(err,result)=>{
        if(err) throw err;
        else{
            dbo.collection("batches").find().toArray((err,remainingBatchesArray)=>{
                if(err) throw err;
                else{
                    res.json({message:remainingBatchesArray});
                }
            })
        }
    })
})


/* -------------------------------------- batch generating event handlers end here --------------------------------- */

















/* -------------------------------------- student registration event handlers ------------------------------------ */

//post req handler for register
app.post('/studpost/ser/database',(req,res)=>{
    console.log(req.body.id);
    dbo.collection("students").findOne({id:req.body.id},(err,id)=>{
        if(err){
            console.log("err in reading data",err);
        }
        else if(id!==null){
            res.json({message:"user already existed"});
        }
        else{
         dbo.collection("students").insertOne(req.body,(err,result)=>{
             if(err){
                 console.log("err in save data",err);
             }
             else{
                //  res.json({message:"record saved successfully"});
                dbo.collection("students").find().toArray((err,studentArray)=>{
                    if(err) throw err;
                    else{
                        res.json({message:studentArray});
                    }
                })
             }
             });
         }
     });
});


//get reqst handler to display student details in tabular from

app.post('/readStudents/database',(req,res)=>{
    dbo.collection('students').find({batchName:req.body.batchName}).toArray((err,studentArray)=>{
        if(err){
            console.log("error in reading data",err);
        }
        // else if(studentArray.length == 0){
        //    alert(["no student data"]);
        // }
        else{
            res.json({message:studentArray});
        }
    })
})



//to delete student details from database using reqst handler

app.delete('/removeStudent/database/:id',(req,res)=>{
    console.log(req.params.id)
    dbo.collection('students').deleteOne({id:req.params.id},(err,result)=>{
        if(err) throw err;
        else{
            dbo.collection("students").find().toArray((err,remainingStudentArray)=>{
                if(err) throw err;
                else{
                    res.json({message:remainingStudentArray});
                }
            })
        }
    })
})


// to update student data by click on update button

app.put('/modifystddata/:estdid/:batch',(req,res)=>{

    console.log(req.params.batch)
    console.log(req.params.estdid)
    console.log(req.body)
    dbo.collection("students").updateOne({id:req.params.estdid},{$set:{fname:req.body.fname,lname:req.body.lname,email:req.body.email,age:req.body.age,number:req.body.number,course:req.body.course,gender:req.body.gender}},(err,result)=>{

        if(err)
        {
            console.log("err during updating student",err)
        }
        else
        {
           // console.log("updated successfully");

           dbo.collection("students").find({batchName:req.params.batch}).toArray((err,updArray)=>{

            if(err)
            {
                console.log("err during finding after update std",err)
            }
            else
            {

                console.log("after updating stdArray is",updArray)
                res.json({message:updArray})
            }
           })

        }
    })
});

/* -------------------------------------- student registration event handlers end here ------------------------------ */





/* -------------------------------------- attendance event handler starts here ------------------------------- */


// to read the data when we click on batch component

app.get('/readbatch',(req,res)=>{

    dbo.collection("batches").find().toArray((err,batchArray)=>{

        if(err)
        {
            console.log("err during finding batches");
        }
        else
        {
            res.json({message:batchArray});
        }
    })
});

// to read all batch data when click on all batches

app.get('/readallbatchesdata',(req,res)=>{

    dbo.collection("students").find().toArray((err,allBatch)=>{

        if(err)
        {
            console.log("err during finding all batches",err)
        }
        else
        {
            //console.log("all batches data at 333 is",allBatch)
            res.json({message:allBatch});
        }
    })
});


// to get the data of particular batch by click on search in stdcomponent

app.get('/stdDetails/:batch',(req,res)=>{

    //console.log("batch name at  297 is",req.params)
    dbo.collection("students").find({batchName:req.params.batch}).toArray((err,attdArray)=>{

        if(err)
        {
            console.log("err during finding students")
        }

        else if(attdArray.length==null)
        {
            console.log("no student existed")
        }
        else
        {
            console.log("std data in batch at 311 is",attdArray);
            res.json({message:attdArray})
        }
    })

});


// to post attendance by click on submit button

app.post('/studentAttd/:batchname/:timestamp',(req,res)=>{


    // console.log("batchname and date is",req.params.batchname,req.params.date)
 
    //console.log("attd data after posting at 345 is",req.body)
 
    dbo.collection("attendanceCollection").findOne({batchname:req.params.batchname,timestamp:req.params.timestamp},(err,result)=>{
 
     if(err) console.log("err during find",err)
     else if(result!==null)
     {
         res.json({message:"attendance already posted"})
     }
     else
     {
        dbo.collection("attendanceCollection").insertOne({attdArray:req.body,batchname:req.params.batchname,timestamp:req.params.timestamp},(err,result)=>{
         
             if(err)
             {
                 console.log("err during poting attendance at 353 is",err)
             }
     
             else
             {
                 res.json({message:"posted successfully"});
             }
        })
     }
 
    })
 
         
 
});



/* -------------------------------------- attendance event handler ends here ------------------------------- */




/* -------------------------------------- view - attendance event handler starts here ------------------------------- */


// to get the attendance of particular batch

app.get('/getAttendance/:batchname/:timestamp',(req,res)=>{

    // console.log(req.params.batchname,req.params)
 
    dbo.collection("attendanceCollection").find({batchname:req.params.batchname,timestamp:req.params.timestamp}).toArray((err,dataArray)=>{
 
         if(err)
         {
             console.log("err during finding batches at 382",err)
         }
         else if(dataArray.length == 0)
         {
             res.json({message:"batch not found on that date"});
             // console.log("batch not found on that date at 386");
         }
         else
         {
             console.log("data from attendance collection at 390",dataArray);
             res.json({message:dataArray})
         }

    })
 
 });


/* -------------------------------------- view - attendance event handler ends here ------------------------------- */


/* -------------------------------------- student module - profile and attendance - event handler starts here ------------------------------- */


// to view std profile after login based on stdid

app.get('/getprofile/:stdid',(req,res)=>{
    
    //console.log(req.params)
 
    dbo.collection("students").findOne({id:req.params.stdid},(err,stdprofileObj)=>{

            if(err)
            {
                console.log("err during finding std profile ")
            }
            else
            {
                res.json({message:stdprofileObj})
                //console.log(stdprofileObj)
            }
        })
    
});


// to get std attendance based on stdid

app.post('/stdattendance',(req,res)=>{

    console.log(req.body)

    dbo.collection("attendanceCollection").find({batchname:req.body.batchname}).toArray((err,attdArray)=>{

        if(err)
        {
            throw err
        }
        else
        {
            // console.log("std array is ",attdArray)
            res.json({message:attdArray});
        }     
    })
});

/* -------------------------------------- student module - profile and attendance - event handler ends here ------------------------------- */






/* -------------------------------------- login - event handler starts here ------------------------------- */

// to check login credentials entered by user

// install and import jsonwebtoken
const jwt=require("jsonwebtoken");

app.post('/login',(req,res) => {

    dbo.collection("students").findOne({id:req.body.username},(err,userObj)=>{

        // console.log(userObj)

             if(err)
             {
                 throw err;
             }

             else if(userObj==null)
             {
                 res.json({message:"enter valid credentials"})

             }
             else 
             {
                res.json({message:"user logged in successfully"})
                //console.log("user token ",signedToken)   
             }
             
     })
    
});


/* -------------------------------------- login - event handler ends here ------------------------------- */




