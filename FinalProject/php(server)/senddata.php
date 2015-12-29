<?php
$servername = "localhost";
$username = "cs20121657";
$password = "qwer1234";
$dbname = "db_20121657";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "select * from polices";
if (!mysqli_query($conn, $sql)) {
    die('INSERT ERROR: ' . mysqli_error());
}
$result = mysqli_query($conn, $sql);
$data = array();

while ($row = mysqli_fetch_assoc($result)) {
    $new_data = array($row["name"], $row["latitude"], $row["longitude"]);
    array_push($data, $new_data);
}

echo json_encode($data);

$conn->close();
?>
