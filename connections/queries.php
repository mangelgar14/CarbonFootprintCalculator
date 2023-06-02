<?php
/* PROJECTS */
function selectAllProjects($order)
{
    $db = getConnection();

    $sentence = $db->query("SELECT id,name,client,description,lastModified FROM projects ORDER BY $order ASC;");
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
    $sentence = $db->prepare("DELETE FROM projects where id = ?");
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
function searchProjects($query, $order)
{
    $db = getConnection();
    $sentence = $db->prepare("SELECT id,name,client,description,lastModified FROM projects WHERE name like ? or client like ? ORDER BY $order");
    $query = '%' . $query . '%';
    $sentence->execute([$query, $query]);
    return $sentence->fetchAll();
}
/* CONFIGURATION */
function fetchSerwareConfigurations($id)
{
    // Busca en la base de datos las configuraciones ASOCIADAS A UN PROYECTO
    $db = getConnection();
    $sentence = $db->prepare("SELECT * FROM serware WHERE id_project = ? ;");
    $sentence->execute([$id]);
    return $sentence->fetchAll();
}
function fetchSerwareConfigurationById($idSerware)
{
    // Busca en la base de datos las configuraciones ASOCIADAS A UN PROYECTO
    $db = getConnection();
    $sentence = $db->prepare("SELECT * FROM serware WHERE id_serware = ? ;");
    $sentence->execute([$idSerware]);
    return $sentence->fetchObject();
}

function insertSerwareConfiguration($id_project, $serware, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint)
{
    $db = getConnection();
    $sentence = $db->prepare("INSERT INTO serware (id_project ,serware, lastModified , type, provider , location , energy_consumption, consumption_emissions , embedded_emissions , carbon_footprint) VALUES (?,?,curdate(),?,?,?,?,?,?,?)");
    return $sentence->execute([$id_project, $serware, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint]);
}

function editSerwareConfiguration($id, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint)
{
    $db = getConnection();
    $sentence = $db->prepare("UPDATE serware SET lastModified=curdate() , type=?, provider=? , location=? , energy_consumption=?, consumption_emissions=? , embedded_emissions=? , carbon_footprint=? where id_serware = ?");
    return $sentence->execute([$type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint, $id]);
}

function deleteSerwareConfiguration($id)
{
    $db = getConnection();
    $sentence = $db->prepare("DELETE FROM serware where id_serware = ?");
    return $sentence->execute([$id]);
}
/* CONFIGURATION DATA */
function fetchDataByConfigId($table, $idSerware)
{
    // Busca en la base de datos las configuraciones ASOCIADAS A UN PROYECTO
    $db = getConnection();
    echo $table;
    $sentence = $db->prepare("SELECT * FROM ? WHERE id_serware = ? ;");
    $sentence->execute([$table, $idSerware]);
    return $sentence->fetchAll();
}
function insertPremiseFormData($idSerware, $num_of_servers, $power_consumption, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $checked_btn, $consumed_renewable_energy, $country)
{
    $db = getConnection();
    $sentence = $db->prepare("INSERT INTO datos_premise (idSerware, n_servers, power_consumption_known, power_consumption, cpu, 
                                            software_utilization, hours_day, renewable, renewable_certification, renewable_percentage, location) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
    return $sentence->execute([$idSerware, $num_of_servers, $power_consumption, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $checked_btn, $consumed_renewable_energy, $country]);
}
function insertCloudFormData($idSerware, $provider, $region, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, $gb_networking)
{
    $db = getConnection();
    $sentence = $db->prepare("INSERT INTO datos_cloud (idSerware, provider, region, vcpu_hours, vgpu_hours, 
                                            tb_hdd, tb_ssd, gb_memory, gb_networking) VALUES (?,?,?,?,?,?,?,?,?)");
    return $sentence->execute([$idSerware, $provider, $region, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, $gb_networking]);
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
