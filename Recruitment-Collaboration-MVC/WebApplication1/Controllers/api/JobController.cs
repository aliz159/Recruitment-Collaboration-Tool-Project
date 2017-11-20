using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
{
    public class JobController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/Job
        [HttpGet]
        public IEnumerable<Job> GetJobs()
        {
            return m_db.Jobs.Where(a => a.IsActive == true).AsEnumerable();
        }

        //[HttpGet]
        //public IEnumerable<Job> GetJobsInArchives()
        //{
        //    return m_db.Applicants.Where(a => a.IsActive == false).AsEnumerable();
        //}


        // /api/Job
        [HttpGet]
        public IHttpActionResult GetJob(long id)
        {
            Job job = m_db.Jobs.SingleOrDefault(j => j.Id == id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        // simple validation
        bool validationIsOk(Job job)
        {
            var ValidationIsOk = !string.IsNullOrEmpty(job.Name) && !string.IsNullOrEmpty(job.Description)
                && !string.IsNullOrEmpty(job.Requirements) && !string.IsNullOrEmpty(job.strUniqueID)
                && !string.IsNullOrEmpty(job.Position);
            return ValidationIsOk;
        }

        //POST /api/Job
        [HttpPost]
        public IHttpActionResult CreateJob(Job job)
        {
            if (job.UserId == 0 || job.YearOfExperience < 0 || !validationIsOk(job))
            {
                return BadRequest();
            }
            job.IsActive = true;
            m_db.Jobs.Add(job);
            m_db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = job.Id }, job);
        }

        // PUT /api/Job
        [HttpPut]
        public IHttpActionResult UpdateJob(Job j)
        {
            if (j.UserId == 0 || !validationIsOk(j) || j.YearOfExperience < 0)
            {
                return BadRequest();
            }
            Job job = m_db.Jobs.Find(j.Id);

            if (job == null)
            {
                return NotFound();
            }

            job.Name = j.Name;
            job.Position = j.Position;
            job.strUniqueID = j.strUniqueID;
            job.UserId = j.UserId;
            job.IsActive = false;
            job.Description = j.Description;
            job.Requirements = j.Requirements;
            job.YearOfExperience = j.YearOfExperience;
            m_db.SaveChanges();
            return Ok(HttpStatusCode.NoContent);
        }

        // DELETE /api/Job/4 -> delete Job with id 4
        [HttpDelete]
        public IHttpActionResult DeleteJob(long id)
        {
            Job job = m_db.Jobs.Find(id);
            if (job == null)
            {
                return NotFound();
            }
            m_db.Jobs.Remove(job);
            m_db.SaveChanges();
            return Ok(job);
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
