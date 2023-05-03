var project = null;
window.onload = loader();
function loader() {
    let listProjects = document.querySelectorAll('.project-card');
    listProjects.forEach(listProject => {
        listProject.addEventListener('click', () => {
            if (project != listProject) {
                if (project != null) {
                    project.querySelectorAll('.project-card-arrow')[0].classList.remove('arrow');
                    project.querySelectorAll('.project-card-details')[0].classList.add('hidden');
                }
            }
            listProject.querySelectorAll('.project-card-arrow')[0].classList.toggle('arrow');
            listProject.querySelectorAll('.project-card-details')[0].classList.toggle('hidden');
            project = listProject;

        })
    })
}