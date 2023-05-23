<?php
/* PROEJCTS */
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
    $sentence = $db->prepare("DELETE FROM projects where id =  ?");
    return $sentence->execute([$idProject]);
}
function editProject($idProject, $name, $client, $description)
{
    $db = getConnection();
    $sentence = $db->prepare("UPDATE projects SET name = ?, client = ?, description = ?, lastModified = curdate() WHERE id = ?");
    return $sentence->execute([$name, $client, $description, $idProject]);
}
function insertProject($name, $client, $description)
{

    $db = getConnection();
    $sentence = $db->prepare("INSERT INTO projects (name,client,description,lastModified) VALUES (?,?,?,curdate())");
    return $sentence->execute([$name, $client, $description]);
}
/* CONFIGURATION */
function fetchServerConfigurations($id)
{
    $db = getConnection();
    $sentence = $db->query("SELECT * FROM server WHERE id_project = $id ;");
    return $sentence->fetchAll();
}
function fetchSoftwareConfigurations($id)
{
    $db = getConnection();
    $sentence = $db->query("SELECT * FROM software WHERE id_software = $id;");
    return $sentence->fetchAll();
}
function insertServerConfiguration($id_project, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint)
{
    $db = getConnection();
    $sentence = $db->prepare("INSERT INTO server (id_project , lastModified , type, provider , location , energy_consumption, consumption_emissions , embedded_emissions , carbon_footprint) VALUES (?,curdate(),?,?,?,?,?,?,?)");
    return $sentence->execute([$id_project, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint]);
}
function insertSoftwareConfiguration($id_project, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint)
{
    $db = getConnection();
    $sentence = $db->prepare("INSERT INTO software (id_project , lastModified , type, provider , location , energy_consumption, consumption_emissions , embedded_emissions , carbon_footprint) VALUES (?,curdate(),?,?,?,?,?,?,?)");
    return $sentence->execute([$id_project, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint]);
}
function editServerConfiguration($id, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint)
{
    $db = getConnection();
    $sentence = $db->prepare("UPDATE server SET lastModified=curdate() , type=?, provider=? , location=? , energy_consumption=?, consumption_emissions=? , embedded_emissions=? , carbon_footprint=? where id_server = ?");
    return $sentence->execute([$type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint,$id]);
}
function editSoftwareConfiguration($id, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint)
{
    $db = getConnection();
    $sentence = $db->prepare("UPDATE software SET lastModified=curdate() , type=?, provider=? , location=? , energy_consumption=?, consumption_emissions=? , embedded_emissions=? , carbon_footprint=? where id_software = ?");
    return $sentence->execute([$type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint,$id]);
}
function deleteServerConfiguration($id)
{
    $db = getConnection();
    $sentence = $db->prepare("DELETE FROM server where id_server = ?");
    return $sentence->execute([$id]);
}
function deleteSoftwareConfiguration($id)
{
    $db = getConnection();
    $sentence = $db->prepare("DELETE FROM software where id_software = ?");
    return $sentence->execute([$id]);
}

/* CONNECTION */
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
