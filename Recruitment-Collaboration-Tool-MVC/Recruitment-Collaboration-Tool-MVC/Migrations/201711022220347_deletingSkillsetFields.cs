namespace Recruitment_Collaboration_Tool_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deletingSkillsetFields : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Applicants", "Skillset");
            DropColumn("dbo.Jobs", "Skillset");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Jobs", "Skillset", c => c.String());
            AddColumn("dbo.Applicants", "Skillset", c => c.String());
        }
    }
}
