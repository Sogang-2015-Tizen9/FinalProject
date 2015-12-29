<?php
$servername = "localhost";
$username = "cs20121657";
$password = "qwer1234";
$dbname = "db_20121657";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && !empty($_GET)) {
    $sql = "INSERT into polices (name, latitude, longitude)
        VALUES
        ('$_GET[name]', '$_GET[latitude]', '$_GET[longitude]')";

    if (!mysqli_query($conn, $sql)) {
        die('INSERT ERROR: ' . mysqli_error());
    }

    echo json_encode("Register success!");
}
else {
    echo json_encode("not GET");
}

$conn->close();
?>
