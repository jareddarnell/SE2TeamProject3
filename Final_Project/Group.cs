using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Final_Project
{
    public class Group
    {
        public static List<Group> groups = new List<Group>();

                //Global Variables
        #region variables
        /// <summary>
        /// This will hold the user's name
        /// </summary>
        /// 
        [JsonPropertyName("sGroupName")] 
        public string sGroupName { get; set; } = string.Empty;

        /// <summary>
        /// This will hold the List of Item Objects
        /// </summary>



        #endregion

        #region methods
        //Create a List of Items        
        public List<Group> lGroupList = new List<Group>();



        #endregion





    }// end class
}// end namespace

