
function projects() {
    let versionButton = document.querySelectorAll('.add-version-button');
    let projectButton = document.querySelectorAll('.add-project-button-np');

    let noProjects = document.querySelectorAll('.no-projects');
    projectButton[0].classList.add('add-project-button');
    projectButton[0].classList.remove('add-project-button-np');

    noProjects[0].classList.add('hidden');
    versionButton[0].classList.remove('hidden');
    let listProjects = document.querySelectorAll('.project-field-item');
    listProjects.forEach(listProject => {
        listProject.classList.remove('hidden');
    })
}
function noprojects() {
    let listProjects = document.querySelectorAll('.project-field-item');
    let versionButton = document.querySelectorAll('.add-version-button');
    let noProjects = document.querySelectorAll('.no-projects');
    let projectButton = document.querySelectorAll('.add-project-button');
    
    projectButton[0].classList.add('add-project-button-np');
    projectButton[0].classList.remove('add-project-button');

    noProjects[0].classList.remove('hidden');
    versionButton[0].classList.add('hidden');
    listProjects.forEach(listProject => {
        listProject.classList.add('hidden');
    })
}
function editProject(p){
    alert(p);
}
function deleteProject(p){

}

function configure(){
alert("configure")
}
function results(){
    alert("results")
}
function newVersion(){
    alert("New version")
}
function newProject(){
    let popup = document.getElementById("popup");
    document.getElementById('project-name').value="";
    document.getElementById('client').value="";
    document.getElementById('description').value="";
    popup.style.visibility = "visible";

}function newVersion(p){
    let popup = document.getElementById("popup");
    let projectName = document.getElementById('project-name');
    let client = document.getElementById('client')
    let description = document.getElementById('description');

    projectName.value=p.querySelectorAll('.p1')[0].innerHTML;
    client.value=p.querySelectorAll('.p2')[0].innerHTML;
    
    description.value=p.querySelectorAll('.desc')[0].innerHTML.replace(/(?:\r\n|\r|\n|\t|               )/g, '').substring(1);

    popup.style.visibility = "visible";
}
function closePopup(){
    let popup = document.getElementById("popup");
    popup.style.visibility = "hidden";
}


