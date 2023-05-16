<?php

$payload = json_decode(file_get_contents("php://input"));
if(!$payload){
    http_response_code(500);
    exit;
}

$idProject = $payload->idProject;
$name = $payload->name;
$client = $payload->client;
$description =$payload->description;

include_once "queries.php";
$response = editProject($name,$client,$description,$idProject);

echo json_encode($response);

