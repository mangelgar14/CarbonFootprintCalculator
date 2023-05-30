var project = sessionStorage.getItem("project");
dbFetchSerwareConfiguration();

function newHtmlServerConfig(config) {

  $.ajax({
    url: "new_row.php",
    type: "POST",
    data: {
      id: config["id_serware"],
      lastModified: config["lastModified"],
      type: config["type"],
      provider: config["provider"],
      location: config["location"],
      energy_consumption: config["energy_consumption"],
      consumption_emissions: config["consumption_emissions"],
      embedded_emissions: config["embedded_emissions"],
      carbon_footprint: config["carbon_footprint"],
    },
    success: function (result) {
      $("#table_server").append(result);
    },
  });
}
function newHtmlSoftwareConfig(config) {
  $.ajax({
    url: "new_row.php",
    type: "POST",
    data: {
      id: config["id_serware"],
      lastModified: config["lastModified"],
      type: config["type"],
      provider: config["provider"],
      location: config["location"],
      energy_consumption: config["energy_consumption"],
      consumption_emissions: config["consumption_emissions"],
      embedded_emissions: config["embedded_emissions"],
      carbon_footprint: config["carbon_footprint"],
    },
    success: function (result) {
      $("#table_software").append(result);
    },
  });
}
function newHtmlPremisePopup(config) {
  $.ajax({
    url: "form_premise.php",
    type: "POST",
    data: {
      id: config["id"],
      num_of_servers: config["num_of_servers"],
      power_consumption: config["power_consumption"],
      nominal_consumption: config["nominal_consumption"],
      cpu: config["cpu"],
      software_utilization: config["software_utilization"],
      hours_used: config["hours_used"],
      renewable_energy: config["renewable_energy"],
      checked_btn: config["checked_btn"],
      consumed_renewable_energy: config["consumed_renewable_energy"],
      country: config["country"],
      funcion: config["funcion"],
    },
    success: function (result) {
      console.log(result);
      $("body").append(result);
    },
  });
}
function newHtmlCloudPopup(config) {

  $.ajax({
    url: "form_cloud.php",
    type: "POST",
    data: {
      id: config["id"],
      provider: config["provider"],
      region: config["region"],
      vCPU_hours: config["vCPU_hours"],
      consumption_emissions: config["consumption_emissions"],
      vGPU_hours: config["vGPU_hours"],
      software_utilization: config["software_utilization"],
      hours_used: config["hours_used"],
      renewable_energy: config["renewable_energy"],
      checked_btn: config["checked_btn"],
      consumed_renewable_energy: config["consumed_renewable_energy"],
      country: config["country"],
      funcion: config["funcion"],
    },
    success: function (result) {
      console.log(result);
      $("body").append(result);
    },
  });
}
function dbFetchSerwareConfiguration() {
  $.ajax({
    url: "../../../connections/calculator/fetchSerwareConfiguration.php",
    type: "GET",
    data: {
      id_project: project,
    },
    success: function (result) {
      configResult = JSON.parse(result);
      if (configResult.length > 0) {
        configResult.forEach((config) => {
          if (config["serware"] === "Server") {
            newHtmlServerConfig(config);
          } else if (config["serware"] === "Software") {
            newHtmlSoftwareConfig(config);
          } else {
            console.log("Error en el tipo de Serware");
          }
        });
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function dbFetchSerwareConfigurationById(idSerware) {
  $.ajax({
    url: "../../../connections/calculator/fetchSerwareConfigurationById.php",
    type: "GET",
    data: {
      idSerware: idSerware,
    },
    success: function (result) {
      configResult = JSON.parse(result);
      if (configResult.length > 0) {
        // TODO no se si vale pa algo
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function fetchDataByConfigId(idSerware) {
  $.ajax({
    url: "../../../connections/calculator/fetchSerwareConfigurationById.php",
    type: "GET",
    data: {
      idSerware: idSerware,
    },
    success: function (result) {

      var configResult = JSON.parse(result);

      var table = "";
      if (configResult != null) {
        if (configResult["type"] == "Premise") {
          table = "datos_premise";
        } else if (configResult["type"] == "Cloud") {
          table = "datos_cloud";
        }
        console.log(table);
        $.ajax({
          url: "../../../connections/calculator/fetchDataByConfigId.php",
          type: "GET",
          data: {
            idSerware: idSerware,
            table: table,
          },
          success: function (result) {
      
            configResult = JSON.parse(result);
            if (configResult.length > 0) {
              if (table == "datos_premise") {
                newHtmlPremisePopup(result);
              } else if (table == "datos_cloud") {
                newHtmlCloudPopup(result);
              }
            }
          },
          error: function (error) {
            console.log(error);
          },
        });
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function dbInsertConfiguration(
  serware,
  type,
  provider,
  location,
  energy_consumption,
  consumption_emissions,
  embedded_emissions,
  carbon_footprint
) {
  if (serware == 0) {
    serware = "Server";
  } else {
    serware = "Software";
  }

  $.ajax({
    url: "../../../connections/calculator/insertConfiguration.php",
    type: "POST",
    data: {
      serware: serware,
      id_project: project,
      type: type,
      provider: provider,
      location: location,
      energy_consumption: energy_consumption,
      consumption_emissions: consumption_emissions,
      embedded_emissions: embedded_emissions,
      carbon_footprint: carbon_footprint,
    },
    success: function (result) {
      
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function dbEditConfiguration(
  id,
  type,
  provider,
  location,
  energy_consumption,
  consumption_emissions,
  embedded_emissions,
  carbon_footprint
) {
  $.ajax({
    url: "../../../connections/calculator/editConfiguration.php",
    type: "POST",
    data: {
      id: id,
      type: type,
      provider: provider,
      location: location,
      energy_consumption: energy_consumption,
      consumption_emissions: consumption_emissions,
      embedded_emissions: embedded_emissions,
      carbon_footprint: carbon_footprint,
    },
    success: function (result) {
      console.log(result);
    },
  });
}
function dbDeleteConfiguration(id) {
  $.ajax({
    url: "../../../connections/calculator/deleteConfiguration.php",
    type: "POST",
    data: {
      id: id,
    },
    success: function (result) {
      console.log(result);
    },
  });
}
function dbInsertCloudFormData(idSerware, provider, region,vCPU_hours,vGPU_hours,TB_HDD,TB_SSD,GB_memory,GB_networking){
  $.ajax({
    url: "../../../connections/calculator/insertFormData.php",
    type: "POST",
    data: {
      idSerware: idSerware,
      table:"datos_cloud",
      provider: provider,
      region: region,
      vCPU_hours: vCPU_hours,
      vGPU_hours: vGPU_hours,
      TB_HDD: TB_HDD,
      TB_SSD: TB_SSD,
      GB_memory: GB_memory,
      GB_networking: GB_networking,
    },
    success: function (result) {
      console.log(result);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function dbInsertPremiseFormData(idSerware, num_of_servers, power_consumption, nominal_consumption, cpu, software_utilization, hours_used, renewable_energy, checked_btn,consumed_renewable_energy,country){
  $.ajax({
    url: "../../../connections/calculator/insertFormData.php",
    type: "POST",
    data: {
      idSerware: idSerware,
      table:"datos_cloud",
      provider: provider,
      region: region,
      vCPU_hours: vCPU_hours,
      vGPU_hours: vGPU_hours,
      TB_HDD: TB_HDD,
      TB_SSD: TB_SSD,
      GB_memory: GB_memory,
      GB_networking: GB_networking,
    },
    success: function (result) {
      console.log(result);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function calculateCloud(){

}
function calculatePremise(){
  
}
function editButton(id){

  fetchDataByConfigId(id);
}