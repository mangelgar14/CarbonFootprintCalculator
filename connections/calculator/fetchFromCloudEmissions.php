<?php

$region = htmlspecialchars($_GET["region"]);

include_once "../queries.php";

$products = fetchFromCloudEmissions($region);
echo json_encode($products);