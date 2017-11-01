using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recruitment_Collaboration_Tool_MVC.Models
{
    public class Applicant
    {
        public long Id { get; set; } //Primary key
        public string Name { get; set; }
        public string Title { get; set; }
        public string Skillset { get; set; }
        public string Cv { get; set; }
        public bool IsLocked { get; set; }
        public long UserIdLockedBy { get; set; } //Foreign key
        public bool IsPublished { get; set; }
        public bool IsActive { get; set; }
    }
}