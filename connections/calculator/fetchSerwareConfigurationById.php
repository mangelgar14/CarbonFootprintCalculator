<?php
$idSerware = htmlspecialchars($_GET["idSerware"]);
include_once "../queries.php";
$products = fetchSerwareConfigurationById($idSerware);
echo json_encode($products);