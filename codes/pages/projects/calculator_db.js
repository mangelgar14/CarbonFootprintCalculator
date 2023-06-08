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
        console.log(configResult);
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

  // Primero consultar la configuración en la base de datos para saber en qué tabla de datos hay que buscar
  $.ajax({
    url: "../../../connections/calculator/fetchSerwareConfigurationById.php",
    type: "GET",
    data: {
      idSerware: idSerware,
    },
    success: function (result) {
      var configResult = JSON.parse(result);
      console.log(configResult);
      var table = "";
     
      if (configResult != null) {
        if (configResult["type"] == "Premise") {
          table = "datos_premise";
        } else if (configResult["type"] == "Cloud") {
          table = "datos_cloud";
        }

        $.ajax({
          url: "../../../connections/calculator/fetchDataByConfigId.php",
          type: "GET",
          data: {
            idSerware: idSerware,
            table: table,
          },
          success: function (result) {
            configResult = JSON.parse(result);
            
            if (configResult) {
              
              if (table == "datos_premise") {
                show_popup(1, configResult);
              } else if (table == "datos_cloud") {
                show_popup(2, configResult);
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
  carbon_footprint,
  dataObject
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
      if (type == "Premise") {
        dbInsertPremiseFormData(dataObject, result.replaceAll('"', ""));
      } else if (type == "Cloud") {
        dbInsertCloudFormData(dataObject, result.replaceAll('"', ""));
      }
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
  carbon_footprint,
  dataObject
) {
  $.ajax({
    url: "../../../connections/calculator/editConfiguration.php",
    type: "POST",
    data: {
      id: id,
      provider: provider,
      location: location,
      energy_consumption: energy_consumption,
      consumption_emissions: consumption_emissions,
      embedded_emissions: embedded_emissions,
      carbon_footprint: carbon_footprint,
    },
    success: function (result) {
      if (type == "Premise") {
        dbEditPremiseFormData(dataObject, id);
      } else if (type == "Cloud") {
        dbEditCloudFormData(dataObject, id);
      }
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
      location.reload();
    },
  });
}
function dbInsertCloudFormData(dataObject, idSerware) {
  console.log(idSerware);
  $.ajax({
    url: "../../../connections/calculator/insertFormData.php",
    type: "POST",
    data: {
      idSerware: idSerware,
      table: "datos_cloud",
      provider: dataObject["provider"],
      region: dataObject["region"],
      vCPU_hours: dataObject["cpu_hours"],
      vGPU_hours: dataObject["gpu_hours"],
      TB_HDD: dataObject["tb_hdd"],
      TB_SSD: dataObject["tb_sdd"],
      GB_memory: dataObject["gb_memory"],
      GB_networking: dataObject["gb_networking"],
    },

    success: function (result) {
      location.reload();
    },
    error: function (err) {
      console.log("Error insertando FORM DATA");
    },
  });
}
function dbInsertPremiseFormData(dataObject, idSerware) {


  $.ajax({
    url: "../../../connections/calculator/insertFormData.php",
    type: "POST",
    data: {
      idSerware: idSerware,
      table: "datos_premise",
      num_of_servers: dataObject["num_of_servers"],
      nominal_consumption_known: dataObject["nominal_consumption_known"],
      nominal_consumption: dataObject["nominal_consumption"],
      cpu: dataObject["cpu"],
      software_utilization: dataObject["software_utilization"],
      hours_used: dataObject["hours_used"],
      renewable_energy: dataObject["renewable_energy"],
      renewable_certification: dataObject["renewable_certification"],
      consumed_renewable_energy: dataObject["consumed_renewable_energy"],
      country: dataObject["country"],
      funcion: dataObject["funcion"],
    },
    success: function (result) {
      location.reload();
    },
    error: function (err) {
      dbDeleteConfiguration(idSerware);
      alert("Error del formulario");
    },
  });
}
function dbEditCloudFormData(dataObject, idSerware) {
  $.ajax({
    url: "../../../connections/calculator/editFormData.php",
    type: "POST",
    data: {
      idSerware: idSerware,
      table: "datos_cloud",
      provider: dataObject["provider"],
      region: dataObject["region"],
      vCPU_hours: dataObject["cpu_hours"],
      vGPU_hours: dataObject["gpu_hours"],
      TB_HDD: dataObject["tb_hdd"],
      TB_SSD: dataObject["tb_sdd"],
      GB_memory: dataObject["gb_memory"],
      GB_networking: dataObject["gb_networking"],
    },

    success: function (result) {
      location.reload();
    },
    error: function (err) {
      console.log("Error editing form");
    },
  });
}
function dbEditPremiseFormData(dataObject, idSerware) {
  console.log(idSerware);
  $.ajax({
    url: "../../../connections/calculator/editFormData.php",
    type: "POST",
    data: {
      idSerware: idSerware,
      table: "datos_premise",
      num_of_servers: dataObject["num_of_servers"],
      nominal_consumption_known: dataObject["nominal_consumption_known"],
      nominal_consumption: dataObject["nominal_consumption"],
      cpu: dataObject["cpu"],
      software_utilization: dataObject["software_utilization"],
      hours_used: dataObject["hours_used"],
      renewable_energy: dataObject["renewable_energy"],
      renewable_certification: dataObject["renewable_certification"],
      consumed_renewable_energy: dataObject["consumed_renewable_energy"],
      country: dataObject["country"],
      funcion: dataObject["funcion"],
    },
    success: function (result) {
      location.reload();
    },
    error: function (err) {
      dbDeleteConfiguration(idSerware);
      console.log("Error editing form");
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
      location.reload();
    },
  });
}
function dbDeleteFormData(idSerware) {
  $.ajax({
    url: "../../../connections/calculator/deleteFormData.php",
    type: "POST",
    data: {
      idSerware: idSerware,
    },
    success: function (result) {
      location.reload();
    },
  });
}
function calculatePremise(data, edit, selected_table, n_servers, power_consumption_known, power_consumption, cpu, 
  software_utilization, hours_used, isRenewable, btns, consumed_renewable_energy, country) {
  $.ajax({
    url: "../../../connections/calculate.php",
    type: "POST",
    data: {
      calculate: "premise",
      n_servers: n_servers,
      power_consumption_known: power_consumption_known,
      power_consumption: power_consumption,
      cpu: cpu,
      software_utilization: software_utilization,
      hours_used: hours_used,
      country: country,
    },
    success: function (result) { 
      var configResult = JSON.parse(result);
      var energy_consumption = configResult["energy_consumption"];
      var consumption_emissions = configResult["consumption_emissions"];
      var embedded_emissions = configResult["embedded_emissions"];
      var carbon_footprint = configResult["carbon_footprint"];

      var dataObject = {
        type: "Premise",
        num_of_servers: n_servers,
        nominal_consumption_known: power_consumption_known,
        nominal_consumption: power_consumption,
        cpu: cpu,
        software_utilization: software_utilization,
        hours_used: hours_used,
        renewable_energy: isRenewable,
        renewable_certification: btns,
        consumed_renewable_energy: consumed_renewable_energy,
        country: country,
      };
      if (!edit) {
        dbInsertConfiguration(
          selected_table,
          "Premise",
          n_servers,
          country,
          energy_consumption,
          consumption_emissions,
          embedded_emissions,
          carbon_footprint,
          dataObject
        );
      } else {
        dbEditConfiguration(
          data["id_serware"],
          "Premise",
          n_servers,
          country,
          energy_consumption,
          consumption_emissions,
          embedded_emissions,
          carbon_footprint,
          dataObject
        );
      }
  
      close_popup();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function calculateCloud(data, edit, provider, region, vcpu_hours, vgpu_hours, tb_hdd, tb_ssd, 
  gb_memory, gb_networking, edit, selected_table) {
  $.ajax({
    url: "../../../connections/calculate.php",
    type: "POST",
    data: {
      calculate: "cloud",
      provider: provider,
      region: region,
      vcpu_hours: vcpu_hours,
      vgpu_hours: vgpu_hours,
      tb_hdd: tb_hdd,
      tb_ssd: tb_ssd,
      gb_memory: gb_memory,
      gb_networking: gb_networking,
    },
    success: function (result) {
      var configResult = JSON.parse(result);
      var energy_consumption = configResult["energy_consumption"];
      var consumption_emissions = configResult["consumption_emissions"];
      var embedded_emissions = configResult["embedded_emissions"];
      var carbon_footprint = configResult["carbon_footprint"];

      var dataObject = {
        type: "Cloud",
        provider: provider,
        region: region, // TODO sacar de db
        cpu_hours: vcpu_hours,
        gpu_hours: vgpu_hours,
        tb_hdd: tb_hdd,
        tb_sdd: tb_ssd,
        gb_memory: gb_memory,
        gb_networking: gb_networking,
      };
      if (!edit) {
        dbInsertConfiguration(
          selected_table,
          "Cloud",
          provider,
          region,
          energy_consumption,
          consumption_emissions,
          embedded_emissions,
          carbon_footprint,
          dataObject
        );
      } else {
        dbEditConfiguration(
          data["id_serware"],
          "Cloud",
          provider,
          region,
          energy_consumption,
          consumption_emissions,
          embedded_emissions,
          carbon_footprint,
          dataObject
        );
      }
      close_popup();
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function editButton(id) {
  fetchDataByConfigId(id);
}
function removeEditPopup(idComponente) {
  document.getElementById(idComponente).remove();
  close_popup();
}
