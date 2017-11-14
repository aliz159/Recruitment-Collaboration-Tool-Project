using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
{
    public class UserValidationController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        [HttpPost]
        public HttpResponseMessage UserConfirmation(string email, string password)
        {
            if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(password))
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, "user name or password is invalid");
            }

            User user = m_db.AllUsers.SingleOrDefault(x => x.Email == email);

            if (user != null)
            {
                if (user.Password == password)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, user);
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
