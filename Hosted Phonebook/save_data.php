<?php
$servername = "localhost";
$username = "id20823038_phonebook";
$password = "Book1212#";
$dbname = "id20823038_phonebook";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Handle POST data and save to the database
    // Example: Save phonebook or entry data
    $phonebookName = $_POST["phonebookName"];
    
    $sql = "INSERT INTO phonebooks (name) VALUES ('$phonebookName')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Phonebook saved successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
