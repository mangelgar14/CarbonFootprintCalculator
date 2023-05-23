var project = sessionStorage.getItem("project");
dbFetchServerConfiguration();
dbFetchSoftwareConfiguration();

function newHtmlServerConfig(config) {
  $.ajax({
    url: "new_row.php",
    type: "POST",
    data: {
      id: config["id_server"],
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
        console.log(result);
      $("#table_server").append(result);
    },
  });
}
function newHtmlSoftwareConfig(config) {
  $.ajax({
    url: "new_row.php",
    type: "POST",
    data: {
      id: config["id_software"],
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
function dbFetchServerConfiguration() {
  $.ajax({
    url: "../../../connections/calculator/fetchServerConfiguration.php",
    type: "POST",
    data: {
      id_project: project,
    },
    success: function (result) {
      configResult = JSON.parse(result);
      console.log(configResult);
      if (configResult.length > 0) {
        configResult.forEach((config) => {
          newHtmlServerConfig(config);
        });
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function dbFetchSoftwareConfiguration() {
  $.ajax({
    url: "../../../connections/calculator/fetchSoftwareConfiguration.php",
    type: "POST",
    data: {
      id_software: project,
    },
    success: function (result) {
      configResult = JSON.parse(result);
      if (configResult.length > 0) {
        configResult.forEach((config) => {
          newHtmlSoftwareConfig(config);
        });
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function dbInsertConfiguration(
  table,
  type,
  provider,
  location,
  energy_consumption,
  consumption_emissions,
  embedded_emissions,
  carbon_footprint
) {
  $.ajax({
    url: "../../../connections/calculator/insertConfiguration.php",
    type: "POST",
    data: {
      table: table,
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
     console.log(result)
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function dbEditProject(
  table,
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
    url: "../../../connections/calculation/editConfiguration.php",
    type: "POST",
    data: {
      table: table,
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
    url: "../../../connections/projects/deleteConfiguration.php",
    type: "POST",
    data: {
      id: id,
    },
    success: function (result) {
      console.log(result);
    },
  });
}
