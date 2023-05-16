<?php

$payload = json_decode(file_get_contents("php://input"));
$name = $payload->name;
$client = $payload->client;
$description =$payload->description;

include_once "queries.php";
$response = insertProject($name,$client,$description);

echo json_encode($response);

