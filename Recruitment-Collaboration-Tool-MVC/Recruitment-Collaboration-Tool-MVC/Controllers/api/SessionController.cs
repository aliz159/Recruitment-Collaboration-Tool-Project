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
    public class SessionController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/CustomersSessions
        [HttpGet]
        public IEnumerable<Session> GetSessions()
        {
            return m_db.Sessions.AsEnumerable();
        }

        [HttpPatch]
        public bool doesSessionExpired(Session strSession)
        {
            bool isExpired = false;
            Session session = m_db.Sessions.SingleOrDefault(x => x.SessionStr == strSession.SessionStr);

            char[] delimiterChars = { ':', '/' };

            string[] date = session.SessionDate.Split(delimiterChars);
            string[] Time = session.SessionTime.Split(delimiterChars);

            DateTime CurrentTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day,
                DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);

            DateTime sessionTime = new DateTime(Int32.Parse(date[2]), Int32.Parse(date[1]),
                Int32.Parse(date[0]), Int32.Parse(Time[0]), Int32.Parse(Time[1]), Int32.Parse(Time[2]));

            int timeBetween = CurrentTime.Subtract(sessionTime).Minutes;

            if (timeBetween > 20)
            {
                isExpired = true;
            }
            else
            {
                isExpired = false;
            }
            return isExpired;
        }






        [HttpPut]
        public IHttpActionResult DeleteSessions(Session strSession)
        {
            SessionIDManager manager = new SessionIDManager();
            Session session = m_db.Sessions.SingleOrDefault(x => x.SessionStr == strSession.SessionStr);

            bool isExpired = doesSessionExpired(strSession);

            if (isExpired)
            {
                manager.RemoveSessionID(HttpContext.Current);
                m_db.Sessions.Remove(session);
                m_db.SaveChanges();
                return BadRequest("Your session expierd");
            }

            if (manager.Validate(strSession.SessionStr))
            {
                if (session == null)
                {
                    return BadRequest();
                }

                manager.RemoveSessionID(HttpContext.Current);
                m_db.Sessions.Remove(session);
                m_db.SaveChanges();

                //return Ok(session);
                return Ok("session deleted succesfully");
            }
            return BadRequest();

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
