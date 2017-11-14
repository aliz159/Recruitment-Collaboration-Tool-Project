using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class SkillsOfAnApplicant
    {
        public long Id { get; set; } //Primary key
        public long ApplicantId { get; set; } //Foreign key
        public long SkillsetsId { get; set; } //Foreign key
    }
}