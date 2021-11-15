import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/help.service';
import { HttpClient } from '@angular/common/http';
declare var $;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public hs:HelpService,public hc:HttpClient) { }

  batchName:any;
  studentArray:object[]=[];
  ngOnInit() {
    this.batchName=this.hs.dataBatchName;
    //console.log(this.batchName);
   this.hc.post("/readStudents/database",{batchName:this.batchName} ).subscribe((res)=>{
     this.studentArray = res['message'];
   })

  }

  registration(studObj){
    //this.batchName=this.hs.dataBatchName;
    $("#registration").modal('hide');
    studObj.batchName=this.hs.dataBatchName;
    console.log(studObj);
    this.hc.post('/studpost/ser/database',studObj).subscribe(res=>{
      this.studentArray = res["message"];
    })
  }

  // this method is used when we add new student then it will appear on studentdetails
  regetdata()
  {
    this.hc.post('/studentdata',{batchName:this.batchName}).subscribe(res=>{
      
      this.studentArray = res["message"];
    });
  }


  // to edit the data of particular student by click on edit button

  course:any;
  email:any;
  gender:any;
  number:number;
  fname:string;
  lname:string;
  age: number
  id:any;

  editStd(std)
  {
    console.log("std details before edit",std)
    this.course=std.course
    this.email=std.email
    this.gender=std.gender
    this.number=std.number;
    this.fname=std.fname;
    this.lname=std.lname;
    this.age=std.age;
    this.id=std.id;

  }


//to update student details
  editdetails(editstd)
  {
    $("#editModal").modal("hide");

    console.log("updated std data is",editstd);

    this.hc.put(`/modifystddata/${this.id}/${this.batchName}`,editstd).subscribe(res=>{

      this.studentArray = res["message"];

      console.log("after updating", this.studentArray);
      
    })

  }
  

  //delete student data

  deleteStud(studObj){
    this.hc.delete(`/removeStudent/database/${studObj.id}`).subscribe((res)=>{
      this.studentArray = res["message"];
    })
  }

}
