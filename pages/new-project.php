<?php
$id = htmlspecialchars($_POST["id"]);
$projectName = htmlspecialchars($_POST["projectName"]);
$client = htmlspecialchars($_POST["client"]);
$description = htmlspecialchars($_POST["description"]);
$lastModified = htmlspecialchars($_POST["lastModified"]);

echo "<li class=\"new-project-field-item\" id=\"$id\">
    <div class=\"new-project-card\">
      <div class=\"project-card-preview\">
        <div class=\"project-card-text\">
          <p class=\"p-name\">". $projectName . "</p>
          <p class=\"p-client\">" . $client . "</p>
          <p class=\"p-date\">". $lastModified. "</p>
        </div>
        <div class=\"project-card-icon\">
          <img
            class=\"project-card-arrow\"
            src=\"../imgs/arrow.svg\"
            alt=\"Arrow pointing down\"
          />
        </div>
      </div>
      <div class=\"project-card-details hidden\">
        <div class=\"project-card-details-content\">
          <p class=\"desc\">" .
            $description . "
          </p>
          <ul class=\"project-card-details-summary\">
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum dolor sit amet</li>
          </ul>
        </div>

        <div class=\"project-card-details-buttons\">
          <button
            class=\"project-card-details-button edit-project\"
          >
            <img src=\"../imgs/edit_icon.svg\" alt=\"Icon of a pen\" /></button
          ><button
            class=\"project-card-details-button delete-project\" 
          >
            <img src=\"../imgs/delete_icon.svg\" alt=\"Icon of a trash can\" />
          </button>
        </div>
      </div>
    </div>
    <div class=\"project-card-buttons\">
      <button class=\"button-purple-bg\" >
        Configure
      </button>
      <button class=\"button-white-bg button-with-image\">
        Results
        <img
          src=\"../imgs/arrow_right.svg\"
          alt=\"Arrow pointing right\"
          onmouseover=\"this.src=\'../imgs/arrow_right_white.svg\';\"
          onmouseout=\"this.src=\'LibraryTransparent.png\'\"
        />
      </button>
    </div>
  </li>";
