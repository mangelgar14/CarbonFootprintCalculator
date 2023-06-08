<?php

$calculate = htmlspecialchars($_POST["calculate"]);

$n_servers = htmlspecialchars($_POST["n_servers"]);
$power_consumption_known = htmlspecialchars($_POST["power_consumption_known"]);
$power_consumption = htmlspecialchars($_POST["power_consumption"]);
$cpu = htmlspecialchars($_POST["cpu"]);
$software_utilization = htmlspecialchars($_POST["software_utilization"]);
$hours_day = htmlspecialchars($_POST["hours_used"]);
$renewable_energy = htmlspecialchars($_POST["renewable_energy"]);
$renewable_certification=  htmlspecialchars($_POST['renewable_certification']);
$consumed_renewable_energy = htmlspecialchars($_POST["consumed_renewable_energy"]);
$country = htmlspecialchars($_POST["country"]);

$provider = htmlspecialchars($_POST["provider"]);
$region = htmlspecialchars($_POST["region"]);
$vcpu_hours = htmlspecialchars($_POST["vcpu_hours"]);
$vgpu_hours = htmlspecialchars($_POST["vgpu_hours"]);
$tb_hdd = htmlspecialchars($_POST["tb_hdd"]);
$tb_ssd = htmlspecialchars($_POST["tb_ssd"]);
$gb_memory = htmlspecialchars($_POST["gb_memory"]);
$gb_networking = htmlspecialchars($_POST["gb_networking"]);

include "queries.php";

if($calculate == "premise"){
    $premiseE = calculatePremiseE($n_servers, $power_consumption_known, $power_consumption, $cpu,
    $software_utilization, $hours_day);

    $premiseI = calculatePremiseI($consumed_renewable_energy, $country);

    $premiseM = calculatePremiseM($power_consumption, $country, $premiseE, $premiseI);

    $carbon_footprint = $premiseE * $premiseI + $premiseM;

    $carbon_footprint_year = $carbon_footprint * 365 /1000000;

    $data = array("energy_consumption" => $premiseE,
    "consumption_emissions" => $premiseI,
    "embedded_emissions" => $premiseM,
    "carbon_footprint" => $carbon_footprint,
    "carbon_footprint_year" => $carbon_footprint_year);

    echo json_encode($data);
}
else if($calculate == "cloud"){
    $cloudE = calculateCloudE($provider, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, 
    $gb_networking);

    $cloudI = fetchCO2eFromCloudEmissions($region)["CO2e"];

    $cloudM = calculateCloudM($cloudE, $cloudI);

    $carbon_footprint = $cloudE * $cloudI + $cloudM;

    $carbon_footprint_year = $carbon_footprint * 365 / 1000000;

    $data = array("energy_consumption" => $cloudE,
    "consumption_emissions" => $cloudI,
    "embedded_emissions" => $cloudM,
    "carbon_footprint" => $carbon_footprint,
    "carbon_footprint_year" => $carbon_footprint_year);

    echo json_encode($data);
}

// CONSUMO ENERGÉTICO (E) //
//-Premise-//
/* 
E = ((número de servidores * (consumo nominal del servidor * porcentaje de utilización en el servidor) * horas de uso al día) * PUE)
*/
function calculatePremiseE($n_servers, $power_consumption_known, $power_consumption, $cpu, 
$software_utilization, $hours_day){

$premise_pue = 1.55;

if(!$power_consumption_known){
    if($cpu == 1){
        $power_consumption = 0.118;
    }
    else if($cpu == 2){
        $power_consumption = 0.365;
    }
}

return (($n_servers * ($power_consumption * $software_utilization/100) * $hours_day) * $premise_pue);
}
//-Cloud-//
/*
E= (((coeficiente de kWh de vCPU * horas de vCPU al día) + 
    (coeficiente de kWh de vGPU * horas de GPU al día) + 
    (coeficiente kWh/TB de almacenamiento HDD * TB de almacenamiento HDD usados al día) + 
    (coeficiente kWh/TB de almacenamiento SSD * TB de almacenamiento SSD usados al día) + 
    (coeficiente de kWh/GB de memoria * GB de memoria usados al día) + 
    (coeficiente de kWh/GB de networking * GB de networking usados al día)) * PUE)

    

    coeficiente de kWh de vCPU = (KVatios mínimos promedio de vCPU + utilización media de vCPU * (KVatios máximos promedio de vCPU - KVatios mínimos promedio de vCPU))
    coeficiente de kWh de vGPU = (KVatios mínimos promedio de vGPU + utilización media de vGPU * (KVatios máximos promedio de vGPU- KVatios mínimos promedio de vGPU))
*/

function calculateCloudE($provider, $vcpu_hours, $vgpu_hours, $tb_hdd, $tb_ssd, $gb_memory, $gb_networking){
    
    $data = fetchFromCoeficientesCloud($provider);
    $vCPU_min_kw = $data["kvatios_min_cpu"];
    $vCPU_max_kw = $data["kvatios_max_cpu"];
    $vGPU_min_kw = $data["kvatios_min_gpu"];
    $vGPU_max_kw = $data["kvatios_max_gpu"];
    $avergare_use = $data["utilizacion_media"];

    $HDD_coeficient = $data["coeficiente_hdd"];
    $SSD_coeficient = $data["coeficiente_ssd"];
    $memory_coeficient = $data["coeficiente_memoria"];
    $networking_coeficient = $data["coeficiente_networking"];
    $cloud_pue = $data["pue"];
    

    $vCPU_coeficient = ($vCPU_min_kw + $avergare_use) * ($vCPU_max_kw - $vCPU_min_kw);
    $vGPU_coeficient = ($vGPU_min_kw + $avergare_use) * ($vGPU_max_kw - $vGPU_min_kw);


    return ((($vCPU_coeficient * $vcpu_hours) + ($vGPU_coeficient * $vgpu_hours) + 
    ($HDD_coeficient * $tb_hdd) + ($SSD_coeficient * $tb_ssd) + ($memory_coeficient * $gb_memory) +
    ($networking_coeficient * $gb_networking)) * $cloud_pue);
}

// EMISIONES DEL CONSUMO (I) //
//-Premise-//
/*
Si se consume un 100% de energía renovable:
I=0
Si se consume menos de un 100% de energía renovable:
I = (1 - porcentaje de energía renovable consumida) * (factor de emisiones del consumo energético según el país)
*/

function calculatePremiseI($renewable_percentage, $location){
    $data = fetchFromPremiseEmissions($location);
    $emissions_factors = $data["Emissions"];
    if($renewable_percentage > 0){
        return (1 - $renewable_percentage / 100) * $emissions_factors;
    }
    else{
        return 0;
    }
}

//-Cloud-//
/* 
I = factor de emisiones del consumo energético según el proveedor y la región
*/


//EL CO2e.


//-Premise-//
/* 
M = ((E * I) * 0.20) si la I usa 100% de energía renovable se usa el promedio del consumo del país
*/  

function calculatePremiseM($power_consumption, $location, $e, $i){
    $m = 0;

    if($power_consumption != 100){
        $m = (($e * $i) * 0.20);
    }
    else{
        $average_country_consumption = fetchFromPremiseEmissions($location)["Emissions"];
        $m = (($e * $average_country_consumption) * 0.20);
    }

    return $m;
}

//-Cloud-//
/* 
M = ((E * I) * 0.20)
*/  

function calculateCloudM($e, $i){
    return ($e * $i) * 0.20;
}
