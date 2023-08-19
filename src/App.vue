<template>
  <!-- Main container -->
  <div class="container">
    <!-- Tab buttons for switching between tabs -->
    <div class="tab">
      <button class="tablinks" @click="openTab('Phonebook')">Phonebook</button>
      <button class="tablinks" @click="openTab('AddEntries')">Add Entries</button>
      <button class="tablinks" @click="openTab('AddPhonebook')">Add Phonebook</button>
    </div>

    <!-- Phonebook Tab -->
    <form id="Phonebook" class="tabcontent">
      <h2>Phonebook</h2>
      <!-- Search input for filtering phonebooks -->
      <input type="text" v-model="phonebookFilter" placeholder="🔍 Search for phonebooks..." />
      <ul>
        <!-- Display filtered phonebooks -->
        <li v-for="phonebook in filteredPhonebooks" :key="phonebook.id" @click="selectPhonebook(phonebook)">
          {{ phonebook.name }}
        </li>
      </ul>
      <!-- Display details of selected phonebook -->
      <div v-if="selectedPhonebook">
        <form id="PhonebookDetails">
          <h2>Details</h2>
          <!-- Search input for filtering entries within the phonebook -->
          <input type="text" v-model="entryFilter" placeholder="🔍 Search for entries..." />
          <ul>
            <!-- Display filtered entries -->
            <li v-for="entry in filteredEntries" :key="entry.id">
              {{ entry.name }} - {{ entry.number }}
            </li>

          </ul>
        </form>
      </div>
    </form>

    <!-- Add Entries Tab -->
    <form id="AddEntries" class="tabcontent">
      <h2>Add Entries</h2>
      <!-- Dropdown for selecting a phonebook to add an entry to -->
      <select id="phonebookSelect" v-model="selectedPhonebook">
        <option v-for="phonebook in phonebooks" :key="phonebook.id" :value="phonebook.id">{{ phonebook.name }}</option>
      </select>
      <!-- Input fields for name and number of the new entry -->
      <input type="text" v-model="nameInput" placeholder="Name" />
      <input type="tel" v-model="formattedNumberInput" placeholder="123-456-7890" @input="formatNumberInput" />
    
      <!-- Buttons to save or cancel the new entry -->
      <button class="btn btn-primary" @click="saveEntry">Save</button>
      <button class="btn btn-secondary" @click="cancelEntry">Cancel</button>
    </form>

    <!-- Add Phonebook Tab -->
    <form id="AddPhonebook" class="tabcontent" @submit.prevent="addPhonebook">
      <h2>Add Phonebook</h2>
      <!-- Input field for the name of the new phonebook -->
      <input type="text" v-model="newPhonebookInput" placeholder="Phonebook Name" />
      <!-- Buttons to save or cancel the new phonebook -->
      <button type="submit" class="btn btn-primary">Save</button>
      <button class="btn btn-secondary" @click="cancelPhonebook">Cancel</button>
    </form>
  </div>
</template>

<!-- JavaScript logic -->
<script src="./script.js"></script>

<!-- Styling -->
<style src="./styles.css"></style>
