using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class InterviewSummary
    {
        public long Id { get; set; } //Primary key
        public long UserId { get; set; } //Foreign key
        public string RecruiterName { get; set; } //Foreign key
        public long ApplicantId { get; set; } //Foreign key
        public string Summary { get; set; }
        public string Date { get; set; }
    }
}