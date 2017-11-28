import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class PipePipe implements PipeTransform {

  transform(allApplicant: any, search: any): any {
    if(search=== undefined) return allApplicant;
   
return allApplicant.filter( function(applicant) {
      return applicant.Name.toLowerCase().includes(search.toLowerCase());
    })
   }

 transforms(allJobs: any, searchjob: any): any {
    if(searchjob=== undefined) return allJobs;
   
return allJobs.filter( function(job) {
      return job.Name.toLowerCase().includes(searchjob.toLowerCase());
    })
   }
}
