//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
// import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
//Components
import { AppComponent } from './app.component';
import { LockComponent } from './lock/lock.component';
//Jobs
import { JobComponent } from './admin/jobs/jobs.component';
import { AllJobsComponent } from './admin/all-jobs/all-jobs.component';
import { AddJobComponent } from './admin/add-job/add-job.component';
import { EditJobComponent } from './admin/edit-job/edit-job.component';
//Applicants
import { ApplicantComponent } from './admin/applicant/applicant.component';
import { AllApplicantsComponent } from './admin/all-applicants/all-applicants.component';
import { AddApplicantComponent } from './admin/add-applicant/add-applicant.component';
import { EditApplicantComponent } from './admin/edit-applicant/edit-applicant.component';
import { MyApplicantsComponent } from "./Recruiter/my-applicants/my-applicants.component";
//Services
import { ApplicantService } from "./services/ApplicantService/applicant.service";
import { InterviewSummaryService } from "./services/InterviewSummaryService/interview-summary.service";
import { JobService } from "./services/JobService/job.service";
import { JobToApplicantService } from "./services/JobToApplicantService/job-to-applicant.service";
import { UserService } from "./services/UsersService/user.service";
import { NavbarService } from "./services/navBarService/navbar.service";
import { CookiesService } from "./services/CookiesService/cookies.service";

const appRoutes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'Home' },
  { path: 'Lock', component: LockComponent },
  { path: 'b', component: AppComponent },
  { path: 'Job/:id', component: JobComponent },
  { path: 'Job/:id/:RecruitmentId', component: JobComponent },
  { path: 'Applicant/:id', component: ApplicantComponent },
  { path: 'Applicant/:id/:RecruitmentId', component: ApplicantComponent },
  { path: 'AllJobs', component: AllJobsComponent },
  { path: 'AllApplicants', component: AllApplicantsComponent },
  { path: 'AddJob', component: AddJobComponent },
  { path: 'AddApplicant', component: AddApplicantComponent },
  { path: 'EditJob/:id', component: EditJobComponent },
  { path: 'EditApplicant/:id', component: EditApplicantComponent },
  { path: 'MyApplicants/:id', component: MyApplicantsComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    LockComponent,
    JobComponent,
    ApplicantComponent,
    AllJobsComponent,
    EditJobComponent,
    AddJobComponent,
    AddApplicantComponent,
    AllApplicantsComponent,
    EditApplicantComponent,
    MyApplicantsComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),
    FormsModule, HttpModule, 
    /*Ng2FilterPipeModule*/
  ],
  providers: [
    ApplicantService,
    InterviewSummaryService,
    JobService,
    JobToApplicantService,
    UserService,
    NavbarService,
    CookiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
