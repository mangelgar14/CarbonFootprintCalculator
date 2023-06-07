<?php
$query = htmlspecialchars($_GET["query"]);
$order = htmlspecialchars($_GET["order"]);
include_once "../queries.php";
$response = searchProjects($query,$order);

echo json_encode($response);

