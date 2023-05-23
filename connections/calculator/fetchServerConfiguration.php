<?php
$id = htmlspecialchars($_POST["id_project"]);
include_once "../queries.php";
$products = fetchServerConfigurations($id);
echo json_encode($products);