namespace Recruitment_Collaboration_Tool_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingNewFieldsToJobsAndApplicants : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Applicants", "YearOfExperience", c => c.Int(nullable: false));
            AddColumn("dbo.Applicants", "Phone", c => c.Int(nullable: false));
            AddColumn("dbo.Applicants", "Position", c => c.String());
            AddColumn("dbo.Applicants", "InterviewDate", c => c.String());
            AddColumn("dbo.Applicants", "StatusAfterInterview", c => c.String());
            AddColumn("dbo.Jobs", "YearOfExperience", c => c.Int(nullable: false));
            AddColumn("dbo.Jobs", "strUniqueID", c => c.String());
            AddColumn("dbo.Jobs", "Position", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Jobs", "Position");
            DropColumn("dbo.Jobs", "strUniqueID");
            DropColumn("dbo.Jobs", "YearOfExperience");
            DropColumn("dbo.Applicants", "StatusAfterInterview");
            DropColumn("dbo.Applicants", "InterviewDate");
            DropColumn("dbo.Applicants", "Position");
            DropColumn("dbo.Applicants", "Phone");
            DropColumn("dbo.Applicants", "YearOfExperience");
        }
    }
}
