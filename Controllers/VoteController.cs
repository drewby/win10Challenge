using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.ServiceBus.Messaging;
using System.Text;
using Microsoft.Framework.ConfigurationModel;
using win10Challenge.Models;

namespace win10Challenge.Controllers
{
    [Route("api/[controller]")]
    public class VoteController : Controller
    {
		private string _connectionString = "";
		private string _eventHubName = "";
		
		public VoteController(IConfiguration config) {
			_connectionString = config["AppSettings:EventHubConnection"];
			_eventHubName = config["AppSettings:EventHubName"];
		}
		
		
		[HttpPost]
		public IActionResult Post([FromBody] Vote vote)
		{	
			var clientId = Context.Request.Cookies.Get("clientId");
			if (String.IsNullOrEmpty(clientId)) {
				clientId = Guid.NewGuid().ToString();
				Context.Response.Cookies.Append("clientId", clientId);
			}
			
			System.Console.WriteLine("Attempting post..." + clientId + ", " + vote.contestantId + ", " + vote.impact + ", " + vote.value);
			
			#if DNX451
			try {
				var message = String.Format("{{ \"clientId\" : \"{0}\", \"contestantId\" : \"{1}\", \"value\" : {2}, \"impact\" : {3} }}", clientId, vote.contestantId, vote.value, vote.impact);

				var eventHubClient = EventHubClient.CreateFromConnectionString(_connectionString, _eventHubName);
				eventHubClient.Send(new EventData(Encoding.UTF8.GetBytes(message)));
			} catch (Exception e)
			{
				System.Diagnostics.EventLog.WriteEntry("Win10Challenge", "Exception: " + e.Message);
				return new HttpStatusCodeResult(500);
			}
			
			return new HttpStatusCodeResult(200);
         	#else
			 	return new HttpStatusCodeResult(500);;
				// throw new Exception("Runtime environment does not support event hubs.");
			#endif
		}
	}
}