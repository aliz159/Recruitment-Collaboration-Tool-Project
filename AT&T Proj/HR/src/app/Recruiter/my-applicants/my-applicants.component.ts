import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-my-applicants',
  templateUrl: './my-applicants.component.html',
  styleUrls: ['./my-applicants.component.css']
})
export class MyApplicantsComponent implements OnInit {
applicants:any; 

  constructor(private router: ActivatedRoute) {
        this.applicants = this.router.snapshot.paramMap.get("recruiterApplicants"); 
   }

  ngOnInit() {
  }

}
