namespace Recruitment_Collaboration_Tool_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addUserIdFieldToTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.JobToApplicants", "UserId", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.JobToApplicants", "UserId");
        }
    }
}
