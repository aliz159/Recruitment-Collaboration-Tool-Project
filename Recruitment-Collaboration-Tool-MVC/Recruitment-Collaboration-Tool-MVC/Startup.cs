using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Recruitment_Collaboration_Tool_MVC.Startup))]
namespace Recruitment_Collaboration_Tool_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
