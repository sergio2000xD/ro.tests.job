using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ro.tests.job.Controllers
{
    public class GanttTask
    {
        public GanttTask() { }
        public GanttTask(string col1, string col2, string col3) 
        {
            columns = new string[] { col1, col2, col3 };
        }
        /// <summary>
        /// user columns of data
        /// </summary>
        public string[] columns;
        /// <summary>
        /// start for this task
        /// </summary>
        public DateTime start;
        /// <summary>
        /// end for this task
        /// </summary>
        public DateTime end;
        /// <summary>
        /// css color
        /// </summary>
        public string color;
    }

    public class GanttController : Controller
    {
        //
        // GET: /Gant/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Test()
        {
            return View();
        }

        public ActionResult GetRows()
        {
            List<GanttTask> data = new List<GanttTask>();
            data.Add(new GanttTask("1", "Modulo Login Kongestor", "2 days") { color = "red", start = new DateTime(2015, 1, 1), end = new DateTime(2015, 1, 3)});
            data.Add(new GanttTask("2", "Landing Page Kongestor", "2 weeks") { color = "green", start = new DateTime(2015, 1, 3), end= new DateTime(2015, 1, 17)});
            data.Add(new GanttTask("3", "Alta usuarios Kongestor", "4 days") { color = "blue", start = new DateTime(2015, 1, 17), end= new DateTime(2015, 1, 21)});
            data.Add(new GanttTask("4", "Autodestruir Kongestor", "10 days") { color = "gray", start = new DateTime(2015, 1, 21), end = new DateTime(2015, 1, 31) });

            return Json(data.ToArray(), JsonRequestBehavior.AllowGet);
        }

    }
}
