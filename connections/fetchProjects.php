<?php
include_once "queries.php";
$products = selectAllProjectsOrder("date");
echo json_encode($products);