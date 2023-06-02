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
    // Busca en la base de datos las configuraciones a partir de su id
    $db = getConnection();
    $sentence = $db->prepare("SELECT * FROM serware WHERE id_serware = ? ;");
    $sentence->execute([$idSerware]);
    return $sentence->fetchObject();
}

function insertSerwareConfiguration($id_project, $serware, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint)
{
    $db = getConnection();
    $sentence = $db->prepare("INSERT INTO serware (id_project ,serware, lastModified , type, provider , location , energy_consumption, consumption_emissions , embedded_emissions , carbon_footprint) VALUES (?,?,curdate(),?,?,?,?,?,?,?)");
    $sentence->execute([$id_project, $serware, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint]);
    return $db->lastInsertId();
}

function editSerwareConfiguration($id, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint)
{
    $db = getConnection();
    $sentence = $db->prepare("UPDATE serware SET lastModified=curdate() , provider=? , location=? , energy_consumption=?, consumption_emissions=? , embedded_emissions=? , carbon_footprint=? where id_serware = ?");
    return $sentence->execute([$provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint, $id]);
}

function deleteSerwareConfiguration($id)
{
    $db = getConnection();
    $sentence = $db->prepare("DELETE FROM serware where id_serware = ?");
    return $sentence->execute([$id]);
}
/* CONFIGURATION DATA */
function fetchPremiseDataByConfigId($idSerware)
{

    $db = getConnection();
    $sentence = $db->prepare("SELECT * FROM datos_premise WHERE id_serware = ?");
    $sentence->execute([$idSerware]);

    return $sentence->fetchObject();
}
function fetchCloudDataByConfigId($idSerware)
{

    $db = getConnection();
    $sentence = $db->prepare("SELECT * FROM datos_cloud WHERE id_serware = ?");
    $sentence->execute([$idSerware]);

    return $sentence->fetchObject();
}
function insertPremiseFormData($idSerware, $num_of_servers, $power_consumption_known, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $renewable_certification, $consumed_renewable_energy, $country)
{
    $db = getConnection();
    if ($power_consumption_known == "true") {
        $power_consumption_known = true;
    } else {
        $renewable_energy = false;
    }

    if ($renewable_energy == "true") {
        $renewable_energy = true;
    } else {
        $renewable_energy = false;
    }

    if ($renewable_certification === "NULL") {
        $renewable_certification = null;
    }
    if ($cpu === "NULL") {
        $cpu = null;
    }
    if ($nominal_consumption === "NULL") {
        $nominal_consumption = null;
    }
    if ($software_utilization === "NULL") {
        $software_utilization = null;
    }
    if ($consumed_renewable_energy === "NULL") {
        $consumed_renewable_energy = null;
    }

    $sentence = $db->prepare("INSERT INTO datos_premise (id_serware, n_servers, power_consumption_known, power_consumption, cpu, software_utilization, hours_day, renewable, renewable_certification, renewable_percentage, location) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
    echo "$idSerware, $num_of_servers, $power_consumption_known, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $renewable_certification, $consumed_renewable_energy, $country";
    return $sentence->execute([$idSerware, $num_of_servers, $power_consumption_known, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $renewable_certification, $consumed_renewable_energy, $country]);
}
function insertCloudFormData($idSerware, $provider, $region, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, $gb_networking)
{
    $db = getConnection();
    $sentence = $db->prepare("INSERT INTO datos_cloud (id_serware, provider, region, vcpu_hours, vgpu_hours, tb_hdd, tb_ssd, gb_memory, gb_networking) VALUES (?,?,?,?,?,?,?,?,?)");
    return $sentence->execute([$idSerware, $provider, $region, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, $gb_networking]);
}
<<<<<<< Updated upstream
function editPremiseFormData($idSerware, $num_of_servers, $power_consumption_known, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $renewable_certification, $consumed_renewable_energy, $country){
    $db = getConnection();
    if ($power_consumption_known == "true") {
        $power_consumption_known = true;
    } else {
        $renewable_energy = false;
    }

    if ($renewable_energy == "true") {
        $renewable_energy = true;
    } else {
        $renewable_energy = false;
    }

    if ($renewable_certification === "NULL") {
        $renewable_certification = null;
    }
    if ($cpu === "NULL") {
        $cpu = null;
    }
    if ($nominal_consumption === "NULL") {
        $nominal_consumption = null;
    }
    if ($software_utilization === "NULL") {
        $software_utilization = null;
    }
    if ($consumed_renewable_energy === "NULL") {
        $consumed_renewable_energy = null;
    }

    $sentence = $db->prepare("UPDATE datos_premise SET n_servers = ?, power_consumption_known=?, power_consumption=?, cpu=?, software_utilization=?, hours_day=?, renewable=?, renewable_certification=?, renewable_percentage=?, location=? WHERE id_serware = ?");
    return $sentence->execute([ $num_of_servers, $power_consumption_known, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $renewable_certification, $consumed_renewable_energy, $country,$idSerware]);
}
function editCloudFormData($idSerware, $provider, $region, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, $gb_networking)
{
    $db = getConnection();
    $sentence = $db->prepare("UPDATE datos_cloud SET provider=?, region=?, vcpu_hours=?, vgpu_hours=?, tb_hdd=?, tb_ssd=?, gb_memory=?, gb_networking=? WHERE id_serware =?");
    return $sentence->execute([$provider, $region, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, $gb_networking,$idSerware]);
}

=======
/* FORM DATA */
function fetchFromCloudEmissions($region)
{
    $db = getConnection();
    $sentence = $db->prepare("SELECT * FROM CloudEmissions WHERE Region = ?");
    $sentence->execute([$region]);
    return $sentence->fetchObject();
}
>>>>>>> Stashed changes
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
