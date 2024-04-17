<?php

header("Access-Control-Allow-Origin: *");
include "../Modele/connexionDB.php";
include "../Modele/rechercheFilm.php";

$id_movie = $_GET['id_movie'];
$id_room = $_GET['id_room'];
$date_begin = $_GET['date_begin'];


addSchedule($id_movie, $id_room, $date_begin, connection());


header("Content-Type: application/json");
