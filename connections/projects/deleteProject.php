<?php

$idProject = htmlspecialchars($_POST["idProject"]);


include_once "../queries.php";
$response = deleteProject($idProject);

echo json_encode($response);

