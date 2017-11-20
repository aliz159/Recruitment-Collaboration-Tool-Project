using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
{
    public class JobSkillsController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/SkillsForTheJob
        [HttpGet]
        public IEnumerable<SkillsForTheJob> GetSkills()
        {
            return m_db.SkillsForTheJob.AsEnumerable();
        }


        [HttpGet]
        public IEnumerable<Skillset> GetJobSkills(long id)
        {
            var appSkillsList = from jobSkill in m_db.SkillsForTheJob
                                from skill in m_db.Skillset
                                where jobSkill.JobId == id && jobSkill.SkillsetsId == skill.Id
                                select skill;
            return appSkillsList.AsQueryable();
        }

        // simple validation
        bool validationIsOk(SkillsForTheJob Skill)
        {
            return Skill.SkillsetsId != 0 && Skill.JobId != 0;
        }


        // POST /api/SkillsForTheJob
        [HttpPost]
        public HttpResponseMessage CreateSkillsForTheJob(AllSkills allskills)
        {
            if (allskills.Id <= 0 && allskills.Skills == null)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, "Job Id Or Skills are invalid");
            }

            SkillsForTheJob skill = new SkillsForTheJob();

            foreach (var skillId in allskills.Skills)
            {
                skill.SkillsetsId = skillId;
                skill.JobId = allskills.Id;

                m_db.SkillsForTheJob.Add(skill);
                m_db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.OK, "Job skills added successfully");           
        }


        // PUT /api/SkillsForTheJob
        [HttpPut]
        public IHttpActionResult UpdateSkillsForTheJob(SkillsForTheJob sk)
        {
            if (!validationIsOk(sk))
            {
                return BadRequest();
            }

            SkillsForTheJob skill = m_db.SkillsForTheJob.Find(sk.Id);

            if (skill == null)
            {
                return NotFound();
            }

            skill.JobId = sk.JobId;
            skill.SkillsetsId = sk.SkillsetsId;
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/SkillsForTheJob/4 -> delete SkillsForTheJob with id 4
        [HttpDelete]
        public IHttpActionResult DeleteSkillsForTheJob(long id)
        {
            SkillsForTheJob skill = m_db.SkillsForTheJob.Find(id);
            if (skill == null)
            {
                return NotFound();
            }

            m_db.SkillsForTheJob.Remove(skill);
            m_db.SaveChanges();

            return Ok(skill);
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
