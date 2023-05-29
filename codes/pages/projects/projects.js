var hasProjects = false;
var project = null;
var pClosed = true;
window.onload = loader();
function loader() {
  // document
  //   .getElementById("add_version_button").addEventListener("click", () => {
  //     newVersion(project);
  //   });
  let select = document.getElementById("order-by");
  select.addEventListener("change", function () {
    console.log(document.getElementById("search-query").value)
    if (document.getElementById("search-query").value == "") dbFetchProjects();
    else dbSearch();
  });
  document
    .getElementById("btn_delete")
    .addEventListener("click", () => dbDeleteProject());
  dbFetchProjects();

  /* ir a resultados / calculadora */
  document
    .getElementById("btn_results")
    .addEventListener("click", () => gotoResults(project));
  document
    .getElementById("btn_calculator")
    .addEventListener("click", () => gotoConfigure(project));

  /* Hover boton blanco -> flecha blanca */
  let whiteButtons = document.querySelectorAll(".button-with-image");
  whiteButtons.forEach((button) => {
    hoverWhiteArrow(button);
  });
}
function clearProjects() {
  let htmlProjects = document
    .getElementById("projects-field")
    .querySelectorAll(".project-field-item");
  htmlProjects.forEach((project) => {
    project.remove();
  });
  project = null;
  pClosed = true;
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
      for (const p of listProjects) {
        p.classList.add("project-field-item");
        p.classList.remove("new-project-field-item");

        /* project card configuration */
        let card = p.querySelector(".new-project-card");
        openClose(card);
        card.classList.add("project-card");
        card.classList.remove("new-project-card");
      }
      closePopup();
    },
  });
}
function addProjectControl() {
  document.getElementById("add_version_button").disabled = pClosed;
  document.getElementById("add_project_button").disabled = !pClosed;
}
function openClose(listProject) {
  listProject
    .querySelector(".project-card-preview")
    .addEventListener("click", () => {
      if (project != listProject.parentNode.id) {
        if (!pClosed) {
          if (project != null) {
            document
              .getElementById(project)
              .querySelectorAll(".project-card-arrow")[0]
              .classList.remove("arrow");
            document
              .getElementById(project)
              .querySelectorAll(".project-card-details")[0]
              .classList.toggle("hidden");
          }
        }
        pClosed = false;
      } else {
        pClosed = !pClosed;
      }
      if (pClosed) {
        project = null;
      } else {
        project = listProject.parentNode.id;
      }
      listProject
        .querySelectorAll(".project-card-arrow")[0]
        .classList.toggle("arrow");
      listProject
        .querySelectorAll(".project-card-details")[0]
        .classList.toggle("hidden");

      addProjectControl(pClosed);
    });
}

function dbSearch() {
  var order;
  let select = document.getElementById("order-by");
  switch (select.selectedIndex) {
    case 0:
      order = "lastModified";
      break;
    case 1:
      order = "name";
      break;
    case 2:
      order = "client";
      break;
  }
  if (typeof order === "undefined") {
    order = "lastModified";
  }
  let query = document.getElementById("search-query").value;
  $.ajax({
    url: "../../../connections/projects/searchProjects.php",
    type: "GET",
    data: {
      query: query,
      order: order,
    },
    success: function (result) {
      var projectsResult = JSON.parse(result);
      if (projectsResult.length > 0) {
        document.getElementById("no-projects-search").innerHTML = "";
        clearProjects();
        hasProjects = true;
        projectsResult.forEach((p) => {
          newHtmlProject(p);
        });
      } else {
        clearProjects();
        document.getElementById("no-projects-search").innerHTML =
          "<span>No projects found with the search:</span><p>" + query + "</p>";
      }
      project = null;
    },
    error: function (error) {},
  });
}
function dbFetchProjects(order) {
  var order;
  let select = document.getElementById("order-by");
  switch (select.selectedIndex) {
    case 0:
      order = "lastModified";
      break;
    case 1:
      order = "name";
      break;
    case 2:
      order = "client";
      break;
  }
  if (typeof order === "undefined") {
    order = "lastModified";
  }

  $.ajax({
    url: "../../../connections/projects/FetchProjects.php",
    type: "GET",
    data: {
      order: order,
    },
    success: function (result) {
      var projectsResult = JSON.parse(result);
      if (projectsResult.length > 0) {
        clearProjects();
        hasProjects = true;
        projectsResult.forEach((p) => {
          newHtmlProject(p);
        });
      } else {
        hasProjects = false;
      }
      project = null;
      if (hasProjects) hasProjectsStyle();
      else hasNoProjectsStyle();
    },
    error: function (error) {},
  });
}
function dbFetchProject(idProject) {
  $.ajax({
    url: "../../../connections/projects/fetchProjectById.php",
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
function dbInsertProject(name, client, description) {
  $.ajax({
    url: "../../../connections/projects/InsertProject.php",
    type: "POST",
    data: {
      projectName: name,
      client: client,
      description: description,
    },
    success: function (result) {
      dbFetchProjects();
      pClosed = true;
      addProjectControl(pClosed);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function dbEditProject(idProject, name, client, description) {
  $.ajax({
    url: "../../../connections/projects/editProject.php",
    type: "POST",
    data: {
      idProject: idProject,
      projectName: name,
      client: client,
      description: description,
    },
    success: function (result) {
      dbFetchProjects();
    },
  });
}
function dbDeleteProject() {
  $.ajax({
    url: "../../../connections/projects/deleteProject.php",
    type: "POST",
    data: {
      idProject: project,
    },
    success: function (result) {
      dbFetchProjects();
      pClosed = true;
      addProjectControl(pClosed);
      closePopup();
    },
  });
}

function hasProjectsStyle() {
  try {
    let versionButton = document.querySelectorAll(".add-version-button");
    let projectButton = document.querySelectorAll(".add-project-button-np");

    let noProjects = document.querySelectorAll(".no-projects");
    noProjects.forEach((p) => {
      p.classList.add("add-project-button");
      p.classList.remove("add-project-button-np");

      noProjects[0].classList.add("hidden");
      versionButton[0].classList.remove("hidden");
    });

    let listProjects = document.querySelectorAll(".project-field-item");
    listProjects.forEach((listProject) => {
      listProject.classList.remove("hidden");
    });
  } catch (e) {}
}
function hasNoProjectsStyle() {
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
function searchNoProjectsStyle() {}
function editProject(idProject) {
  dbFetchProject(idProject);

  let newProjectButton = document.getElementById("save-project-button");
  newProjectButton.replaceWith(newProjectButton.cloneNode(true));
  newProjectButton = document.getElementById("save-project-button");
  newProjectButton.addEventListener("click", () =>
    saveEditProjectButton(idProject)
  );
}
function newProject() {
  let newProjectButton = document.getElementById("save-project-button");
  newProjectButton.replaceWith(newProjectButton.cloneNode(true));
  newProjectButton = document.getElementById("save-project-button");
  newProjectButton.addEventListener("click", () => saveProjectButton());
  showProjectPopup();
}
function newVersion(p) {
  dbFetchProject(p);

  showProjectPopup();
}
function saveProjectButton() {
  let pName = document.getElementById("project-name").value;
  let cli = document.getElementById("client").value;
  let desc = document.getElementById("description").value;

  dbInsertProject(pName, cli, desc);
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
function closePopup() {
  let popup = document.getElementById("popup");
  let projectPopup = document.getElementById("project_popup");
  let warningPopup = document.getElementById("warning_popup");

  popup.classList.add("hidden");
  projectPopup.classList.add("hidden");
  warningPopup.classList.add("hidden");
}
function gotoConfigure(id) {
  if (id != null) {
    sessionStorage.setItem("project", id);
    location.href = "calculator.html";
  } else {
    alert("You must select a project first");
  }
}
function gotoResults(id) {
  if (id != null) {
    sessionStorage.setItem("project", id);
    location.href = "results.html";
  } else {
    alert("You must select a project first");
  }
}
