using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
{
    public class JobToApplicantController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/JobToApplicant
        [HttpGet]
        public IEnumerable<JobToApplicant> GetJobToApplicants()
        {
            return m_db.JobToApplicant.AsEnumerable();
        }

        [HttpGet]
        public List<Job> GetJobToApplicant(long id)
        {
            var alljobs = m_db.Jobs.ToList();
            var allJToA = m_db.JobToApplicant.ToList();

            foreach (var jToA in allJToA)
            {
                foreach (var job in alljobs)
                {
                    if (job.Id == jToA.JobId && jToA.ApplicantId == id)
                    {
                        job.CurrentMatchPercent = jToA.MatchPercent;
                    }
                }
            }

            var MatchingJob = from JToA in allJToA
                              from job in alljobs
                              where JToA.ApplicantId == id &&
                              JToA.JobId == job.Id &&
                              JToA.MatchPercent > 60
                              select job;
            return MatchingJob.ToList();
        }

        //[HttpGet]
        //// GET /api/JobToApplicant/1
        //public IHttpActionResult GetJobToApplicant(long id)
        //{
        //    JobToApplicant jobToApplicant = m_db.JobToApplicant.SingleOrDefault(j => j.Id == id);

        //    if (jobToApplicant == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(jobToApplicant);
        //}

        // simple validation
        bool validationIsOk(JobToApplicant jobToApplicant)
        {
            return jobToApplicant.JobId == 0 || jobToApplicant.ApplicantId == 0
                || jobToApplicant.UserId == 0;
        }

        // POST /api/JobToApplicant
        [HttpPost]
        public IHttpActionResult CreateJobToApplicant(JobToApplicant jobToApplicant)
        {
            if (validationIsOk(jobToApplicant))
            {
                return BadRequest();
            }
            m_db.JobToApplicant.Add(jobToApplicant);
            m_db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = jobToApplicant.Id }, jobToApplicant);
        }

        // PUT /api/JobToApplicant
        [HttpPut]
        public IHttpActionResult UpdateJobToApplicant(JobToApplicant jToA)
        {
            if (validationIsOk(jToA))
            {
                return BadRequest();
            }

            JobToApplicant jobToApplicant = m_db.JobToApplicant.Find(jToA.Id);

            if (jobToApplicant == null)
            {
                return NotFound();
            }

            jobToApplicant.UserId = jToA.UserId;
            jobToApplicant.JobId = jToA.JobId;
            jobToApplicant.ApplicantId = jToA.ApplicantId;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/JobToApplicant/4 -> delete JobToApplicant with id 4
        [HttpDelete]
        public IHttpActionResult DeleteJobToApplicant(long id)
        {
            JobToApplicant jobToApplicant = m_db.JobToApplicant.Find(id);
            if (jobToApplicant == null)
            {
                return NotFound();
            }

            m_db.JobToApplicant.Remove(jobToApplicant);
            m_db.SaveChanges();

            return Ok(jobToApplicant);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                m_db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
