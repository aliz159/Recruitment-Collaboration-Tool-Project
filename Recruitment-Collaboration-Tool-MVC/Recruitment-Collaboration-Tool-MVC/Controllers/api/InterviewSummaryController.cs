using Recruitment_Collaboration_Tool_MVC.Models;
using System.Web.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace Recruitment_Collaboration_Tool_MVC.Controllers.api
{
    public class InterviewSummaryController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/InterviewSummary
        [HttpGet]
        public IEnumerable<InterviewSummary> GetInterviewSummaries()
        {
            return m_db.SummaryOfInterviews.AsEnumerable();
        }

        [HttpGet]
        // GET /api/InterviewSummary/1
        public IHttpActionResult GetInterviewSummary(long id)
        {
            InterviewSummary summary = m_db.SummaryOfInterviews.SingleOrDefault(s => s.Id == id);

            if (summary == null)
            {
                return NotFound();
            }

            return Ok(summary);
        }

        // simple validation
        bool validationIsOk(InterviewSummary summary)
        {
            return !string.IsNullOrEmpty(summary.Summary);
        }

        // POST /api/InterviewSummary
        [HttpPost]
        public IHttpActionResult CreateInterviewSummary(InterviewSummary summary)
        {
            if (!validationIsOk(summary) || summary.ApplicantId == 0 || summary.UserId == 0 || summary.Date == null)
            {
                return BadRequest();
            }
            m_db.SummaryOfInterviews.Add(summary);
            m_db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = summary.Id }, summary);
        }

        // PUT /api/InterviewSummary
        [HttpPut]
        public IHttpActionResult UpdateInterviewSummary(InterviewSummary s)
        {
            if (!validationIsOk(s) || s.ApplicantId == 0 || s.UserId == 0 || s.Date == null)
            {
                return BadRequest();
            }

            InterviewSummary summary = m_db.SummaryOfInterviews.Find(s.Id);

            if (summary == null)
            {
                return NotFound();
            }

            summary.UserId = s.UserId;
            summary.ApplicantId = s.ApplicantId;
            summary.Summary = s.Summary;
            summary.Date = s.Date;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/InterviewSummary/4 -> delete InterviewSummary with id 4
        [HttpDelete]
        public IHttpActionResult DeleteInterviewSummary(long id)
        {
            InterviewSummary summary = m_db.SummaryOfInterviews.Find(id);
            if (summary == null)
            {
                return NotFound();
            }

            m_db.SummaryOfInterviews.Remove(summary);
            m_db.SaveChanges();

            return Ok(summary);
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
