<?php
$table = htmlspecialchars($_POST["table"]);
$idSerware = htmlspecialchars($_POST["idSerware"]);

$num_of_servers = htmlspecialchars($_POST["num_of_servers"]);
$power_consumption = htmlspecialchars($_POST["power_consumption"]);
$nominal_consumption = htmlspecialchars($_POST["nominal_consumption"]);
$cpu = htmlspecialchars($_POST["cpu"]);
$software_utilization = htmlspecialchars($_POST["software_utilization"]);
$hours_used = htmlspecialchars($_POST["hours_used"]);
$renewable_energy = htmlspecialchars($_POST["renewable_energy"]);
$checked_btn = htmlspecialchars($_POST["checked_btn"]);
$consumed_renewable_energy = htmlspecialchars($_POST["consumed_renewable_energy"]);
$country = htmlspecialchars($_POST["country"]);

$provider = htmlspecialchars($_POST["provider"]);
$region = htmlspecialchars($_POST["region"]);
$vCPU_hours = htmlspecialchars($_POST["vCPU_hours"]);
$vGPU_hours = htmlspecialchars($_POST["vGPU_hours"]);
$TB_HDD = htmlspecialchars($_POST["TB_HDD"]);
$TB_SSD = htmlspecialchars($_POST["TB_SSD"]);
$GB_memory = htmlspecialchars($_POST["GB_memory"]);
$GB_networking = htmlspecialchars($_POST["GB_networking"]);

include_once "../queries.php";
if ($table == "datos_cloud") {
    $response = insertCloudFormData($idSerware, $provider, $region, $vCPU_hours, $vGPU_hours, $TB_HDD, $TB_SSD, $GB_memory, $GB_networking);
} 
else if ($table == "datos_premise") {
    $response = insertPremiseFormData($idSerware, $num_of_servers, $power_consumption, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $checked_btn,$consumed_renewable_energy,$country);

} else {
    $response = null;
}

echo json_encode($response);
