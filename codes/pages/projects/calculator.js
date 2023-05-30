var selected_table = 0;

var tab_btns = document.querySelectorAll(
  "#mid #container .div_table .btn_container button"
);
var tab_tables = document.querySelectorAll("#mid #container .div_table .table");

var popup_btns = document.querySelectorAll(
  "#popup #form #popup_btn_container button"
);
var popup_forms = document.querySelectorAll(".popup");
var popup_inputs = document.querySelectorAll("input[type=text]");

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

function show_popup(popupIndex, edit) {
  if(popupIndex == 5){
    popup_forms[popupIndex].style.visibility = "visible";
  }
  else{
  popup_forms.forEach(function (node) {
    node.style.visibility = "visible";
    node.style.display = "none";
  });
  }

  if(!edit){
    popup_forms[popupIndex].style.display = "grid";
  }else{
    popupIndex = 1;
    //RECOGER AQUI LOS DATOS y asginarlos a los inputs
    popup_forms[popupIndex].style.display = "grid";
  }
}


function close_popup() {
  popup_forms.forEach(function (node) {
    node.style.visibility = "hidden";
  });

  popup_inputs.forEach(function(node){
      aux = document.getElementById(node.id);
        if(aux.className == "error"){
          reset(aux.id);
        }    
  });
}

function close_invalid_data(popupIndex){
  popup_forms[popupIndex].style.visibility = "hidden";
}

form_cloud.addEventListener('submit', (e) => {
    e.preventDefault();
});

form_cloud.addEventListener('click', (e) => {
  if(e.target.className == 'error'){
    reset(e.target.id);
  }
}); 

form_premise.addEventListener('submit', (e) => {
    e.preventDefault();
});

form_premise.addEventListener('click', (e) => {
  if(e.target.className == 'error'){
    reset(e.target.id);
  }
});

function reset(element){
  var aux = document.getElementById(element);
  if(aux.classList.contains('error')){
    aux.classList.remove('error');
  }
}

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



  
  if (valido) {
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
   close_popup();
  } else {
    show_popup(5);
  }
}

//CONTROL DE LAS PREGUNTAS 2, 3 y 4
document.querySelector("#combo_premise1").addEventListener("change", function(){
  if(this.value == "no"){
    document.getElementById("premise_answer2").disabled = true;
    document.getElementById("combo_premise2").disabled = false;
  }
  else{
    document.getElementById("premise_answer2").disabled = false;
    document.getElementById("combo_premise2").disabled = true;
  }
})

//CONTROL DE LAS PREGUNTAS 7, 8 y 9
document.querySelector("#combo_premise3").addEventListener("change", function(){
  if(this.value == "no"){
    
    document.getElementById("premise_answer5").disabled = true;
    document.getElementById("combo_premise2").disabled = true;
  }
  else{
    document.getElementById("premise_answer5").disabled = false;
    document.getElementById("combo_premise2").disabled = false;
  }
})

function save_premise() {
  let num_of_servers = document.getElementById("premise_answer1").value;
  let nominal_consumption = document.getElementById("premise_answer2").value;
  let software_utilization = document.getElementById("premise_answer3").value;
  let hours_used = document.getElementById("premise_answer4").value;
  let consumed_renewable_energy = document.getElementById("premise_answer5").value;
  let cpu = "";

  let combo1 = document.getElementById("combo_premise1");
  let power_consumption = combo1.options[combo1.selectedIndex].text;

  let combo2 = document.getElementById("combo_premise2");

  let combo3 = document.getElementById("combo_premise3");
  let renewable_energy = combo3.options[combo3.selectedIndex].text;

  let combo4 = document.getElementById("combo_premise3");
  let country = combo4.options[combo4.selectedIndex].text;

  let btns;
  if (document.querySelector("input[name=btn_radio]:checked") != null)
    btns = document.querySelector("input[name=btn_radio]:checked").value;
  else btns = 0;

 
  let valido = true;

  /* ------------Pregunta 1 */
  if (num_of_servers == "") {
    valido = false;
    document.getElementById("premise_answer1").classList.add("error");
  } else if (0 > num_of_servers) {
    valido = false;
    document.getElementById("premise_answer1").classList.add("error");
  }

  /* ------------Pregunta 2 */
  if(power_consumption == "Yes"){
      /* ------------Pregunta 3 */
    if (nominal_consumption == "" || 0 > nominal_consumption) {
      valido = false;
      document.getElementById("premise_answer2").classList.add("error");
    }
      /* ------------Pregunta 4 */
  }else{
    cpu = combo2.value;
  }

   /* ------------Pregunta 5 */
  if (software_utilization == "" || (0 > software_utilization || software_utilization > 100)) {
    valido = false;
    document.getElementById("premise_answer3").classList.add("error");
  } //  else if (0 > software_utilization || software_utilization > 100) {     //Percentage
  //   valido = false;
  //   document.getElementById("premise_answer3").classList.add("error");
  // }
  /* ------------Pregunta 6 */
  if (hours_used == "" || (1 > hours_used || hours_used > 24)) {
    valido = false;
    document.getElementById("premise_answer4").classList.add("error");
  } //  else if (1 > hours_used || hours_used > 24) {
  //   valido = false;
  //   document.getElementById("premise_answer4").classList.add("error");
  // }
  /* ------------Pregunta 7 */
  if (0 > consumed_renewable_energy || consumed_renewable_energy > 100) { //percentage
    valido = false;
    document.getElementById("premise_answer5").classList.add("error");
  }

  /* CALCULO DEL CONSUMO ETC */
  var energy_consumption = 0;
  var consumption_emissions = 9001;
  var embedded_emissions = 9000;
  var carbon_footprint = 110;

  /* -------------------------- */

  

  if (valido){
    dbInsertConfiguration(
      selected_table,
      "Premise",
      num_of_servers,
      country,
      energy_consumption,
      consumption_emissions,
      embedded_emissions,
      carbon_footprint
    );
    location.reload()
    close_popup();  
  }
  else 
    show_popup(5);
}


show_table(0);
