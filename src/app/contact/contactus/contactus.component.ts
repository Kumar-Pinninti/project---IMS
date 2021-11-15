import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
// this comment is reprents original js code , later converted into ts code which is executed successfully
  // x:any=document.getElementById("sub");
  // y:any=document.getElementById("rep");
  // z:any=document.getElementById("button");
  // rep(xx){
  //   console.log("hi rep")
  //   this.x.style.left ="-400px";
  //   this.y.style.left="50px";
  //   this.z.style.left="110px";
  // }
rep(){
  document.getElementById("sub").style.left = "-400px";
  document.getElementById("rep").style.left = "50px";
  document.getElementById("button").style.left = "110px";
}


  sub(){
  document.getElementById("sub").style.left = "50px";
  document.getElementById("rep").style.left = "450px";
  document.getElementById("button").style.left = "0";
  }

}
