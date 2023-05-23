<?php


$name = htmlspecialchars($_POST["projectName"]);
$client = htmlspecialchars($_POST["client"]);
$description = htmlspecialchars($_POST["description"]);

include_once "../queries.php";
$response = insertProject($name,$client,$description);

echo json_encode($response);

