<?php
$payload = json_decode(file_get_contents("php://input"));
if(!$payload){
    http_response_code(500);
    exit;
}

$idProject = $payload->idProject;

include_once "queries.php";
$response = deleteProject($idProject);

echo json_encode($response);

