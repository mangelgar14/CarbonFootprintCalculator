let project = null;
let closed = true;
window.onload = loader();
function loader() {
  let addVersionButton = document.getElementById("add_version_button");
  addVersionButton.addEventListener("click", () => {
    newVersion(project);
  });

  /* Abrir Cerrar projectos */
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
        console.log(project.querySelectorAll(".p1")[0].innerHTML);
        addControl(closed);
      });
  });
  /* Edit delete */
  let editButtons = document.querySelectorAll(".edit-project");
  let deleteButtons = document.querySelectorAll(".delete-project");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", () => {
      if (project != null) editProject(project);
    });
  });
  /* Hover boton blanco -> flecha blanca */
  let whiteButtons = document.querySelectorAll(".button-white-bg");
  whiteButtons.forEach((button) => {
    button.addEventListener("mouseover", (event) => {
      button.querySelector("img").src = "../imgs/arrow_right_white.svg";
    });
    button.addEventListener("mouseout", (event) => {
      button.querySelector("img").src = "../imgs/arrow_right.svg";
    });
  });
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
