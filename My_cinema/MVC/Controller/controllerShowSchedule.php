<?php

header("Access-Control-Allow-Origin: *");
include "../Modele/connexionDB.php";
include "../Modele/rechercheFilm.php";

$inputDate = $_GET['date'];
$valMovie = showSchedule($inputDate, connection());



$result = [
    'movieSchedule' => $valMovie,
];

header("Content-Type: application/json");

echo json_encode($result);
