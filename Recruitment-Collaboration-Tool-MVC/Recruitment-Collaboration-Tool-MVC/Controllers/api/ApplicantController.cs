using Recruitment_Collaboration_Tool_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Recruitment_Collaboration_Tool_MVC.Controllers.api
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
            Applicant applicant = m_db.Applicants.SingleOrDefault(a=> a.Id == id);

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
                !string.IsNullOrEmpty(applicant.Skillset) && !string.IsNullOrEmpty(applicant.Cv);
        }

        // POST /api/Applicant
        [HttpPost]
        public IHttpActionResult CreateApplicant(Applicant applicant)
        {
            if (!validationIsOk(applicant))
            {
                return BadRequest();
            }
            applicant.IsActive = true;
            m_db.Applicants.Add(applicant);
            m_db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = applicant.Id }, applicant);
        }

        // PUT /api/Applicant
        [HttpPut]
        public IHttpActionResult UpdateApplicant(Applicant a)
        {
            if (!validationIsOk(a))
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
            applicant.Skillset = a.Skillset;
            applicant.Cv = a.Cv;
            applicant.IsLocked = a.IsLocked;
            applicant.UserIdLockedBy = a.UserIdLockedBy;
            applicant.IsPublished = a.IsPublished;
            applicant.IsActive = a.IsActive;

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
