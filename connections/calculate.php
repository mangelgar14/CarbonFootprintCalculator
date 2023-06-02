<?php
// CONSUMO ENERGÉTICO (E) //
//-Premise-//
/* 
E = ((número de servidores * (consumo nominal del servidor * porcentaje de utilización en el servidor) * horas de uso al día) * PUE)
*/
function calculatePremiseE($n_servers, $power_consumption_known, $power_consumption, $cpu_sockets, 
$software_utilization, $hours_day, $renewable){

$premise_pue = 1.55;

if(!$power_consumption_known){
    if($cpu_sockets == 1){
        $power_consumption = 0.118;
    }
    else{
        $power_consumption = 0.365;
    }
}

return (($n_servers * ($power_consumption * $software_utilization) * $hours_day) * $premise_pue);
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
    // $gpu_kwh_coeficient_at_0 = 0.02758;
    // $gpu_kwh_coeficient_at_100 = 0.23950;
    
    //sacar estos datos de la bbdd
    $vCPU_coeficient = 0;
    $vGPU_coeficient = 0;
    $HDD_coeficient = 0;
    $SSD_coeficient = 0;
    $memory_coeficient = 0;
    $networking_coeficient = 0;
    $cloud_pue = 0;

    $vCPU_max_kw = 0;
    $vCPU_min_kw = 0;
    $avergare_use = 0;


    if($provider == 'AWS'){
        //sacar los datos de la tabla CoeficientesCloud where provider = 'AWS'
        $vCPU_max_kw = 0;
        $vCPU_min_kw = 0;
        $avergare_use = 0;
    }
    else if($provider == 'GCP'){
        //sacar los datos de la tabla CoeficientesCloud where provider = 'GCP'
        $vCPU_max_kw = 0;
        $vCPU_min_kw = 0;
        $avergare_use = 0;
    }
    else{
        //sacar los datos de la tabla CoeficientesCloud where provider = 'Microsoft Azure'
        $vCPU_max_kw = 0;
        $vCPU_min_kw = 0;
        $avergare_use = 0;
    }

    $vCPU_coeficient = ($vCPU_min_kw + $avergare_use * ($vCPU_max_kw - $vCPU_min_kw));
    $vGPU_coeficient = ($vGPU_min_kw + $avergare_use * ($vGPU_max_kw - $vGPU_min_kw));



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
    $emissions_factors = 0; //TODO DATOS DE LA TABLA
    if($renewable_percentage < 100){
        //$emission_factors = PremiseEmissions where State = location
        return (1 - $renewable_percentage / 100) * $emission_factors;
    }
    else{
        return 0;
    }
}


//-Cloud-//
/* 
I = factor de emisiones del consumo energético según el proveedor y la región
*/
function calculateCloudI($provider, $region){
    $emissions_factors = 0; //TODO DATOS DE LA TABLA

    //sacar el dato C02e de la tabla CloudEmissions igualando el provider 
    if($provider == 'AWS'){

    }
    else if($provider == 'GCP'){

    }
    else{

    }

    return $emission_factors;
}

//-Premise-//
/* 
M = ((E * I) * 0.20) si la I usa 100% de energía renovable se usa el promedio del consumo del país
*/  

function calculatePremiseM($power_consumption, $location, $m, $i){

    if($power_consumption != 100){
        
    }
}