using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Applicant
    {
        public long Id { get; set; } //Primary key
        public string Name { get; set; }
        public string Title { get; set; }
        public string Cv { get; set; }
        public bool IsLocked { get; set; }
        public long UserIdLockedBy { get; set; } //Foreign key
        public string NameWhoLocked { get; set; } 
        public bool IsPublished { get; set; }
        public bool IsActive { get; set; }
        public int YearOfExperience { get; set; }
        public string Position { get; set; }
        public string InterviewDate { get; set; }
        public string StatusAfterInterview { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}