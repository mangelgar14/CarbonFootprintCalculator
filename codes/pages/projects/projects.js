var hasProjects = false;
var project = null;
var closed = true;
window.onload = loader();
function loader() {
  document
    .getElementById("add_version_button")
    .addEventListener("click", () => {
      newVersion(project);
    });
  document
    .getElementById("btn_delete")
    .addEventListener("click", () => dbDeleteProject(project));
  reset();

  /* Abrir Cerrar projectos */
  /* Hover boton blanco -> flecha blanca */
  let whiteButtons = document.querySelectorAll(".button-with-image");
  whiteButtons.forEach((button) => {
    hoverWhiteArrow(button);
  });
  /* Add new project Button */
}
function reset() {
  /* Clear projects */
  let htmlProjects = document
    .getElementById("projects-field")
    .querySelectorAll(".project-field-item");
  htmlProjects.forEach((project) => {
    project.remove();
  });
  fetchProjects();
  project = null;
  closed = true;

}
function newHtmlProject(project) {
  $.ajax({
    url: "new-project.php",
    type: "POST",
    data: {
      id: project["id"],
      projectName: project["name"],
      client: project["client"],
      description: project["description"],
      lastModified: project["lastModified"],
    },
    success: function (result) {
      $("#projects-field").append(result);
      let listProjects = document
        .getElementById("projects-field")
        .getElementsByClassName("new-project-field-item");
      for (const project of listProjects) {
        configureNewProject(project);
      }
      closePopup();
    },
  });
}
function configureNewProject(newProjectItem) {
  newProjectItem.classList.add("project-field-item");
  newProjectItem.classList.remove("new-project-field-item");

  /* project card configuration */
  let card = newProjectItem.querySelector(".new-project-card");
  openClose(card);
  card.classList.add("project-card");
  card.classList.remove("new-project-card");

  /* Configure & results configuration */
  let buttons = newProjectItem
    .querySelector(".project-card-buttons")
    .querySelectorAll("button");
  buttons[0].addEventListener("click", () => configure());
  buttons[1].addEventListener("click", () => results());
  hoverWhiteArrow(buttons[1]);
}
function addProjectControl(closed) {
  if (closed) {
    document.getElementById("add_version_button").disabled = true;
    document.getElementById("add_project_button").disabled = false;
  } else {
    document.getElementById("add_version_button").disabled = false;
    document.getElementById("add_project_button").disabled = true;
  }
}

function openClose(listProject) {
  listProject
    .querySelector(".project-card-preview")
    .addEventListener("click", () => {

      if (project != listProject.parentNode.id) {
        if (!closed) {
          document
            .getElementById(project)
            .querySelectorAll(".project-card-arrow")[0]
            .classList.remove("arrow");
          document
            .getElementById(project)
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

      addProjectControl(closed);
      project = listProject.parentNode.id;
    });
}
function hoverWhiteArrow(button) {
  button.addEventListener("mouseover", () => {
    button.querySelector("img").src = "../imgs/arrow_right_white.svg";
  });
  button.addEventListener("mouseout", () => {
    button.querySelector("img").src = "../imgs/arrow_right.svg";
  });
}
function fetchProjects() {
  $.ajax({
    url: "../../../connections/fetchProjects.php",
    type: "GET",
    success: function (result) {
      
      projects = JSON.parse(result);
      projects.forEach((project) => {
        newHtmlProject(project);
      });
      try{projects()}catch(e){}
      openCloseCards();
    },
    error: function (error) {
      noprojects();
    },
  });
}
function fetchProject(idProject) {
  $.ajax({
    url: "../../../connections/fetchProjectById.php",
    type: "POST",
    data: {
      idProject: idProject,
    },
    success: function (result) {
      let project = JSON.parse(result);
      document.getElementById("project-name").value = project["name"];
      document.getElementById("client").value = project["client"];
      document.getElementById("description").value = project["description"];
      showProjectPopup();
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function insertProject(name, client, description) {
  $.ajax({
    url: "../../../connections/insertProject.php",
    type: "POST",
    data: {
      projectName: name,
      client: client,
      description: description,
    },
    success: function (result) {
      reset();
      addProjectControl(closed);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function dbEditProject(idProject, name, client, description) {
  $.ajax({
    url: "../../../connections/editProject.php",
    type: "POST",
    data: {
      idProject: idProject,
      projectName: name,
      client: client,
      description: description,
    },
    success: function (result) {
      reset();
    },
  });
}
function dbDeleteProject(idProject) {
  $.ajax({
    url: "../../../connections/deleteProject.php",
    type: "POST",
    data: {
      idProject: idProject,
    },
    success: function (result) {
      reset();
      addProjectControl(closed);
    },
  });
}
function closePopup() {
  let popup = document.getElementById("popup");
  let projectPopup = document.getElementById("project_popup");
  let warningPopup = document.getElementById("warning_popup");

  popup.classList.add("hidden");
  projectPopup.classList.add("hidden");
  warningPopup.classList.add("hidden");
}
function configure() {
  alert("configure");
}

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
function editProject(idProject) {
  console.log("id:" + idProject);

  fetchProject(idProject);

  let newProjectButton = document.getElementById("save-project-button");
  newProjectButton.replaceWith(newProjectButton.cloneNode(true));
  newProjectButton = document.getElementById("save-project-button");
  newProjectButton.addEventListener("click", () =>
    saveEditProjectButton(idProject)
  );
}
function deleteProject() {
  showWarningPopup(project);
}
function newProject() {
  let newProjectButton = document.getElementById("save-project-button");
  newProjectButton.replaceWith(newProjectButton.cloneNode(true));
  newProjectButton = document.getElementById("save-project-button");
  newProjectButton.addEventListener("click", () => saveProjectButton());
  showProjectPopup();
}
function newVersion(p) {
  fetchProject(p);

  showProjectPopup();
}

function results() {
  alert("results");
}

function saveProjectButton() {
  let pName = document.getElementById("project-name").value;
  let cli = document.getElementById("client").value;
  let desc = document.getElementById("description").value;

  insertProject(pName, cli, desc);
  closePopup();
  document.getElementById("project-name").value = "";
  document.getElementById("client").value = "";
  document.getElementById("description").value = "";
}
function saveEditProjectButton(idProject) {
  let pName = document.getElementById("project-name").value;
  let cli = document.getElementById("client").value;
  let desc = document.getElementById("description").value;

  dbEditProject(idProject, pName, cli, desc);
  closePopup();
  document.getElementById("project-name").value = "";
  document.getElementById("client").value = "";
  document.getElementById("description").value = "";
}

function openCloseCards() {
  let listProjects = document.querySelectorAll(".project-field-item");
  listProjects.forEach((listProject) => {
    openClose(listProject);
  });
}
function showWarningPopup(idProject) {
  let warningPopup = document.getElementById("warning_popup");
  let projectPopup = document.getElementById("project_popup");
  let popup = document.getElementById("popup");

  popup.classList.remove("hidden");
  warningPopup.classList.remove("hidden");
  projectPopup.classList.add("hidden");
}
function showProjectPopup() {
  let popup = document.getElementById("popup");
  let projectPopup = document.getElementById("project_popup");
  let warningPopup = document.getElementById("warning_popup");

  popup.classList.remove("hidden");
  projectPopup.classList.remove("hidden");
  warningPopup.classList.add("hidden");
}
