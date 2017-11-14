using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Classes;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
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
            if (!validationIsOk(user))
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
