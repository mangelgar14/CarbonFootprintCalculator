<?php
// CONSUMO ENERGÉTICO (E) //
//-Premise-//
/* 
E = ((número de servidores * (consumo nominal del servidor * porcentaje de utilización en el servidor) * horas de uso al día) * PUE)
*/
$premise_pue = 1.55;
$cpu_consumption_at_100 = 0.118;

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

$gpu_kwh_coeficient_at_0 = 0.02758;
$gpu_kwh_coeficient_at_100 = 0.23950;


// EMISIONES DEL CONSUMO (I) //
//-Premise-//
/*
Si se consume un 100% de energía renovable:
I=0
Si se consume menos de un 100% de energía renovable:
I = (1 - porcentaje de energía renovable consumida) * (factor de emisiones del consumo energético según el país)
*/
$renewable_percent = 0;  // TODO PASAR COMO PARÁMETRO
$emissions_factors =0; //TODO DATOS DE LA TABLA

//-Cloud-//
/* 
I = factor de emisiones del consumo energético según el proveedor y la región
*/
$emissions_factors =0; //TODO DATOS DE LA TABLA