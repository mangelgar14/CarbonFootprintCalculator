<?php
$id = htmlspecialchars($_GET["id_project"]);
include_once "../queries.php";
$products = fetchSerwareConfigurations($id);
echo json_encode($products);