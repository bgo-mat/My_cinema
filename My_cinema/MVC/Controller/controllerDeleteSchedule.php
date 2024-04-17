<?php

header("Access-Control-Allow-Origin: *");
include "../Modele/connexionDB.php";
include "../Modele/rechercheFilm.php";

$input = $_GET['id'];
deleteSchedule($input, connection());

header("Content-Type: application/json");
