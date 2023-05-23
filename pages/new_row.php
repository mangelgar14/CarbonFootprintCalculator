<?php
$id = htmlspecialchars($_POST["id"]);
$lastModified = htmlspecialchars($_POST["lastModified"]);
$type = htmlspecialchars($_POST["type"]);
$provider = htmlspecialchars($_POST["provider"]);
$location = htmlspecialchars($_POST["location"]);
$energy_consumption = htmlspecialchars($_POST["energy_consumption"]);
$consumption_emissions = htmlspecialchars($_POST["consumption_emissions"]);
$embedded_emissions = htmlspecialchars($_POST["embedded_emissions"]);
$carbon_footprint = htmlspecialchars($_POST["carbon_footprint"]);

echo "<tr class=\"table_data\">
<td>$lastModified</td>
<td>$type</td>
<td>$provider</td>
<td>$location</td>
<td>$energy_consumption</td>
<td>$consumption_emissions</td>
<td>$embedded_emissions</td>
<td>$carbon_footprint</td>
<td>
    <button onclick=\"edit_row($id)\"><img src=\"../imgs/edit.png\" alt=\"edit icon\"></button>
    <button onclick=\"delete_row($id)\"><img src=\"../imgs/trash.png\" alt=\"delete icon\"></button>
</td>  
</tr>";