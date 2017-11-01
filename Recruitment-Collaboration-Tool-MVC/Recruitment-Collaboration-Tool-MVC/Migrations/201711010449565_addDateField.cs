namespace Recruitment_Collaboration_Tool_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDateField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.InterviewSummaries", "Date", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.InterviewSummaries", "Date");
        }
    }
}
