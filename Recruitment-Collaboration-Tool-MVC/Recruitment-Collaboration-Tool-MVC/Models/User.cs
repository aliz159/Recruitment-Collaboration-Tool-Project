using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Recruitment_Collaboration_Tool_MVC.Models
{
    public class User
    {
        public long Id { get; set; } //Primary key
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }
    }
}