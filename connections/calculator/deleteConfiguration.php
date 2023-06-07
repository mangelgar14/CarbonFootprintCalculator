<?php
$id = htmlspecialchars($_POST["id"]);


include_once "../queries.php";
$response = deleteSerwareConfiguration($id);

echo json_encode($response);
