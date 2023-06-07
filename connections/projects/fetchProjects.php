<?php

$order = htmlspecialchars($_GET["order"]);

include_once "../queries.php";

$products = selectAllProjects($order);
echo json_encode($products);
