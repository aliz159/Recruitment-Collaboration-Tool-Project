using System.Web;
using System.Web.Mvc;

namespace Recruitment_Collaboration_Tool_MVC
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
