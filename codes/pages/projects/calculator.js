var tab_btns = document.querySelectorAll("#mid #container .div_table .btn_container button");
var tab_tables = document.querySelectorAll("#mid #container .div_table .table");

function show_table(tableIndex){

tab_btns.forEach(function(node){
    node.style.backgroundColor="";
    node.style.color="";
});
tab_btns[tableIndex].style.backgroundColor = "#a100ff";
tab_btns[tableIndex].style.color = "white";

tab_tables.forEach(function(node){
    node.style.display = "none";
});

tab_tables[tableIndex].style.display = "block";
}

show_table(0);