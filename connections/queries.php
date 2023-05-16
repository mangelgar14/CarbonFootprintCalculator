<?php
function selectAllProjects()
{
    $db = getConnection();
    $sentence = $db->query("SELECT id,name,client,description,lastModified FROM projects ;");
    return $sentence->fetchAll();
}
function selectProjectById($idProject)
{
    $db = getConnection();
    $sentence = $db->prepare("SELECT id,name,client,description,lastModified FROM projects WHERE id = ?");
    $sentence->execute([$idProject]);
    return $sentence->fetchObject();
}
function deleteProject($idProject)
{
    $db = getConnection();
    $sentence = $db->prepare("DELETE * FROM projects where id =  ?");
    return $sentence->execute([$idProject]);
}
function editProject($idProject, $name, $client, $description)
{
    $db = getConnection();
    $sentence = $db->prepare(" UPDATE proejcts SET name = ?, client = ?, description = ?, date = curdate() WHERE id = ?");
    return $sentence->execute([$name, $client, $description, $idProject]);
}
function insertProject($name, $client, $description)
{
    $db = getConnection();
    $lastModified = date("d/M/y");
    $sentence = $db->prepare("INSERT INTO projects (name,client,description,lastModified) VALUES (?,?,?,?)");
    return $sentence->execute([$name, $client, $description, $lastModified ]);
}

function getConnection()
{
    $password = "root";
    $user = "root";
    $dbname = "CarbonFootprintCalculator";
    $database = new PDO('mysql:host=localhost;dbname=' . $dbname, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}
