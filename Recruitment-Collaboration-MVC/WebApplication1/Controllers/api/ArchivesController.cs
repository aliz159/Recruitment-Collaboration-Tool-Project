using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
{
    public class ArchivesController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        [HttpGet]
        public IEnumerable<Job> GetArchivedJobs()
        {
            return m_db.Jobs.Where(job => job.IsActive == false).AsEnumerable();
        }

        [HttpPatch]
        public IEnumerable<Applicant> GetArchivedApplicants()
        {
            return m_db.Applicants.Where(a => a.IsActive == false && a.IsPublished == false).AsEnumerable();
        }
    }
}
