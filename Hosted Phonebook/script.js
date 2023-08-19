document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tablinks");
  const tabContents = document.querySelectorAll(".tabcontent");
  
  tabButtons.forEach(tabButton => {
    tabButton.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");
      openTab(tabName);
    });
  });
  
  const phonebookFilterInput = document.getElementById("phonebookFilter");
  const phonebookList = document.getElementById("phonebookList");
  const entryFilterInput = document.getElementById("entryFilter");
  const entryList = document.getElementById("entryList");
  
  const phonebookSelect = document.getElementById("phonebookSelect");
  const nameInput = document.getElementById("nameInput");
  const numberInput = document.getElementById("numberInput");
  const saveEntryButton = document.getElementById("saveEntry");
  const cancelEntryButton = document.getElementById("cancelEntry");
  
  const newPhonebookInput = document.getElementById("newPhonebookInput");
  const savePhonebookButton = document.getElementById("savePhonebook");
  const cancelPhonebookButton = document.getElementById("cancelPhonebook");
  
  function openTab(tabName) {
    tabContents.forEach(tabContent => {
      tabContent.style.display = "none";
    });
    const selectedTabContent = document.getElementById(tabName);
    if (selectedTabContent) {
      selectedTabContent.style.display = "block";
    }
  }
  
  // Other JavaScript functions...
});
