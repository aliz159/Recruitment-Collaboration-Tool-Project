namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleteField : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Applicants", "Phone");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Applicants", "Phone", c => c.Int(nullable: false));
        }
    }
}
