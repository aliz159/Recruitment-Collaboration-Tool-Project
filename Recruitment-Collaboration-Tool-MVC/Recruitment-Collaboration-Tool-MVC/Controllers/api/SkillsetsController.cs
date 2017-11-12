using Recruitment_Collaboration_Tool_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Recruitment_Collaboration_Tool_MVC.Controllers.api
{
    public class SkillsetsController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/Skillsets
        [HttpGet]
        public IEnumerable<Skillsets> GetSkillsets()
        {
            return m_db.Skillset.AsEnumerable();
        }

        [HttpGet]
        // GET /api/Skillsets/1
        public IHttpActionResult GetSkillset(long id)
        {
            Skillsets Skillset = m_db.Skillset.SingleOrDefault(skill => skill.Id == id);

            if (Skillset == null)
            {
                return NotFound();
            }

            return Ok(Skillset);
        }

        // simple validation
        bool validationIsOk(Skillsets Skill)
        {
            return !string.IsNullOrEmpty(Skill.skill);
        }

        // POST /api/Skillsets
        [HttpPost]
        public IHttpActionResult CreateSkillset(Skillsets skill)
        {
            if (!validationIsOk(skill))
            {
                return BadRequest();
            }
            m_db.Skillset.Add(skill);
            m_db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = skill.Id }, skill);
        }

        // PUT /api/JobToApplicant
        [HttpPut]
        public IHttpActionResult UpdateSkillset(Skillsets sk)
        {
            if (!validationIsOk(sk))
            {
                return BadRequest();
            }

            Skillsets skill = m_db.Skillset.Find(sk.Id);

            if (skill == null)
            {
                return NotFound();
            }

            skill.skill = sk.skill;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/Skillsets/4 -> delete Skillsets with id 4
        [HttpDelete]
        public IHttpActionResult DeleteSkillset(long id)
        {
            Skillsets skill = m_db.Skillset.Find(id);
            if (skill == null)
            {
                return NotFound();
            }

            m_db.Skillset.Remove(skill);
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
