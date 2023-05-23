<?php
$table = htmlspecialchars($_POST["table"]);
$id = htmlspecialchars($_POST["id"]);


include_once "../queries.php";
if ($table == 0) {
    $response = deleteServerConfiguration($id);
} else if ($table == 1) {
    $response = deleteSoftwareConfiguration($id);
}else{
    $response = null;
}
echo json_encode($response);
