<?php
$idSerware = htmlspecialchars($_POST["idSerware"]);
$table = htmlspecialchars($_POST["table"]);

include_once "../queries.php";
if ($table == 'Premise') {
    $response = deletePremiseFormData($idSerware);
} else {
    $response = deleteCloudFormData($idSerware);
}


echo json_encode($response);
