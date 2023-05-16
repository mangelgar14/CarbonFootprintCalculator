function projects() {
  let versionButton = document.querySelectorAll(".add-version-button");
  let projectButton = document.querySelectorAll(".add-project-button-np");

  let noProjects = document.querySelectorAll(".no-projects");
  projectButton[0].classList.add("add-project-button");
  projectButton[0].classList.remove("add-project-button-np");

  noProjects[0].classList.add("hidden");
  versionButton[0].classList.remove("hidden");
  let listProjects = document.querySelectorAll(".project-field-item");
  listProjects.forEach((listProject) => {
    listProject.classList.remove("hidden");
  });
  hasProjects = true;
}
function noprojects() {
  let listProjects = document.querySelectorAll(".project-field-item");
  let versionButton = document.querySelectorAll(".add-version-button");
  let noProjects = document.querySelectorAll(".no-projects");
  let projectButton = document.querySelectorAll(".add-project-button");

  projectButton[0].classList.add("add-project-button-np");
  projectButton[0].classList.remove("add-project-button");

  noProjects[0].classList.remove("hidden");
  versionButton[0].classList.add("hidden");
  listProjects.forEach((listProject) => {
    listProject.classList.add("hidden");
  });
  hasProjects = false;
}
function editProject(p) {
  newVersion(p);
}
function deleteProject(p) {
  p.querySelectorAll(".p-name")[0].innerHTML;
  let warningPopup = document.getElementById("warning_popup");
  let projectPopup = document.getElementById("project_popup");
  let popup = document.getElementById("popup");

  popup.classList.remove("hidden");
  warningPopup.classList.remove("hidden");
  projectPopup.classList.add("hidden");
}

function configure() {
  alert("configure");
}
function results() {
  alert("results");
}
function newVersion() {
  alert("New version");
}
function newProject() {
  let popup = document.getElementById("popup");
  let projectPopup = document.getElementById("project_popup");
  let warningPopup = document.getElementById("warning_popup");

  document.getElementById("project-name").value = "";
  document.getElementById("client").value = "";
  document.getElementById("description").value = "";

  popup.classList.remove("hidden");
  projectPopup.classList.remove("hidden");
  warningPopup.classList.add("hidden");
}

function newVersion(p) {
  let popup = document.getElementById("popup");
  let projectName = document.getElementById("project-name");
  let client = document.getElementById("client");
  let description = document.getElementById("description");
  let projectPopup = document.getElementById("project_popup");

  projectName.value = p.querySelectorAll(".p-name")[0].innerHTML;
  client.value = p.querySelectorAll(".p-client")[0].innerHTML;

  description.value = p
    .querySelectorAll(".desc")[0]
    .innerHTML.replace(/(?:\r\n|\r|\n|\t|               )/g, "")
    .substring(1);

  popup.classList.remove("hidden");
  projectPopup.classList.remove("hidden");
}
function closePopup() {
  let popup = document.getElementById("popup");
  let projectPopup = document.getElementById("project_popup");
  let warningPopup = document.getElementById("warning_popup");

  popup.classList.add("hidden");
  projectPopup.classList.add("hidden");
  warningPopup.classList.add("hidden");
}
function openCloseCard(){
    let listProjects = document.querySelectorAll(".project-card");
    listProjects.forEach((listProject) => {
      listProject
        .querySelectorAll(".project-card-preview")[0]
        .addEventListener("click", () => {
          if (project != listProject) {
            if (!closed) {
              project
                .querySelectorAll(".project-card-arrow")[0]
                .classList.remove("arrow");
              project
                .querySelectorAll(".project-card-details")[0]
                .classList.toggle("hidden");
            }
            closed = false;
          } else {
            closed = !closed;
          }
          listProject
            .querySelectorAll(".project-card-arrow")[0]
            .classList.toggle("arrow");
          listProject
            .querySelectorAll(".project-card-details")[0]
            .classList.toggle("hidden");
  
          project = listProject;
          console.log(project.querySelectorAll(".p-name")[0].innerHTML);
          addControl(closed);
        });
    });
  }