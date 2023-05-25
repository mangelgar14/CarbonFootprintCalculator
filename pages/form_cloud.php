<?php

$id = htmlspecialchars($_POST["id"]);
$funcion = htmlspecialchars($_POST["funcion"]);

echo "<div id=\"popup\">
<div id=\"popup_content\">
    <div id=\"popup_top\">
        <div id=\"popup_top_text\">Answer the following questions</div>
        <div id=\"popup_top_cross\">
            <button onclick=\"close_popup()\"><img src=\"../imgs/cross_white.svg\" alt=\"close\"></button>
        </div>
    </div>

    <div id=\"form\">
        <form id=\"form_cloud\">
            <div id=\"cloud_question1\" class=\"question\">
                <div class=\"q_text\">1.- Who is your Cloud services provider/for the software?</div>
                <div class=\"q_input\">
                    <select id=\"provider_cloud\">
                        <option value=\"AWS\">AWS</option>
                        <option value=\"GCP\">GCP</option>
                        <option value=\"Microsoft Azure\">Microsoft Azure</option>
                    </select>
                </div>
            </div>
            <div id=\"cloud_question2\" class=\"question\">
                <div class=\"q_text\">2. In which region is the server located?</div>
                <div class=\"q_input\">
                    <select id=\"combo_cloud\">
                        <option>us-east-1</option>
                        <option>us-east-2</option>
                        <option>us-west-1</option>
                        <option>us-west-2</option>
                        <option>us-gov-east-1</option>
                        <option>us-gov-west-1</option>
                        <option>af-south-1</option>
                        <option>ap-east-1</option>
                        <option>ap-south-1</option>
                        <option>ap-northeast-1</option>
                        <option>ap-northeast-2</option>
                        <option>ap-northeast-3</option>
                        <option>ap-southeast-1</option>
                        <option>ap-southeast-2</option>
                        <option>ap-southeast-3</option>
                        <option>ca-central-1</option>
                        <option>cn-north-1</option>
                        <option>cn-northwest-1</option>
                        <option>eu-central-1</option>
                        <option>eu-west-1</option>
                        <option>eu-west-2</option>
                        <option>eu-west-3</option> 
                        <option>eu-north-1</option>
                        <option>me-south-1</option>
                        <option>sa-east-1</option>
                    </select>
                </div>
            </div>
            <div id=\"cloud_question3\" class=\"question\">
                <div class=\"q_text\">3. How many vCPU hours do you use per day/for the sotfware usage?*</div>
                <div class=\"q_input\"><input type=\"text\" id=\"cloud_input3\"></div>
            </div>
            <div id=\"cloud_question4\" class=\"question\">
                <div class=\"q_text\">4. How many vGPU hours do you use per day/for the software usage?*</div>
                <div class=\"q_input\"><input type=\"text\" id=\"cloud_input4\"></div>
            </div>
            <div id=\"cloud_question5\" class=\"question\">
                <div class=\"q_text\">5. How many TB of HDD storage do you use per day/for the software usage?</div>
                <div class=\"q_input\"><input type=\"text\" id=\"cloud_input5\"></div>
            </div>
            <div id=\"cloud_question6\" class=\"question\">
                <div class=\"q_text\">6. How many TB of SDD storage do you use per day/for the software usage?</div>
                <div class=\"q_input\"><input type=\"text\" id=\"cloud_input6\"></div>
            </div>
            <div id=\"cloud_question7\" class=\"question\">
                <div class=\"q_text\">7. How many GB of memory do you use per day/for the software?</div>
                <div class=\"q_input\"><input type=\"text\" id=\"cloud_input7\"></div>
            </div>
            <div id=\"cloud_question8\" class=\"question\">
                <div class=\"q_text\">8. How many GB of networking do you use per day/for the software?</div>
                <div class=\"q_input\"><input type=\"text\" id=\"cloud_input8\"></div>
            </div>
            <div id=\"submit_cancel\">
                <input class=\"sbmt_save\" type=\"button\" onclick=\"$funcion($id)\" value=\"Save\"></input>
                <button class=\"sbmt_cancel\" onclick=\"$funcion($id)\">Cancel</button>
            </div>
        </form>
    </div>
</div> 
</div>";