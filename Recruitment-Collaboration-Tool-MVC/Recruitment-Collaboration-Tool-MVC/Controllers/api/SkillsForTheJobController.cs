using Recruitment_Collaboration_Tool_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Recruitment_Collaboration_Tool_MVC.Controllers.api
{
    public class SkillsForTheJobController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/SkillsForTheJob
        [HttpGet]
        public IEnumerable<SkillsForTheJob> GetSkills()
        {
            return m_db.SkillsForTheJob.AsEnumerable();
        }

        [HttpGet]
        // GET /api/SkillsForTheJob/1
        public IHttpActionResult GetSkill(long id)
        {
            SkillsForTheJob skills = m_db.SkillsForTheJob.SingleOrDefault(skill => skill.Id == id);

            if (skills == null)
            {
                return NotFound();
            }

            return Ok(skills);
        }

        // simple validation
        bool validationIsOk(SkillsForTheJob Skill)
        {
            return Skill.SkillsetsId != 0 && Skill.JobId != 0;
        }

        // POST /api/SkillsForTheJob
        [HttpPost]
        public IHttpActionResult CreateSkillsForTheJob(SkillsForTheJob skill)
        {
            if (!validationIsOk(skill))
            {
                return BadRequest();
            }
            m_db.SkillsForTheJob.Add(skill);
            m_db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = skill.Id }, skill);
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
