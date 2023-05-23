<?php
$table = htmlspecialchars($_POST["table"]);
$id_project = htmlspecialchars($_POST["id_project"]);
$type = htmlspecialchars($_POST["type"]);
$provider = htmlspecialchars($_POST["provider"]);
$location = htmlspecialchars($_POST["location"]);
$energy_consumption = htmlspecialchars($_POST["energy_consumption"]);
$consumption_emissions = htmlspecialchars($_POST["consumption_emissions"]);
$embedded_emissions = htmlspecialchars($_POST["embedded_emissions"]);
$carbon_footprint = htmlspecialchars($_POST["carbon_footprint"]);

include_once "../queries.php";
if ($table == 0) {
    $response = insertServerConfiguration($id_project, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint);
} else if ($table == 1) {
    $response = insertSoftwareConfiguration($id_project, $type, $provider, $location, $energy_consumption, $consumption_emissions, $embedded_emissions, $carbon_footprint);
}else{
    $response = null;
}
echo json_encode($response);
