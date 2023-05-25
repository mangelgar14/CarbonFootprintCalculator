<?php
$id = htmlspecialchars($_POST["id"]);
$num_of_servers = htmlspecialchars($_POST["num_of_servers"]);
$power_consumption = htmlspecialchars($_POST["power_consumption"]);
$nominal_consumption = htmlspecialchars($_POST["nominal_consumption"]);
$cpu = htmlspecialchars($_POST["cpu"]);
$software_utilization = htmlspecialchars($_POST["software_utilization"]);
$hours_used = htmlspecialchars($_POST["hours_used"]);
$renewable_energy = htmlspecialchars($_POST["renewable_energy"]);
$checked_btn = htmlspecialchars($_POST["checked_btn"]);
$consumed_renewable_energy = htmlspecialchars($_POST["consumed_renewable_energy"]);
$country = htmlspecialchars($_POST["country"]);

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
        <form id=\"form_premise\">
            <div id=\"premise_question1\" class=\"question\">
                <div class=\"q_text\">1. How many servers do you have in this configuration?*</div>
                <div class=\"q_input\"><input type=\"text\" id=\"premise_answer1\" value=\"$num_of_servers\"></div>
            </div>
            <div id=\"premise_question2\" class=\"question\">
                <div class=\"q_text\">2. Do you know what the nominal power consumption 
                    of one server is according to the manufacturer specifications?*</div>
                <div class=\"q_input\">
                    <select id=\"combo_premise1\">
                        <option value=\"yes\">Yes</option>
                        <option value=\"no\">No</option>
                    </select>
                </div>
            </div>
            <div id=\"question_group\">
                <div id=\"premise_question3\" class=\"question\">
                    <div class=\"q_text\">3. Nominal power consumption in kWh of the server according to 
                        manufacturer specifications?*</div>
                    <div class=\"q_input\"><input type=\"text\" id=\"premise_answer2\" value=\"$nominal_consumption\"></div>
                </div>
                <div id=\"premise_question4\" class=\"question\">
                    <div class=\"q_text\">4. How many CPU sockets does the server have?</div>
                    <div class=\"q_input\">
                        <select id=\"combo_premise2\" disabled=\"true\">
                            <option value=\"1\">1 CPU</option>
                            <option value=\"2\">2 CPU</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id=\"premise_question5\" class=\"question\">
                <div class=\"q_text\">5. What is the percentage of software utilization 
                    on the server/of server utilization for all its applications?*</div>
                <div class=\"q_input\"><input type=\"text\" id=\"premise_answer3\" value=\"$software_utilization\"></div>
            </div>
            <div id=\"premise_question6\" class=\"question\">
                <div class=\"q_text\">6. How many hours per day is the software/server used?*</div>
                <div class=\"q_input\"><input type=\"text\" id=\"premise_answer4\" value=\"$hours_used\"></div>
            </div>
            <div id=\"premise_question7\" class=\"question\">
                <div class=\"q_text\">7. Does the server consume renewable energy?*</div>
                <div class=\"q_input\">
                    <select id=\"combo_premise3\">
                        <option value=\"yes\">Yes</option>
                        <option value=\"no\">No</option>
                    </select>
                </div>
            </div>
            <div id=\"question_group\">
                <div id=\"premise_question8\">
                    <div class=\"q_text\">8. How do you certify that your energy is renewable?*</div>
                    <div class=\"q_input\">
                        <input type=\"radio\" name=\"btn_radio\" id=\"radio\" value=\"0\">
                        <label for=\"answer1\">Contract with a supplier where 
                            the server consumption is included.</label></br>
                        <input type=\"radio\" name=\"btn_radio1\" id=\"radio\" value=\"1\">
                        <label for=\"answer1\">Audited sustaiability report.</label></br>
                        <input type=\"radio\" name=\"btn_radio2\" id=\"radio\" value=\"2\">
                        <label for=\"answer1\">Formal written statement 
                            from the energy supplier.</label>       
                    </div>
                </div>
                <div id=\"premise_question9\" class=\"question\">
                    <div class=\"q_text\">9. What percentage of the energy consumed is renewable?*</div>
                    <div class=\"q_input\"><input type=\"text\" id=\"premise_answer5\" value=\"$consumed_renewable_energy\"></div>
                </div>
            </div>
            <div id=\"premise_question10\" class=\"question\">
                <div class=\"q_text\">10. In which country or region is your server located?*</div>
                <div class=\"q_input\">
                    <select id=\"combo_premise4\">
                        <option>Spain</option>
                        <option>Lista de paises</option>
                    </select>
                </div>
            </div>
            <div id=\"submit_cancel\">
                <input class=\"sbmt_save\" type=\"submit\" onclick=\"$funcion($id)\" value=\"Save\"></input>
                <button class=\"sbmt_cancel\" onclick=\"$funcion($id)\">Cancel</button>
            </div>
        </form>
    </div>
</div>
</div>";