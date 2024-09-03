<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "site_with_tree_of_sections_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>