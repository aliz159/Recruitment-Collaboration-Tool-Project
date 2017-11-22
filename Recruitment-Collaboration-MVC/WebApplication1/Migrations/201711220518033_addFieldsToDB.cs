namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addFieldsToDB : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Applicants", "NameWhoLocked", c => c.String());
            AddColumn("dbo.JobToApplicants", "MatchPercent", c => c.Single(nullable: false));
            AddColumn("dbo.InterviewSummaries", "RecruiterName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.InterviewSummaries", "RecruiterName");
            DropColumn("dbo.JobToApplicants", "MatchPercent");
            DropColumn("dbo.Applicants", "NameWhoLocked");
        }
    }
}
