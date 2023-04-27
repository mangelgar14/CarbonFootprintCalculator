<?php

$post = json_decode(file_get_contents('php://input'));
$userId = !empty($post->idUser) ? $post->idUser : null;

if ($userId != null) {

    include("../data.php");
    include("../queries.php");

    if ($connection->connect_errno) {
        echo json_encode(array('success' => 0));
        exit();
    }

    mysqli_select_db($connection, $database) or die("The database is not found");
    mysqli_set_charset($connection, "utf8");

    $connection->query(setUser($userId));

    echo json_encode(array('success' => 1));
    exit();
} else {
    echo json_encode(array('success' => 0));
    exit();
}

echo json_encode(array('success' => 0));
exit();
