using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recruitment_Collaboration_Tool_MVC.Models
{
    public class Job
    {
        public long Id { get; set; } //Primary key
        public long UserId { get; set; } //Foreign key
        public string Name { get; set; }
        public string Description { get; set; }
        public string Skillset { get; set; }
        public string Requirements { get; set; }
        public bool IsActive { get; set; }
    }
}