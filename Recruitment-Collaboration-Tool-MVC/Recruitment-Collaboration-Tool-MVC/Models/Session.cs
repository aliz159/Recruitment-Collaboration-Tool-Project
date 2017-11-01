using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recruitment_Collaboration_Tool_MVC.Models
{
    public class Session
    {
        public long Id { get; set; } //Primary key
        public long UserId { get; set; } //Foreign key
        public string SessionStr { get; set; } 
        public string SessionDate { get; set; } 
        public string SessionTime { get; set; } 
    }
}