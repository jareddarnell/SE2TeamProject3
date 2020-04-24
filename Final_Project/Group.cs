using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Final_Project
{
    public class Group
    {
        public static List<Group> groups = new List<Group>();
        public List<Item> items = new List<Item>();

        //Global Variables
        #region variables

        /// <summary>
        /// This will hold the group's name
        /// </summary>
        [JsonPropertyName("sGroupName")] 
        public string sGroupName { get; set; } = string.Empty;

        #endregion

        #region methods


        #endregion
    }// end class
}// end namespace

