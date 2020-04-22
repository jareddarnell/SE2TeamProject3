using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Final_Project
{
    public class ChatHub : Hub
    {
        //No need to do unique user checking, not required
        public async Task UserLogin(string user)
        {
            //Adds username to context.items, could be useful later for pulling list of users?
            //Context.Items.Add("userName", user);

            //send username and message to all connected clients.
            //await Clients.All.SendAsync("ReceiveMessage", user);
            //Context.Items["username"] = user;


            await Clients.Caller.SendAsync("sendstuff_raw_text", "hello!");
            Group group = new Group();
            group.sGroupName = "A group that Brad made";
            Group.groups.Add(group);
            await Clients.Caller.SendAsync("sendstuff_1", Group.groups);
            //await Clients.Caller.SendAsync("sendstuff_2", users);

        }

        public async Task NewGroup(string group)
        {
            Group new_group = new Group
            {
                sGroupName = group
            };
            
            Group.groups.Add(new_group);

            await Clients.All.SendAsync("ReceiveGroup", Group.groups);
        }

        public async Task SyncItem(string user, string category, string textdata)
        {
            await Clients.All.SendAsync("ReceiveItem", user, category, textdata);
        }
    }
}