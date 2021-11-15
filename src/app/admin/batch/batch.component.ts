import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelpService } from 'src/app/help.service';
declare var $;
@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  constructor(public hc:HttpClient,public router:Router,public hs:HelpService) { }
  batchesArray:object[]=[];
  ngOnInit() {
    this.hc.get('/readBatches/database').subscribe(res=>{
      this.batchesArray=res["message"];
    })
  
  }
  
  batchMethod(batchObj){
    $("#batchModal").modal('hide');
    console.log(batchObj);
    this.hc.post('/batches/data',batchObj).subscribe(res=>{
      alert(res["message"]);
    });
  }
 
  //batch button navigates to registration component
  studentCom(batchname){
    console.log(batchname)
    this.hs.recFromBatch(batchname);
    this.router.navigate(['/admindashboard/register']);
  }
  
   /* -------------------------------------------- update batch -------------------------------------------------- */
      //this method occur when we press edit

  batchName:any;
  from:any;
  to:any;

  editBatch(batchobj){
    this.batchName=batchobj.batchName;
    this.from=batchobj.from;
    this.to=batchobj.to;
  }

  //updating here after submiting new data
  updateBatchMethod(newObj){
    $('#updateBatch').modal('hide');
    //console.log("the batch is",this.batchName, "and date ", newObj.from,newObj.to)
    this.hc.put("/updateDuration/database",{batchName:this.batchName,from:newObj.from, to:newObj.to}).subscribe(res=>{
      this.batchesArray=res["message"];
    });
  }

  /* -------------------------------------------- update batch end here -------------------------------------------------- */
  /* --------------------------------------------- delete a batch start here -----------------------------------*/

  delete(batchObj){
    this.hc.delete(`/removeBatch/database/${batchObj.batchName}`).subscribe((res)=>{
      this.batchesArray=res["message"];
    })
  }

  /* --------------------------------------------- delete a batch end here -----------------------------------*/

}

