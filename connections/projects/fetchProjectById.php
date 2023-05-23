<?php

if(!isset($_POST["idProject"])){
    http_response_code(500);
    exit;
}
include_once "../queries.php";
$response = selectProjectById(htmlspecialchars($_POST["idProject"]));

echo json_encode($response);

