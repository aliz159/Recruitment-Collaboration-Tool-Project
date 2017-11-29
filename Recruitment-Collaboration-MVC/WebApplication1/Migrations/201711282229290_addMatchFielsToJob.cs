namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addMatchFielsToJob : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Jobs", "CurrentMatchPercent", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Jobs", "CurrentMatchPercent");
        }
    }
}
