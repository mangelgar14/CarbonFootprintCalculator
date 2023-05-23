<?php
$id = htmlspecialchars($_POST["id_software"]);
include_once "../queries.php";
$products = fetchSoftwareConfigurations($id);
echo json_encode($products);