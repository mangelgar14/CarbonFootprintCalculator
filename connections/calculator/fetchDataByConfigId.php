<?php

$idSerware = htmlspecialchars($_GET["idSerware"]);
$table = htmlspecialchars($_GET["table"]);

include_once "../queries.php";

$products = fetchDataByConfigId($table,$idSerware);
echo json_encode($products);