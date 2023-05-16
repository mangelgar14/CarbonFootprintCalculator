

let hasProjects = false;
let project = null;
let closed = true;
window.onload = loader();
function loader() {
  fetchProjects();

  let addVersionButton = document.getElementById("add_version_button");
  addVersionButton.addEventListener("click", () => {
    newVersion(project);
  });

  /* Abrir Cerrar projectos */
  let listProjects = document.querySelectorAll(".project-card");
  listProjects.forEach((listProject) => {
    openClose(listProject);
  });
  /* Edit delete */
  let editButtons = document.querySelectorAll(".edit-project");
  let deleteButtons = document.querySelectorAll(".delete-project");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", () => {
      if (project != null) editProject(project);
    });
  });
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      if (project != null) deleteProject(project);
    });
  });
  /* Hover boton blanco -> flecha blanca */
  let whiteButtons = document.querySelectorAll(".button-with-image");
  whiteButtons.forEach((button) => {
    hoverWhiteArrow(button);
  });
  /* Add new project Button */
  let newProjectButton = document.getElementById("save-project-button");
  newProjectButton.addEventListener("click", () => {
    let pName = document.getElementById("project-name").value;
    let cli = document.getElementById("client").value;
    let desc = document.getElementById("description").value;
    
    insertProject(pName,cli,desc);
    closePopup();
  });
}function clearAllProjects(){
  
}
export function newHtmlProject(project) {
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

  /* Edit & delete buttons */
  let detailsButtons = newProjectItem
    .querySelector(".project-card-details-buttons")
    .querySelectorAll(".project-card-details-button");
  detailsButtons[0].addEventListener("click", () => editProject(project));
  detailsButtons[1].addEventListener("click", () => deleteProject(project));

  /* Configure & results configuration */
  let buttons = newProjectItem
    .querySelector(".project-card-buttons")
    .querySelectorAll("button");
  buttons[0].addEventListener("click", () => configure());
  buttons[1].addEventListener("click", () => results());
  hoverWhiteArrow(buttons[1]);
}
function addControl(closed) {
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
    success: function (result) {;
      projects = JSON.parse(result);
      projects.forEach((project)=> {
        newHtmlProject(project);
      })
    },
    error:function(error){
      console.log(error);
    }
  });
}
async function fetchProject(idProject) {
  $.ajax({
    url: "../../../connections/fetchProjectById.php",
    type: "GET",
    data:{
      idProject:idProject,
    },
    success: function (result) {;
      projects = JSON.parse(result);
      projects.forEach((project)=> {
        newHtmlProject(project);
      })
    },
    error:function(error){
      console.log(error);
    }
  });
}
async function insertProject(name, client, description) {
  $.ajax({
    url: "../../../connections/insertProject.php",
    type: "POST",
    data: {
      projectName: name,
      client: client,
      description: description,
    },
    success: function (result) {
      alert("Project created succesfully");
    },
  });
  
}
