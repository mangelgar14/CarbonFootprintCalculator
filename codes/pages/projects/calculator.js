var selected_table = 0;

var tab_btns = document.querySelectorAll(
  "#mid #container .div_table .btn_container button"
);
var tab_tables = document.querySelectorAll("#mid #container .div_table .table");

var popup_btns = document.querySelectorAll(
  "#popup #form #popup_btn_container button"
);
var popup_forms = document.querySelectorAll("#popup");

var form_cloud = document.getElementById("form_cloud");
var form_premise = document.getElementById("form_premise");

function show_table(tableIndex) {
  selected_table = tableIndex;
  tab_btns.forEach(function (node) {
    node.style.backgroundColor = "";
    node.style.color = "";
  });
  tab_btns[tableIndex].style.backgroundColor = "#a100ff";
  tab_btns[tableIndex].style.color = "white";

  tab_tables.forEach(function (node) {
    node.style.display = "none";
  });

  tab_tables[tableIndex].style.display = "block";
}

function show_popup(popupIndex) {
  popup_forms.forEach(function (node) {
    node.style.visibility = "visible";
    node.style.display = "none";
  });

  popup_forms[popupIndex].style.display = "grid";
}

function close_popup() {
  popup_forms.forEach(function (node) {
    node.style.visibility = "hidden";
  });
}

// form_cloud.addEventListener('submit', (e) => {
//     e.preventDefault();
//     save_cloud();
// });

// form_premise.addEventListener('submit', (e) => {
//     e.preventDefault();
//     save_premise();
// });

function save_cloud() {
  //LLEVAR LOS DATOS A LA BASE DE DATOS Y HACER LOS CÁLCULOS
  let provider = document.getElementById("provider_cloud").value;
  let region_selector = document.getElementById("combo_cloud");
  let region = region_selector.options[region_selector.selectedIndex].text;
  let answer3 = document.getElementById("cloud_input3").value;
  let answer4 = document.getElementById("cloud_input4").value;
  let answer5 = document.getElementById("cloud_input5").value;
  let answer6 = document.getElementById("cloud_input6").value;
  let answer7 = document.getElementById("cloud_input7").value;
  let answer8 = document.getElementById("cloud_input8").value;
  let valido = true;

  if (answer3 == "") {
    document.getElementById("cloud_input3").classList.add("error");
    valido = false;
  } else if (0 <= answer3 && answer3 > 25) {
    valido = false;
    document.getElementById("cloud_input3").classList.add("error");
  }

  if (answer4 == "") {
    valido = false;
    document.getElementById("cloud_input4").classList.add("error");
  } else if (0 <= answer4 && answer4 > 25) {
    valido = false;
    document.getElementById("cloud_input4").classList.add("error");
  }

  if (answer5 == "") answer5 = 0;
  if (answer6 == "") answer6 = 0;
  if (answer7 == "") answer7 = 0;
  if (answer8 == "") answer8 = 0;

  if (0 > answer5 || answer5 > 25) {
    valido = false;
    document.getElementById("cloud_input5").classList.add("error");
  }
  if (0 > answer6 || answer6 > 25) {
    valido = false;
    document.getElementById("cloud_input6").classList.add("error");
  }
  if (0 > answer7 || answer7 > 25) {
    valido = false;
    document.getElementById("cloud_input7").classList.add("error");
  }
  if (0 > answer8 || answer8 > 25) {
    valido = false;
    document.getElementById("cloud_input8").classList.add("error");
  }
  /* CALCULO DEL CONSUMO ETC */
  var energy_consumption = 999;
  var consumption_emissions = 5041;
  var embedded_emissions = 552;
  var carbon_footprint = 1337;

  /* -------------------------- */

  dbInsertConfiguration(
    selected_table,
    "Cloud",
    provider,
    region,
    energy_consumption,
    consumption_emissions,
    embedded_emissions,
    carbon_footprint
  );

  
  if (valido) {
    return true;
  } else {
    return false;
  }
}

function save_premise() {
  let combo1 = document.getElementById("combo_premise1");
  let power_consumption = combo1.options[combo1.selectedIndex].text;

  let combo2 = document.getElementById("combo_premise2");
  let cpu = combo2.options[combo2.selectedIndex].text;

  let combo3 = document.getElementById("combo_premise3");
  let renewable_energy = combo3.options[combo3.selectedIndex].text;

  let combo4 = document.getElementById("combo_premise3");
  let country = combo4.options[combo4.selectedIndex].text;

  let btns;
  if (document.querySelector("input[name=btn_radio]:checked") != null)
    btns = document.querySelector("input[name=btn_radio]:checked").value;
  else btns = 0;

  let answer1 = document.getElementById("premise_answer1").value;
  let answer2 = document.getElementById("premise_answer2").value;
  let answer3 = document.getElementById("premise_answer3").value;
  let answer4 = document.getElementById("premise_answer4").value;
  let answer5 = document.getElementById("premise_answer5").value;
  let valido = true;

  if (answer1 == "") {
    valido = false;
    document.getElementById("premise_answer1").classList.add("error");
  } else if (0 > answer1) {
    valido = false;
    document.getElementById("premise_answer1").classList.add("error");
  }
  if (answer2 == "") {
    valido = false;
    document.getElementById("premise_answer2").classList.add("error");
  } else if (0 > answer2) {
    valido = false;
    document.getElementById("premise_answer2").classList.add("error");
  }
  if (answer3 == "") {
    valido = false;
    document.getElementById("premise_answer3").classList.add("error");
  } else if (0 > answer3 || answer3 > 100) {
    //Percentage
    valido = false;
    document.getElementById("premise_answer3").classList.add("error");
  }
  if (answer4 == "") {
    valido = false;
    document.getElementById("premise_answer4").classList.add("error");
  } else if (0 > answer4 || answer4 > 24) {
    //hours/day
    valido = false;
    document.getElementById("premise_answer4").classList.add("error");
  }
  if (0 > answer5 || answer5 > 100) {
    //percentage
    valido = false;
    document.getElementById("premise_answer1").classList.add("error");
  }

  /* CALCULO DEL CONSUMO ETC */
  var energy_consumption = 0;
  var consumption_emissions = 9001;
  var embedded_emissions = 9000;
  var carbon_footprint = 110;

  /* -------------------------- */

  dbInsertConfiguration(
    selected_table,
    "Cloud",
    answer1,
    country,
    energy_consumption,
    consumption_emissions,
    embedded_emissions,
    carbon_footprint
  );

  if (valido) return true;
  else return false;
}

show_table(0);
