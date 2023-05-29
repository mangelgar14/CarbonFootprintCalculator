<?php
$idSerware = htmlspecialchars($_GET["idSerware"]);
$table = htmlspecialchars($_GET["table"]);

include_once "../queries.php";

$products = fetchSerwareConfigurations($id);
echo json_encode($products);