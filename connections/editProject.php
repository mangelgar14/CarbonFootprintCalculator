<?php

$idProject = htmlspecialchars($_POST["idProject"]);
$name = htmlspecialchars($_POST["projectName"]);
$client = htmlspecialchars($_POST["client"]);
$description = htmlspecialchars($_POST["description"]);

include_once "queries.php";
$response = editProject($idProject,$name,$client,$description);

echo json_encode($response);

