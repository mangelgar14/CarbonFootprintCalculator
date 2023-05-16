<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accenture</title>
  <script src="../../dist_cookie/amazon-cognito-auth.min.js"></script>
  <script type="module" src="../codes/pages/projects/control.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="../codes/pages/projects/projects.js"></script>
  <link rel="stylesheet" type="text/css" href="../styles/main/projects.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="icon" type="image/x-icon" href="../imgs/favicon.ico" />
</head>

<body>
  <div id="popup" class="hidden">
    <form id="project_popup" class="hidden" method="post" action="new-project.php">
      <div class="popup-header">
        Create project<img src="../imgs/cross_white.svg" alt="Close window" onclick="closePopup()" />
      </div>
      <div class="popup-content">
        <div class="popup-content-top">
          <label for="project-name">Project Name</label>
          <label for="client">Client Name</label>
          <input id="project-name" type="text" name="project-name" required />
          <input type="text" id="client" name="client" required />
        </div>
        <div class="popup-content-mid">
          <label for="description">Description</label>
          <textarea rows="8" name="description" id="description"></textarea>
        </div>
        <div class="popup-content-bot">
          <button type="button" class="button-white-bg" onclick="closePopup()">
            Cancel
          </button>
          <button type="button" class="button-purple-bg" value="Save" id="save-project-button">Save</button>
        </div>
      </div>
    </form>
    <div id="warning_popup" class="warning-popup hidden">
      <div id="div_x"><button type="button" id="btn_x" onclick="closePopup()"><img src="../imgs/cross.png" alt="Close window" /></button></div>
      <div id="err_type">Alert</p>
      </div>
      <div id="text">Are you sure you want to <b>delete</b> this?</div>
      <div id="div_close"><button type="button" id="btn_delete" class="button-purple-bg" onclick="closePopup()">Delete</button></div>
    </div>
  </div>
  <header>
    <div id="menu">
      <div id="logo">
        <img src="../imgs/logo_header.png" loading="lazy" />
      </div>
      <div id="separator">
        <img src="../imgs/separador.png" loading="lazy" />
      </div>
      <div id="title">Carbon Footprint Calculator</div>
      <div id="btn_home" class="header-menu-button">
        <a href="home.html">Home</a>
      </div>
      <div id="btn_projects" class="header-menu-button">
        <a href="projects.html">Projects</a>
        <img id="selected_img" src="../imgs/nav_selected.png" alt="Navi selected link" />
      </div>
      <div id="btn_calculator" class="header-menu-button">
        <a href="#" onclick="show_popup()">Calculator</a>
      </div>
      <div id="btn_results" class="header-menu-button">
        <a href="results.html">Results</a>
      </div>
    </div>
  </header>
  <noscript><br /><strong>We are sorry but this site does not work properly without JavaScript
      enabled. Please enable JavaScript to continue.</strong><br /></noscript>
  <div class="dev-nav">
    <button id="noprojects-button" onclick="noprojects()">No projects</button><button onclick="projects()">Projects</button>
  </div>
  <div class="grid-container">
    <div class="item1">
      <p>Project's Folder</p>
    </div>
    <div class="item2">
      Order by:
      <select>
        <option>Date</option>
        <option>Project name</option>
        <option>Client name</option>
      </select>
    </div>
    <div class="item3">
      <input type="text" placeholder="" />
      <button type="submit"><i class="fa fa-search"></i></button>
    </div>
  </div>
  <div class="add-buttons">
    <button id="add_project_button" class="add-project-button" onclick="newProject()">
      <img src="../imgs/plus.svg" alt="Icon of a plus sign" />
      Add new project
    </button>

    <button id="add_version_button" class="add-version-button" disabled>
      <img src="../imgs/plus.svg" />
      Add new version
    </button>
  </div>
  <ul id="projects-field">
    <div class="no-projects hidden">
      <p class="no-projects1">This account has no projects created yet</p>
      <p class="no-projects2">
        To create a project select the “Add Project Button” at the top of
        these messages.
      </p>
      </div>
    

  </ul>
  <main></main>

  <nav></nav>

</body>

</html>