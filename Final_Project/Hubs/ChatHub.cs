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


            //await Clients.Caller.SendAsync("sendstuff_raw_text", "hello!");
            //Group group = new Group();
            //group.sGroupName = "A group that Brad made";
            //Group.groups.Add(group);
            //await Clients.All.SendAsync("sendstuff_1", Group.groups);
            //await Clients.Caller.SendAsync("sendstuff_2", users);

            await Clients.Caller.SendAsync("InitialGroups", Group.groups);
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

        public async Task NewItem(string user, string itemName, string group)
        {
            Item new_item = new Item
            {
                sItemName = itemName,
                sItemText = "",
                sUserName = user,
                sItemGroup = group
            };

            int i = 0;
            foreach (Group element in Group.groups)
            {
                if(string.Equals(element.sGroupName, group))
                {
                    break;
                }

                i++;
            }

            Group.groups[i].items.Add(new_item);

            await Clients.All.SendAsync("ReceiveItem", Group.groups);
        }
    }
}