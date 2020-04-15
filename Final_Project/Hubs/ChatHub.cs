using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GroupOrganizer.Hubs
{
    public class ChatHub : Hub
    {
        //No need to do unique user checking, not required
        public async Task SendMessage(string user, string message)
        {
            //Adds username to context.items, could be useful later for pulling list of users?
            Context.Items.Add("userName", user);

            //send username and message to all connected clients.
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task ReceiveGroup(string group)
        {
            await Clients.All.SendAsync("ReceiveGroup", group);
        }
    }
}