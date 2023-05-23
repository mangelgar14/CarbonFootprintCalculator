<?php
include_once "../queries.php";
$products = selectAllProjects();
echo json_encode($products);