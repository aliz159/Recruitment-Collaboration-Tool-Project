using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Job
    {
        public long Id { get; set; } //Primary key
        public long UserId { get; set; } //Foreign key
        public string Name { get; set; }
        public string Description { get; set; }
        public string Requirements { get; set; }
        public bool IsActive { get; set; }
        public int YearOfExperience { get; set; }
        public string strUniqueID { get; set; }
        public string Position { get; set; }
    }
}