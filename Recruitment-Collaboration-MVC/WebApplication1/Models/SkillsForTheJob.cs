using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class SkillsForTheJob
    {
        public long Id { get; set; } //Primary key
        public long JobId { get; set; } //Foreign key
        public long SkillsetsId { get; set; } //Foreign key
    }
}