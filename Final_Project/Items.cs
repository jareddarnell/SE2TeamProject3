using System;
using System.Collections.Generic;

namespace Final_Project
{
    public class Items
    {
        //Global Variables
        #region variables
        /// <summary>
        /// This will hold the user's name
        /// </summary>
        public string sItemName { get; set; } = string.Empty;

        /// <summary>
        /// This will hold the text the user is writing
        /// </summary>
        public string sItemText { get; set; } = string.Empty;

        public bool bIsVisible = true;


        #endregion

        #region methods
        //Create a List of Items
        public List<Object> lItemList = new List<Object>();

        public Items(List<object> lItemList)
        {
            // this allows us to use our variables localy before sending them off to other classes
            this.lItemList = lItemList;

            // this will be set to what the user enters, when we figure that out
            lItemList.Add(sItemName = "Tucker");

            // this will be what the user has typed in the textbox after they click save
            lItemList.Add(sItemText = "Hello there");

            // this value is set by a check box to make the 'Group' visible to everyone else
            lItemList.Add(bIsVisible);
        }

        #endregion

    }// end class
}// end namespace
