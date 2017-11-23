using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers.api
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
        public IEnumerable<Skillset> GetApplicantSkills(long id)
        {
            var appSkillsList = from appSkill in m_db.SkillsOfAnApplicant
                                from skill in m_db.Skillset
                                where appSkill.ApplicantId == id && appSkill.SkillsetsId == skill.Id
                                select skill;
            return appSkillsList.AsQueryable();
        }

        // simple validation
        bool validationIsOk(SkillsOfAnApplicant Skill)
        {
            return Skill.SkillsetsId != 0 && Skill.ApplicantId != 0;
        }


        [HttpPost]
        public HttpResponseMessage CreateSkillsOfAnApplicant(AllSkills allskills)
        {
            if (allskills.Id <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            SkillsOfAnApplicant skill = new SkillsOfAnApplicant();

            foreach (var skillId in allskills.Skills)
            {
                skill.SkillsetsId = skillId;
                skill.ApplicantId = allskills.Id;

                m_db.SkillsOfAnApplicant.Add(skill);
                m_db.SaveChanges();
            }

            float counter = 0;
            float MatchPassingScore = 0;
            IEnumerable<SkillsForTheJob> OneJobSkillset;
            var appSkills = m_db.SkillsOfAnApplicant.Where(a => a.ApplicantId == allskills.Id).ToList();
            var jobs = (from job in m_db.SkillsForTheJob select job.JobId).Distinct().ToList();
            JobToApplicant jobToApplicantObj = new JobToApplicant();

            foreach (var job in jobs)
            {
                OneJobSkillset = m_db.SkillsForTheJob.Where(J => J.JobId == job).ToList();
                MatchPassingScore = (OneJobSkillset.Count() * 60) / 100;

                foreach (var jobSkill in OneJobSkillset)
                {
                    foreach (var appSkill in appSkills)
                    {
                        if (jobSkill.SkillsetsId == appSkill.SkillsetsId)
                        {
                            counter++;
                        }
                    }
                }

                counter = (counter * 100) / OneJobSkillset.Count();

                Job Job = m_db.Jobs.SingleOrDefault(j => j.Id == job);
                User user = m_db.AllUsers.SingleOrDefault(u => u.Id == Job.UserId);

                jobToApplicantObj.UserId = user.Id;
                jobToApplicantObj.JobId = job;
                jobToApplicantObj.ApplicantId = allskills.Id;
                jobToApplicantObj.MatchPercent = counter;
                m_db.JobToApplicant.Add(jobToApplicantObj);
                m_db.SaveChanges();
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Applicant skills added successfully");
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
