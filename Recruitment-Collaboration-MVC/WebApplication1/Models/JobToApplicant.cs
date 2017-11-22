using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class JobToApplicant
    {
        public long Id { get; set; } //Primary key
        public long UserId { get; set; } //Foreign key
        public long JobId { get; set; } //Foreign key
        public long ApplicantId { get; set; } //Foreign key
        public float MatchPercent { get; set; }
    }
}