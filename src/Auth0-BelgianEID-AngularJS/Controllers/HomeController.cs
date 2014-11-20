using System.Web.Mvc;

using SampleApp.Models;

namespace SampleApp.Controllers
{
    public class Saml2Controller : Controller
    {
        public ActionResult Post(string samlResponse)
        {
            return View("Post", new Saml2Response
            {
                Content = samlResponse,
                AccountName = "sandrino"
            });
        }
    }
}