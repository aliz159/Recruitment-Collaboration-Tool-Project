using Recruitment_Collaboration_Tool_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Recruitment_Collaboration_Tool_MVC.Controllers.api
{
    public class SkillsOfAnApplicantController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/SkillsOfAnApplicant
        [HttpGet]
        public IEnumerable<SkillsOfAnApplicant> GetSkills()
        {
            return m_db.SkillsOfAnApplicant.AsEnumerable();
        }

        [HttpGet]
        // GET /api/SkillsOfAnApplicant/1
        public IHttpActionResult GetSkill(long id)
        {
            SkillsOfAnApplicant skill = m_db.SkillsOfAnApplicant.SingleOrDefault(skills => skills.Id == id);

            if (skill == null)
            {
                return NotFound();
            }

            return Ok(skill);
        }

        // simple validation
        bool validationIsOk(SkillsOfAnApplicant Skill)
        {
            return Skill.SkillsetsId != 0 && Skill.ApplicantId != 0;
        }

        // POST /api/SkillsOfAnApplicant
        [HttpPost]
        public IHttpActionResult CreateSkillsOfAnApplicant(SkillsOfAnApplicant skill)
        {
            if (!validationIsOk(skill))
            {
                return BadRequest();
            }
            m_db.SkillsOfAnApplicant.Add(skill);
            m_db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = skill.Id }, skill);
        }

        // PUT /api/SkillsOfAnApplicant
        [HttpPut]
        public IHttpActionResult UpdateSkillsOfAnApplicant(SkillsOfAnApplicant sk)
        {
            if (!validationIsOk(sk))
            {
                return BadRequest();
            }

            SkillsOfAnApplicant skill = m_db.SkillsOfAnApplicant.Find(sk.Id);

            if (skill == null)
            {
                return NotFound();
            }

            skill.ApplicantId = sk.ApplicantId;
            skill.SkillsetsId = sk.SkillsetsId;
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/SkillsOfAnApplicant/4 -> delete SkillsOfAnApplicant with id 4
        [HttpDelete]
        public IHttpActionResult DeleteSkillsOfAnApplicant(long id)
        {
            SkillsOfAnApplicant skill = m_db.SkillsOfAnApplicant.Find(id);
            if (skill == null)
            {
                return NotFound();
            }

            m_db.SkillsOfAnApplicant.Remove(skill);
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
