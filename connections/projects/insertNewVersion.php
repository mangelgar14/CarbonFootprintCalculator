<?php
$idProject = htmlspecialchars($_POST["idProject"]);

include_once "../queries.php";
$response = insertNewVersion($idProject);

echo json_encode($response);

