var project = null;
var closed = false;
window.onload = loader();
function loader() {
    let listProjects = document.querySelectorAll('.project-card');
    listProjects.forEach(listProject => {
        listProject.querySelectorAll('.project-card-preview')[0].addEventListener('click', () => {
            if (project != listProject) {
                closed = false;
                if (project != null) {

                    project.querySelectorAll('.project-card-arrow')[0].classList.remove('arrow');
                    project.querySelectorAll('.project-card-details')[0].classList.toggle('hidden');
                }
            } else {
                closed = !closed;
            }
            listProject.querySelectorAll('.project-card-arrow')[0].classList.toggle('arrow');
            listProject.querySelectorAll('.project-card-details')[0].classList.toggle('hidden');

            project = listProject;
            addControl(closed)
        })
    })
}

function addControl(closed) {
    if (closed) {
        document.getElementById('add_version_button').disabled = true;
        document.getElementById('add_project_button').disabled = false;

    } else {
        document.getElementById('add_version_button').disabled = false;
        document.getElementById('add_project_button').disabled = true;

    }
}