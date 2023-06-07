var hasProjects = false;
var project = null;
var pClosed = true;
window.onload = loader();
function loader() {
  document
    .getElementById("add_version_button")
    .addEventListener("click", () => {
      newVersion();
    });
  let select = document.getElementById("order-by");
  select.addEventListener("change", function () {
    if (document.getElementById("search-query").value == "") {
      dbFetchProjects();
    } else dbSearch();
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
    default:
      order = "lastModified";
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
      clearProjects();
      if (projectsResult.length > 0) {
        document.getElementById("no-projects-search").innerHTML = "";

        hasProjects = true;
        projectsResult.forEach((p) => {
          newHtmlProject(p);
        });
      } else {
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
    default:
      order = "lastModified";
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
      clearProjects();
      var projectsResult = JSON.parse(result);
      if (projectsResult.length > 0) {
        hasProjects = true;
        hasProjectsStyle();
        projectsResult.forEach((p) => {
          newHtmlProject(p);
        });
      } else {
        hasProjects = false;
        hasNoProjectsStyle();
      }
      project = null;
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
      location.reload();
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
      location.reload();
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
      location.reload();
    },
  });
}

function hasProjectsStyle() {
  let versionButton = document.querySelector(".add-version-button");
  let projectButton = document.getElementById("add_project_button");

  projectButton.classList.remove("add-project-button-np");
  projectButton.classList.add("add-project-button");

  let noProjects = document.querySelector(".no-projects");
  noProjects.classList.add("hidden");
  versionButton.classList.remove("hidden");

  let listProjects = document.querySelectorAll(".project-field-item");
  listProjects.forEach((listProject) => {
    listProject.classList.remove("hidden");
  });
}
function hasNoProjectsStyle() {
  let listProjects = document.querySelector(".project-field-item");
  let versionButton = document.querySelector(".add-version-button");
  let noProjects = document.querySelector(".no-projects");
  let projectButton = document.querySelector(".add-project-button");

  projectButton.classList.add("add-project-button-np");
  projectButtonclassList.remove("add-project-button");

  noProjects.classList.remove("hidden");
  versionButton.classList.add("hidden");
  listProjects.forEach((listProject) => {
    listProject.classList.add("hidden");
  });
  hasProjects = false;
}
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
function newVersion() {
  $.ajax({
    url: "../../../connections/projects/insertNewVersion.php",
    type: "POST",
    data: {
      idProject: project,
    },
    success: function (result) {
      dbFetchProjects();
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function saveProjectButton() {
  let pName = document.getElementById("project-name");
  let cli = document.getElementById("client");
  let desc = document.getElementById("description");
  pName.classList.remove("input-error");
  cli.classList.remove("input-error");
  if (pName.value.trim() == "") {
    pName.classList.add("input-error");
  } else if (cli.value.trim() == "") {
    cli.classList.add("input-error");
  } else {
    dbInsertProject(pName, cli, desc);
    closePopup();
    pName.classList.remove("input-error");
    cli.classList.remove("input-error");
    pName.value = "";
    document.value = "";
    desc.value = "";
  }
}
function saveEditProjectButton(idProject) {
  let pName = document.getElementById("project-name");
  let cli = document.getElementById("client");
  let desc = document.getElementById("description");
  pName.classList.remove("input-error");
  cli.classList.remove("input-error");

  cli.classList.add("input-error");
  if (pName.value.trim() == "") {
    pName.classList.add("input-error");
  } else if (cli.value.trim() == "") {
    cli.classList.add("input-error");
  } else {
    dbEditProject(
      idProject,
      pName.value.trim(),
      cli.value.trim(),
      desc.value.trim()
    );
    closePopup();
    pName.classList.remove("input-error");
    cli.classList.remove("input-error");
    pName.value = "";

    desc.value = "";
  }
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
