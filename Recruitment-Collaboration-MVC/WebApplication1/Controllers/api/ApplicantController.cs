using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
{
    public class ApplicantController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/Applicant
        [HttpGet]
        public IEnumerable<Applicant> GetContacts()
        {
            return m_db.Applicants.AsEnumerable();
        }

        [HttpGet]
        // GET /api/Applicant/1
        public IHttpActionResult GetApplicant(long id)
        {
            Applicant applicant = m_db.Applicants.SingleOrDefault(a => a.Id == id);

            if (applicant == null)
            {
                return NotFound();
            }

            return Ok(applicant);
        }

        // simple validation
        bool validationIsOk(Applicant applicant)
        {
            return !string.IsNullOrEmpty(applicant.Name) && !string.IsNullOrEmpty(applicant.Title) &&
                 !string.IsNullOrEmpty(applicant.Cv) && !string.IsNullOrEmpty(applicant.Position) &&
                 !string.IsNullOrEmpty(applicant.Phone);
        }

        // POST /api/Applicant
        [HttpPost]
        public IHttpActionResult CreateApplicant(Applicant applicant)
        {
            if (!validationIsOk(applicant) || applicant.YearOfExperience < 0)
            {
                return BadRequest();
            }
            applicant.IsPublished = false;
            applicant.IsLocked = false;
            applicant.IsActive = true;
            applicant.UserIdLockedBy = -1;
            applicant.InterviewDate = null;
            applicant.StatusAfterInterview = null;
            m_db.Applicants.Add(applicant);
            m_db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = applicant.Id }, applicant);
        }

        // PUT /api/Applicant
        [HttpPut]
        public IHttpActionResult UpdateApplicant(Applicant a)
        {
            if (!validationIsOk(a) || a.YearOfExperience < 0)
            {
                return BadRequest();
            }

            Applicant applicant = m_db.Applicants.Find(a.Id);

            if (applicant == null)
            {
                return NotFound();
            }

            applicant.Name = a.Name;
            applicant.Title = a.Title;
            applicant.Position = a.Position;
            applicant.Phone = a.Phone;
            applicant.YearOfExperience = a.YearOfExperience;
            applicant.Cv = a.Cv;
            applicant.IsLocked = a.IsLocked;
            applicant.UserIdLockedBy = a.UserIdLockedBy;
            applicant.IsPublished = a.IsPublished;
            applicant.IsActive = a.IsActive;
            applicant.InterviewDate = a.InterviewDate;
            applicant.StatusAfterInterview = a.StatusAfterInterview;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/Applicant/4 -> delete Applicant with id 4
        [HttpDelete]
        public IHttpActionResult DeleteApplicant(long id)
        {
            Applicant applicant = m_db.Applicants.Find(id);
            if (applicant == null)
            {
                return NotFound();
            }

            m_db.Applicants.Remove(applicant);
            m_db.SaveChanges();

            return Ok(applicant);
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
