using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GroupOrganizer.Hubs
{
    public class ChatHub : Hub
    {
        //No need to do unique user checking, not required
        public async Task UserLogin(string user)
        {
            //Adds username to context.items, could be useful later for pulling list of users?
            Context.Items.Add("userName", user);

            //send username and message to all connected clients.
            await Clients.All.SendAsync("ReceiveMessage", user);
        }

        //WORK IN PROGRESS
        /*public async Task GetUsers(string user)
        {
            Context.Items.

            await Clients.User(user).SendAsync("GetUsers", users);
        }*/

        public async Task ReceiveGroup(string group)
        {
            await Clients.All.SendAsync("ReceiveGroup", group);
        }
    }
}