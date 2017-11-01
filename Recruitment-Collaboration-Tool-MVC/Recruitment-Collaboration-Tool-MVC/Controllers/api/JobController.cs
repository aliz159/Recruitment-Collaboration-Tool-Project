using Recruitment_Collaboration_Tool_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.SessionState;

namespace Recruitment_Collaboration_Tool_MVC.Controllers.api
{
    public class JobController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/Job
        [HttpGet]
        public IEnumerable<Job> GetSuccessStories()
        {
            return m_db.Jobs.AsEnumerable();
        }

        // /api/Job
        [HttpPatch]
        public IHttpActionResult GetJobs(Session strSession)
        {
            SessionIDManager manager = new SessionIDManager();
            Session session = m_db.Sessions.SingleOrDefault(x => x.SessionStr == strSession.SessionStr);

            SessionController s = new SessionController();
            bool isExpired = s.doesSessionExpired(strSession);

            if (isExpired)
            {
                manager.RemoveSessionID(HttpContext.Current);
                m_db.Sessions.Remove(session);
                m_db.SaveChanges();
                return BadRequest("Your session expired");
            }
            else
            {
                session.SessionTime = DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second;
                return Ok(m_db.Jobs.AsEnumerable());
            }
        }

        [HttpGet]
        // GET /api/Job/1
        public IHttpActionResult GetJob(long id, Session strSession)
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
                && !string.IsNullOrEmpty(job.Skillset) && !string.IsNullOrEmpty(job.Requirements);
            return ValidationIsOk;
        }

        //POST /api/Job
        [HttpPost]
        public IHttpActionResult CreateJob(Job job, Session strSession)
        {
            if (job.UserId == 0 || job.IsActive == true || !validationIsOk(job))
            {
                return BadRequest();
            }
            m_db.Jobs.Add(job);
            m_db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = job.Id }, job);
        }

        // PUT /api/Job
        [HttpPut]
        public IHttpActionResult UpdateJob(Job j)
        {
            if (j.UserId == 0 || j.IsActive == true || !validationIsOk(j))
            {
                return BadRequest();
            }
            Job job = m_db.Jobs.Find(j.Id);

            if (job == null)
            {
                return NotFound();
            }

            job.UserId = j.UserId;
            job.Name = j.Name;
            job.Description = j.Description;
            job.Skillset = j.Skillset;
            job.Requirements = j.Requirements;
            job.IsActive = j.IsActive;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/Job/4 -> delete Job with id 4
        [HttpDelete]
        public IHttpActionResult DeleteJob(long id, Session strSession)
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
