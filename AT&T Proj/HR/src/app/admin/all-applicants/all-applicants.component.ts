import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-all-applicants',
  templateUrl: './all-applicants.component.html',
  styleUrls: ['./all-applicants.component.css']
})
export class AllApplicantsComponent implements OnInit {
  allApplicant: any;

  constructor(public applicantService: ApplicantService,
  private router:Router) {
   // this.getAllApplicants();
  }

  ngOnInit() {
 this.applicantService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.allApplicant = rsp.json();
        console.log("all the applicants:");
        console.log(this.allApplicant);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  getAllApplicants() {
   
  }




SeeApplicant(applicant:any){
  console.log("=>>>>>>");console.log(applicant);
  this.router.navigate(['/Applicant',applicant.Id]);
}
lockApplicant(){
  window.alert("lock Applicant");
}
  // allAplicant=[
  //       {Id:2,Name:"Yaffa Belete",Title:"Web Developer"},
  //       {Id:1,Name:"Aliza Zeru",Title:"Web Developer"},
  //       {Id:4,Name:"Josef Mahary",Title:"Web Developer"},
  //       {Id:3,Name:"Ronit Motza",Title:"Web Developer"}
  // ];



  
}
