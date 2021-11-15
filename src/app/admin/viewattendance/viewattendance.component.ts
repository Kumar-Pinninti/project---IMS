import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewattendance',
  templateUrl: './viewattendance.component.html',
  styleUrls: ['./viewattendance.component.css']
})
export class ViewattendanceComponent implements OnInit {

  constructor(public hc:HttpClient) { }

  stdDataInBatch:object[]=[];

  stdbatchdData:any;

  ngOnInit() 
  {

    this.hc.get('/readbatch').subscribe(res =>{
      this.stdbatchdData=res["message"]
      //console.log("batch data in attendance comp at 19 is",this.stdbatchdData)
    });
  }

  searchbatch(bname)
  {
      console.log("batch name at vieew attendance is",bname);

      if(bname.batches=="ALL")
      {
          this.hc.get('/readallbatchesdata').subscribe(res=>{

            this.stdDataInBatch=res["message"]

          });
      }
      else
      {
        this.stdDataInBatch.length=0;

        let checkdate = new Date(bname.date);

       // alert(checkdate)

        let pickerDate=new Date(checkdate.getFullYear(),checkdate.getMonth(),checkdate.getDate(),0o0, 0o0, 0o0).getTime();

       // alert(pickerDate)

        this.hc.get(`/getAttendance/${bname.batches}/${pickerDate}`).subscribe(res=>{

          if(res["message"]=="batch not found on that date")
          {
            alert("batch not found on that date")
           // console.log("batch not found on that date");
          }
          else
          {
          res["message"].forEach(obj => {

            //console.log(obj.attdArray);
            for(let x in obj.attdArray)
            {
              this.stdDataInBatch.push(obj.attdArray[x])
            }
            
            console.log(this.stdDataInBatch)
          });

          }
          
        });

      }
  }

}
