namespace Recruitment_Collaboration_Tool_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleteField : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.InterviewSummaries", "Date");
        }
        
        public override void Down()
        {
            AddColumn("dbo.InterviewSummaries", "Date", c => c.DateTime(nullable: false));
        }
    }
}
