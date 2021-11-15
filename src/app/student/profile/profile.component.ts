import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/help.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public ls: LoginService, public hc:HttpClient,public hs:HelpService ) { }

    stdid:number;
    bname:any;
    studentDetails:any;

  ngOnInit() {
    
        this.stdid=this.ls.fromservice()
        //console.log(this.stdid);
        this.hc.get(`/getprofile/${this.stdid}`).subscribe(res=>{
          
          this.studentDetails=res["message"];

            //console.log(this.studentDetails)
            this.bname = this.studentDetails.batchName
            console.log(this.bname)

            this.hs.fromprofile(this.stdid,this.bname)
           
        })
  }

}
