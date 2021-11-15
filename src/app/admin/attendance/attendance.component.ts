import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(public hc:HttpClient) { }

  stdbatchdData:any;

  stdDataInBatch:any;

  today=new Date();
 // timestamp=this.today.getTime();




  ngOnInit() {

    this.hc.get('/readbatch').subscribe(res =>{
      this.stdbatchdData = res["message"]
      //console.log("batch data in attendance comp at 19 is",this.stdbatchdData)
    });

  }


// by click on search this method will execute

sendbatch(bname)
{
    //console.log(bname);

    if(bname.batches=="ALL")
    {
        this.hc.get('/readallbatchesdata').subscribe(res=>{

          this.stdDataInBatch = res["message"];

          console.log(this.stdDataInBatch);
        });
    }
    else
    {
      this.hc.get(`/stdDetails/${bname.batches}`).subscribe(res=>{

        this.stdDataInBatch = res["message"]

        console.log(this.stdDataInBatch);

      })
    }
}

// data after posting attendance
// sendattd(attdobj)
// {
//   console.log(attdobj);
//   //console.log(data);
// }



// to add attendance property to each student  after posting attendance

attendanceArray:object[]=[];
// to get the batch name and time stamp


date=new Date();

timestamp:number;

batchname:any;


attendance(val,sobj)
{
  //alert(val);

  //console.log(val);

 // console.log(sobj)

//this will add attendance property
  sobj.attendance=val;
  
  let pickerDate=new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate(),0o0, 0o0, 0o0).getTime();
  sobj.timestamp=pickerDate;
   
  this.timestamp=pickerDate

  //alert(this.timestamp)

 this.batchname=sobj.batchno

 //alert(this.batchname);

  //console.log(sobj);

  if(this.attendanceArray.length==0)
  {
    this.attendanceArray.push(sobj)
    console.log("array length zero then",this.attendanceArray)
  }

  else
  {
        for(var  obj in this.attendanceArray)
      {
                    //console.log(obj)
            var  stdobj=this.attendanceArray[obj]

                  //console.log(stdarray);
                    // console.log(sobj.stdid)
                        //console.log(stdarray["stdid"])
      }
      
   if(sobj.stdid!==stdobj["stdid"])
   {
        this.attendanceArray.push(sobj);
        console.log("if id is not found then add",this.attendanceArray)
   }
   else
   {
     this.attendanceArray.splice(+obj,1,sobj);
     console.log("after splice",this.attendanceArray);
   }

  }
}



//method for  remove duplicates from attendanceArray
removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}


//new modified attendanceArray
newAttenArr: any;

alertboolean:boolean=false;

//sending attendancedata to database by click on submit button
stdAttendance()
{

  this.newAttenArr = this.removeDuplicates(this.attendanceArray, 'stdid');
  // console.log("before removing duplicates", this.attendanceArray)
  // console.log("after removing duplicates", this.attend)
    // console.log(attenObj)
    console.log("after removing duplicates",this.newAttenArr);

    this.hc.post(`/studentAttd/${this.batchname}/${this.timestamp}`, this.newAttenArr).subscribe(res => {

      console.log(res["message"]);
     if(res["message"]=="attendance already posted")
     {
        this.alertboolean=true;
     }
     else
     {
      this.attendanceArray.length=0
      // this.newAttenArr.splice(0,this.newAttenArr.length);
       console.log("after deleting data at attendanceArray",this.attendanceArray);
     }
      

    });
  
   
}




}