using Recruitment_Collaboration_Tool_MVC.classes;
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
    public class UserController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/User
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return m_db.AllUsers.AsEnumerable();
        }

        [HttpGet]
        // GET /api/User/1
        public IHttpActionResult GetUser(long id)
        {
            User user = m_db.AllUsers.SingleOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // simple validation
        bool validationIsOk(User user)
        {
            return !string.IsNullOrEmpty(user.Name) && !string.IsNullOrEmpty(user.Password) &&
                !string.IsNullOrEmpty(user.UserType) && !string.IsNullOrEmpty(user.Email);
        }

        [HttpPost]
        public HttpResponseMessage CreateUser(User user)
        {
            if (user.Id == 0 || !validationIsOk(user))
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, "user details are invalid");
            }

            IEnumerable<User> usersList = GetUsers();

            Encryption encryption = new Encryption();
            string hashedPassword = encryption.CreatrHash(user.Password);
            user.Password = hashedPassword;
            m_db.AllUsers.Add(user);
            m_db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, user);
        }

        // PUT /api/User
        [HttpPut]
        public IHttpActionResult UpdateUser(User u)
        {
            if (u.Id == 0 || !validationIsOk(u))
            {
                return BadRequest();
            }

            User user = m_db.AllUsers.Find(u.Id);

            if (user == null)
            {
                return NotFound();
            }
            user.Name = u.Name;
            user.Email = u.Email;
            user.UserType = u.UserType;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/User/4 -> delete User with id 4
        [HttpDelete]
        public IHttpActionResult DeleteUser(long id)
        {
            User user = m_db.AllUsers.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            m_db.AllUsers.Remove(user);
            m_db.SaveChanges();

            return Ok(user);
        }


        [HttpPost]
        public HttpResponseMessage UserConfirmation(string email, string password)
        {
            if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(password))
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, "user name or password is invalid");
            }

                User user = m_db.AllUsers.SingleOrDefault(x => x.Email == email);
                Session sessionNew = new Session();

                if (user != null)
                {
                if (user.Password == password) {
                    //Encryption encryption = new Encryption();

                    //if (encryption.ValidatePassword(password, user.Password))
                    //{
                    SessionIDManager manager = new SessionIDManager();
                    string newSessionId = manager.CreateSessionID(HttpContext.Current);

                    string CurrentTime = DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second;
                    string CurrentDate = DateTime.Now.Day + "/" + DateTime.Now.Month + "/" + DateTime.Now.Year;

                    sessionNew.UserId = user.Id;
                    sessionNew.SessionStr = newSessionId;
                    sessionNew.SessionDate = CurrentDate;
                    sessionNew.SessionTime = CurrentTime;

                    m_db.Sessions.Add(sessionNew);
                    m_db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, sessionNew);
                    //}
                }
                }
            return Request.CreateResponse(HttpStatusCode.Forbidden, "user name or password is invalid");
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
