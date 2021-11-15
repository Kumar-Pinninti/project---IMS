import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor() { }

  //recieved batchname prop from batch comp ts
  dataBatchName:any;
  recFromBatch(batchnameprop){
    //console.log("batchnameprop is",batchnameprop);
    this.dataBatchName=batchnameprop;
  }

  //this method to send other comp whch use this service
  //used in studentcomp.ts

  toRegCom(){
    return this.recFromBatch(this.dataBatchName);
  }



  // student profile and attendance

  dataobj:object;

  fromprofile(id,bname)
  {
      console.log(id,bname);
      
       this.dataobj = {id:id,batchName:bname}
       //console.log(this.dataobj);
      
  }

  tostdatt()
  {
    return this.dataobj;
  }


}
