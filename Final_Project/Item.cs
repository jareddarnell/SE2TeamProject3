using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Final_Project
{
    public class Item
    {
        //Global Variables
        #region variables
        [JsonPropertyName("sItemGroup")]
        public string sItemGroup { get; set; } = string.Empty;

        /// <summary>
        /// This will hold the item's name
        /// </summary>
        [JsonPropertyName("sItemName")]
        public string sItemName { get; set; } = string.Empty;

        [JsonPropertyName("sUserName")]
        public string sUserName { get; set; } = string.Empty;

        /// <summary>
        /// This will hold the text the user is writing
        /// </summary>
        [JsonPropertyName("sItemText")] 
        public string sItemText { get; set; } = string.Empty;

        [JsonPropertyName("bIsVisible")]
        public bool bIsVisible { get; set; } = true;


        #endregion

    }// end class
}// end namespace
