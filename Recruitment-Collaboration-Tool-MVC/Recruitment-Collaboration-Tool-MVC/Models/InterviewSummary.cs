using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recruitment_Collaboration_Tool_MVC.Models
{
    public class InterviewSummary
    {
        public long Id { get; set; } //Primary key
        public long UserId { get; set; } //Foreign key
        public long ApplicantId { get; set; } //Foreign key
        public string Summary { get; set; }
        public DateTime Date { get; set; }
    }
}