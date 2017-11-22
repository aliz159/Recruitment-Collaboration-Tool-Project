using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
{
    public class InterviewSummaryController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/InterviewSummary
        [HttpGet]
        public IEnumerable<InterviewSummary> GetInterviewSummaries()
        {
            return m_db.SummaryOfInterview.AsEnumerable();
        }

        // /api/InterviewSummary
        [HttpGet]
        public IEnumerable<InterviewSummary> GetApplicantInterviewSummaries(long id)
        {
            return m_db.SummaryOfInterview.Where(s => s.ApplicantId == id).AsEnumerable();
        }

        [HttpGet]
        // GET /api/InterviewSummary/1
        //public IHttpActionResult GetInterviewSummary(long id)
        //{
        //    InterviewSummary summary = m_db.SummaryOfInterview.SingleOrDefault(s => s.Id == id);

        //    if (summary == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(summary);
        //}

        // simple validation
        bool validationIsOk(InterviewSummary summary)
        {
            return !string.IsNullOrEmpty(summary.Summary) && !string.IsNullOrEmpty(summary.RecruiterName);
        }

        // POST /api/InterviewSummary
        [HttpPost]
        public IHttpActionResult CreateInterviewSummary(InterviewSummary summary)
        {
            if (!validationIsOk(summary) || summary.ApplicantId == 0 || summary.UserId == 0)
            {
                return BadRequest();
            }

            string CurrentDate = DateTime.Now.Day + "/" + DateTime.Now.Month + "/" + DateTime.Now.Year;
            summary.Date = CurrentDate;
            m_db.SummaryOfInterview.Add(summary);
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

            InterviewSummary summary = m_db.SummaryOfInterview.Find(s.Id);

            if (summary == null)
            {
                return NotFound();
            }

            string CurrentDate = DateTime.Now.Day + "/" + DateTime.Now.Month + "/" + DateTime.Now.Year;
            summary.Date = CurrentDate;
            summary.RecruiterName = s.RecruiterName;
            summary.UserId = s.UserId;
            summary.ApplicantId = s.ApplicantId;
            summary.Summary = s.Summary;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/InterviewSummary/4 -> delete InterviewSummary with id 4
        [HttpDelete]
        public IHttpActionResult DeleteInterviewSummary(long id)
        {
            InterviewSummary summary = m_db.SummaryOfInterview.Find(id);
            if (summary == null)
            {
                return NotFound();
            }

            m_db.SummaryOfInterview.Remove(summary);
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
