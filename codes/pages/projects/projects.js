
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
    alert("New project")
}