namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Applicants", "Phone", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Applicants", "Phone");
        }
    }
}
