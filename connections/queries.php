<?php

function checkUserExist($idUser)
{
    return "SELECT userId FROM users WHERE userId = '$idUser';";
}

function checkActiveGroup($idUser)
{
    return "SELECT groupName, groupId, urlTeam FROM groups G JOIN users U ON G.groupId = U.activeGroup WHERE userId = '$idUser';";
}

function checkManagers($groupName)
{
    return "SELECT userId FROM managers M JOIN groups G ON M.groupId = G.groupId WHERE groupName = '$groupName';";
}

function getAllManagers()
{
    return "SELECT userId FROM managers;";
}

function setUser($idUser)
{
    return "INSERT INTO users (userId) VALUES ('$idUser');";
}

function sendAbsence($userId,  $groupId, $date, $month, $absence)
{
    return "INSERT INTO absences (userId, groupId, date, month, cause) VALUES ('$userId', ' $groupId', '$date', '$month', '$absence');";
}

function checkAbsence($userId, $groupId, $month)
{
    return "SELECT userId, date, month FROM absences WHERE userId = '$userId' AND month = '$month' AND groupId = '$groupId';";
}

function url($userId)
{
    return "SELECT userId FROM managers M JOIN groups G ON M.groupId = G.groupId WHERE groupName = '$userId';";
}

function getUserActiveGroup($userId)
{
    return "SELECT activeGroup FROM users WHERE userId = '$userId';";
}

function checkForm($userId, $groupId, $month)
{
    return "SELECT userId, dateForm, month FROM forms WHERE userId = '$userId' AND month = '$month' AND groupId = '$groupId';";
}

function setUserForm($userId, $groupId, $date, $scoreManager, $feedbackManager, $scoreTeam, $feedbackTeam, $actualMonth)
{
    return "INSERT INTO forms (userId, groupId, dateForm, scoreManager, feedbackManager, scoreTeam, feedbackTeam, month) VALUES ('$userId', '$groupId', '$date', '$scoreManager', '$feedbackManager', '$scoreTeam', '$feedbackTeam', '$actualMonth');";
}

function getAllGroups()
{
    return "SELECT G.groupId, G.groupName, M.userId FROM groups G, managers M WHERE G.groupId = M.groupId;";
}

function getAllUserGroups($userId)
{
    return "SELECT groupId FROM userGroups WHERE userId = '$userId';";
}

function changeGroupActive($userId, $groupId)
{
    return "UPDATE users SET activeGroup='$groupId' WHERE userId='$userId';";
}

function compareManagerActiveGroup($groupId)
{
    return "SELECT userId FROM managers M JOIN groups G ON M.groupId = G.groupId WHERE G.groupId = '$groupId';";
}

function checkTeam($activeGroup, $actualMonth)
{
    return "SELECT dateTeam FROM teams WHERE groupId = '$activeGroup' AND month = '$actualMonth';";
}

function createTeam($idGroup, $date, $actualMonth, $userId)
{
    return "INSERT INTO teams (groupId, dateTeam, month, managerId) VALUES ('$idGroup', '$date', '$actualMonth', '$userId');";
}

function saveGroup($userId, $group)
{
    return "INSERT INTO userGroups (userId, groupId) VALUES ('$userId', '$group');";
}

function setTopicTeam($userId, $groupId, $month, $topic)
{
    return "UPDATE teams SET topic='$topic' WHERE topic IS NULL AND managerId = '$userId' AND groupId = '$groupId' AND month = '$month';";
}

function isManager($userId)
{
    return "SELECT userId FROM managers WHERE userId = '$userId';";
}

function isAdmin($userId)
{
    return "SELECT userId FROM managerCommittee WHERE userId = '$userId';";
}

function getUrlCommittee()
{
    return "SELECT urlTeam FROM urlCommittee;";
}

function checkCommittee($userId, $month)
{
    return "SELECT dateTeam FROM strategy WHERE userId = '$userId' AND month = '$month';";
}

function checkStrategy($userId, $month)
{
    return "SELECT dateTeam FROM strategy WHERE userId = '$userId' AND month = '$month';";
}

function setCommittee($userId, $date, $actualMonth, $scoreTeam, $topic)
{
    return "INSERT INTO committee (userId, dateTeam, month, scoreTeam, topics) VALUES ('$userId', '$date', '$actualMonth', '$scoreTeam', '$topic');";
}

function setStrategy($userId, $date, $actualMonth, $scoreTeam, $topic)
{
    return "INSERT INTO strategy (userId, dateTeam, month, scoreTeam, topics) VALUES ('$userId', '$date', '$actualMonth', '$scoreTeam', '$topic');";
}

function setLastDateUp2Date($date, $userId)
{
    return "UPDATE users SET lastDateTeam = '$date' WHERE userId = '$userId';";
}

function setLastMonthUp2Date($actualMonth, $userId)
{
    return "UPDATE users SET lastMonthTeam = '$actualMonth' WHERE userId = '$userId';";
}

function getLastDate($userId)
{
    return "SELECT lastDateTeam FROM users WHERE userId = '$userId';";
}

function numGroups($userId)
{
    return "SELECT count('groupId') AS numGroups FROM userGroups WHERE userId = '$userId';";
}

function deleteGroup($userId, $groupId)
{
    return "DELETE FROM userGroups WHERE userId = '$userId' AND groupId = '$groupId';";
}

function checkJoinGroup($userId, $groupId)
{
    return "SELECT groupId FROM userGroups WHERE userId = '$userId' AND groupId = '$groupId';";
}

function joinGroup($userId, $groupId)
{
    return "INSERT INTO userGroups (userId, groupId) VALUES ('$userId', '$groupId');";
}

function newActiveGroup($userId, $groupId)
{
    return "SELECT groupId FROM userGroups WHERE userId = '$userId' HAVING groupId != $groupId;";
}

function getGroupManager($userId)
{
    return "SELECT M.groupId, G.groupName, G.urlTeam, G.totalUsers FROM managers M JOIN groups G ON M.groupId = G.groupId WHERE M.userId = '$userId';";
}

function activeUserGroups($groupId)
{
    return "SELECT COUNT(userId) AS activeUser FROM userGroups WHERE groupId = '$groupId';";
}

function getExcelUser($userId, $month)
{
    return "SELECT T.dateTeam, F.groupId, F.scoreManager, F.feedbackManager, F.scoreTeam, F.feedbackTeam, F.month, T.managerId, T.topic FROM teams T JOIN forms F ON T.groupId = F.groupId WHERE F.userId ='$userId' AND F.month = '$month' AND T.month = '$month';";
    //return "SELECT T.dateTeam ,F.scoreManager, F.feedbackManager, F.scoreTeam, F.feedbackTeam, F.month, T.managerId, T.topic FROM teams T JOIN forms F ON T.groupId = F.groupId WHERE F.dateForm = T.dateTeam AND F.userId ='$userId' AND F.groupId = '$groupId';";
}

function getExcelCommittee($year)
{
    return "SELECT * FROM committee WHERE dateTeam BETWEEN '$year-01-01' AND '$year-12-31' ORDER BY dateTeam DESC;";
}

function getExcelStrategy($year)
{
    return "SELECT * FROM strategy WHERE dateTeam BETWEEN '$year-01-01' AND '$year-12-31' ORDER BY dateTeam DESC;";
}

function getExcelAdminManagers($month)
{
    return "SELECT M.groupId, M.userId, T.dateTeam FROM managers M JOIN teams T ON M.userId = T.managerId WHERE T.month = '$month' group by groupId;";
}

function getExcelAdminScore($month, $groupId)
{
    return "SELECT scoreManager, feedbackManager FROM forms WHERE month='$month' AND groupId='$groupId';";
}

function getGroupName($groupId)
{
    return "SELECT groupName FROM groups WHERE groupId = '$groupId';";
}

function isStrategy($userId)
{
    return "SELECT userId FROM userStrategy WHERE userId = '$userId';";
}

function getUrlStrategy()
{
    return "SELECT urlTeam FROM urlStrategy;";
}

function getTotalUsers($groupId)
{
    return "SELECT totalUsers FROM groups WHERE groupId = '$groupId';";
}

function getFormsManager($groupId, $month)
{
    return "SELECT * FROM forms WHERE groupId = '$groupId' AND month = '$month';";
}

function getTopicManager($groupId, $month)
{
    return "select topic, dateTeam, managerId from teams where groupId = '$groupId' and month = '$month';";
}
