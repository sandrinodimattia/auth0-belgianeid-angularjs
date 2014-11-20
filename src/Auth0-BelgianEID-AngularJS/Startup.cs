using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.Owin;
using Owin;
using SampleApp;

[assembly: OwinStartup(typeof(Startup))]
namespace SampleApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new RazorViewEngine());

            AreaRegistration.RegisterAllAreas();
            RouteTable.Routes.Clear();
            RouteTable.Routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            RouteTable.Routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
