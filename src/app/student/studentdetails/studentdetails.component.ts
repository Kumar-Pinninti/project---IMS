import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/help.service';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnInit {

  stddata:any;

  stdArray:any;

  resultArray:string[]=[];

  presentCount:number=0;

  absentCount:number=0;

  total:number;

  presentPercent:number;

  absentPercent:number;
  
  constructor( public hc:HttpClient, public at:HelpService) { }

  ngOnInit() {
    // this.stdid=this.ls.fromservice()
    // console.log(this.stdid);


    this.stddata=this.at.tostdatt();

    console.log("stddata is",this.stddata);

    this.hc.post(`/stdattendance`,this.stddata).subscribe(res=>{

              this.stdArray=res["message"]
              console.log(this.stdArray)


            // segregate the data from the array of objects

            this.stdArray.forEach(obj => { 

              //console.log(obj)
              console.log(obj.batchname);
              console.log(obj.attdArray);

              obj.attdArray.forEach(std1 => {  
     
                console.log(std1)
                console.log(std1.stdid);

                if(std1.stdid==this.stddata.stdid)
                {
                    console.log(std1.attendance)
                    this.resultArray.push(std1.attendance)

                    console.log(this.resultArray);
                    console.log(this.resultArray.length)
                }
                
               })
              
            })

            for(let atd in this.resultArray)
            {
                console.log(this.resultArray[atd]);
      
              if(this.resultArray[atd]=="present")
              {
                this.presentCount=this.presentCount+1;
              }
      
              else
              {
                this.absentCount=this.absentCount+1;
              }
            }
      this.total=this.presentCount+this.absentCount;
              //console.log(this.presentCount);
              //console.log(this.absentCount);
              console.log(this.total)
              this.presentPercent=(this.presentCount/this.total)*100;
              this.absentPercent=(this.absentCount/this.total)*100;
              console.log(this.presentPercent);
              console.log(this.absentPercent);
      });
      
      
      
  }

}
