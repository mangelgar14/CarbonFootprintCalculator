<?php 
$table = htmlspecialchars($_POST["table"]);
$idSerware = htmlspecialchars($_POST["idSerware"]);

$num_of_servers = htmlspecialchars($_POST["num_of_servers"]);
$nominal_consumption_known = htmlspecialchars($_POST["nominal_consumption_known"]);
$nominal_consumption = htmlspecialchars($_POST["nominal_consumption"]);
$cpu = htmlspecialchars($_POST["cpu"]);
$software_utilization = htmlspecialchars($_POST["software_utilization"]);
$hours_used = htmlspecialchars($_POST["hours_used"]);
$renewable_energy = htmlspecialchars($_POST["renewable_energy"]);
$renewable_certification=  htmlspecialchars($_POST['renewable_certification']);
$consumed_renewable_energy = htmlspecialchars($_POST["consumed_renewable_energy"]);
$country = htmlspecialchars($_POST["country"]);

$provider = htmlspecialchars($_POST["provider"]);
$region = htmlspecialchars($_POST["region"]);
$vcpu_hours = htmlspecialchars($_POST["vCPU_hours"]);
$vgpu_hours = htmlspecialchars($_POST["vGPU_hours"]);
$tb_hdd = htmlspecialchars($_POST["TB_HDD"]);
$tb_ssd = htmlspecialchars($_POST["TB_SSD"]);
$gb_memory = htmlspecialchars($_POST["GB_memory"]);
$gb_networking = htmlspecialchars($_POST["GB_networking"]);

include_once "../queries.php";
if ($table == "datos_cloud") {
    $response = editCloudFormData( $provider, $region, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, $gb_networking,$idSerware);
} 
else if ($table == "datos_premise") {
  
    echo "$idSerware, $num_of_servers, $nominal_consumption_known, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $renewable_certification,$consumed_renewable_energy,$country";
   
    $response = editPremiseFormData($idSerware, $num_of_servers, $power_consumption_known, $nominal_consumption, $cpu, $software_utilization, $hours_used, $renewable_energy, $renewable_certification,$consumed_renewable_energy,$country);
} else {
    $response = "teehe";
    
}

echo json_encode($response);

?>