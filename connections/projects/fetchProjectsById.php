<?php

if(!isset($_GET["idProject"])){
    http_response_code(500);
    exit;
}
include_once "../queries.php";
$response = selectProjectById($_GET["idProject"]);

echo json_encode($response);

