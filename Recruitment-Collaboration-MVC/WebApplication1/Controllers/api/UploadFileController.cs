using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
{
    public class UploadFileController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        [HttpPost]
        public HttpResponseMessage UploadJsonFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    // var filePath = HttpContext.Current.Server.MapPath
                    //("C:\\Users\\user\\Desktop\\rar_Angular\\Yesterday_project_14_9_2017\\final_project_in_angular_8_9_17\\src\\img\\"
                    //+ postedFile.FileName);
                    postedFile.SaveAs("C:\\Recruitment-Collaboration-Tool-Project\\Recruitment-Collaboration-Tool-angular\\src\\cv\\"
                    + postedFile.FileName);
                }
            }
            return response;
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
