// Importing the Axios library for making HTTP requests
import axios from "axios";

// Exporting the Vue component
export default {
  // Data properties that store various values
  data() {
    return {
      phonebooks: [],           // Array to store phonebook data
      selectedPhonebook: null,  // Currently selected phonebook
      entries: [],              // Array to store entry data
      nameInput: "",            // Input value for name
      numberInput: "",          // Input value for number
      newPhonebookInput: "",    // Input value for new phonebook name
      phonebookFilter: "",      // Input value for phonebook filter
      entryFilter: "",          // Input value for entry filter
    };
  },
  computed: {
    // Computed properties for dynamically calculating values
    filteredPhonebooks() {
      // Filter phonebooks based on filter input
      if (this.phonebookFilter) {
        return this.phonebooks.filter(phonebook =>
          phonebook.name.toLowerCase().includes(this.phonebookFilter.toLowerCase())
        );
      } else {
        return [];
      }
    },
    filteredEntries() {
      // Filter entries based on entry filter and selected phonebook
      if (this.entryFilter && this.selectedPhonebook) {
        return this.selectedPhonebook.entries.filter(entry =>
          entry.name.toLowerCase().includes(this.entryFilter.toLowerCase()) ||
          entry.number.includes(this.entryFilter)
        );
      } else if (this.selectedPhonebook) {
        return this.selectedPhonebook.entries;
      } else {
        return [];
      }
    },
    // Computed property to format the number input
    formattedNumberInput: {
      get() {
        return this.numberInput.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      },
      set(newValue) {
        this.numberInput = newValue.replace(/\D/g, ''); // Remove non-digit characters
      }
    }
  },
  methods: {
    // Methods for performing specific actions and behaviors
    openTab(tabName) {
      // Switch between tabs
      const tabContents = document.getElementsByClassName("tabcontent");
      for (const tabContent of tabContents) {
        tabContent.classList.remove("active");
      }
      const selectedTabContent = document.getElementById(tabName);
      if (selectedTabContent) {
        selectedTabContent.classList.add("active");
      }
    },
    async selectPhonebook(phonebook) {
      // Select a phonebook and fetch its entries
      this.selectedPhonebook = phonebook;
      await this.fetchEntriesForPhonebook(phonebook.id);
    },
    async fetchEntriesForPhonebook(phonebookId) {
      // Fetch entries for a specific phonebook
      try {
        const response = await axios.get(`http://localhost:3000/entries?phonebook=${phonebookId}`);
        this.selectedPhonebook.entries = response.data;
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    },
    async saveEntry() {
      // Save a new entry to the selected phonebook
      if (this.selectedPhonebook && this.nameInput && this.numberInput) {
        const newEntry = {
          phonebook: this.selectedPhonebook,
          name: this.nameInput,
          number: this.numberInput,
        };

        try {
          const response = await axios.post("http://localhost:3000/entries", newEntry);
          console.log("Entry saved:", response.data);

          this.entries.push(newEntry);
          this.nameInput = "";
          this.numberInput = "";
        } catch (error) {
          console.error("Error saving entry:", error);
        }
      }
    },
    addPhonebook() {
      // Add a new phonebook
      if (this.newPhonebookInput) {
        const newPhonebook = {
          id: this.phonebooks.length + 1,
          name: this.newPhonebookInput,
          entries: [], // Initialize with an empty entries array
        };
        this.phonebooks.push(newPhonebook);

        axios.post("http://localhost:3000/phonebooks", newPhonebook).then(response => {
          console.log("Phonebook saved:", response.data);
          this.newPhonebookInput = "";
        });
      }
    },
    async fetchPhonebooks() {
      // Fetch all phonebooks from the server
      try {
        const response = await axios.get("http://localhost:3000/phonebooks");
        this.phonebooks = response.data;
      } catch (error) {
        console.error("Error fetching phonebooks:", error);
      }
      
    },
    // Method to format the number input as the user types
    formatNumberInput(event) {
      // The set function of computed property 'formattedNumberInput' will be invoked
      this.formattedNumberInput = event.target.value;
    }
  },
  // Code to run when the component is mounted
  mounted() {
    this.fetchPhonebooks();
  },
};
