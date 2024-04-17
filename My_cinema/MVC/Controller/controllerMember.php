<?php

header("Access-Control-Allow-Origin: *");
include "../Modele/connexionDB.php";
include "../Modele/rechercheMember.php";

$inputFirstName = $_GET['memberFirstName'];
    $inputLastName = $_GET['memberLastName'];

if ($inputFirstName != "vide" && $inputLastName != "vide") {
    $valMember = rechercheMemberAllName($inputFirstName, $inputLastName, connection());
} elseif ($inputLastName === "vide" && $inputFirstName === "vide") {
    $valMember = rechercheMember(connection());
} elseif ($inputFirstName != "vide") {
    $valMember = rechercheMemberFirstName($inputFirstName, connection());
} elseif ($inputLastName != "vide") {
    $valMember = rechercheMemberLastName($inputLastName, connection());
}







$result = [
    'memberInfo' => $valMember,
];

header("Content-Type: application/json");

echo json_encode($result);
