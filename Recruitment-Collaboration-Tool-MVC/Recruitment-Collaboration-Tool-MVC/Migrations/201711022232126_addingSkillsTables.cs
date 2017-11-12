namespace Recruitment_Collaboration_Tool_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingSkillsTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Skillsets",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        skill = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SkillsForTheJobs",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        JobId = c.Long(nullable: false),
                        SkillsetsId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SkillsOfAnApplicants",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        ApplicantId = c.Long(nullable: false),
                        SkillsetsId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SkillsOfAnApplicants");
            DropTable("dbo.SkillsForTheJobs");
            DropTable("dbo.Skillsets");
        }
    }
}
