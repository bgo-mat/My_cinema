<?php

header("Access-Control-Allow-Origin: *");
include "../Modele/connexionDB.php";
include "../Modele/rechercheFilm.php";

$inputGenre = $_GET['inputGenre'];
$inputDistributor = $_GET['inputDistributor'];
$inputFilm = $_GET['inputName'];

if ($inputGenre === "vide" && $inputDistributor === "vide") {
    $valNomFilmExec = rechercheFilm($inputFilm, connection());
} elseif ($inputGenre === "vide" && $inputDistributor !== "vide") {
    $valNomFilmExec = rechercheFilmDistrib($inputFilm, $inputDistributor, connection());
} elseif ($inputGenre !== "vide" && $inputDistributor === "vide") {
    $valNomFilmExec = rechercheFilmGenre($inputFilm, $inputGenre, connection());
} else {
    $valNomFilmExec = rechercheFilmAll($inputFilm, $inputGenre, $inputDistributor, connection());
}

$result = [
    'film' => $valNomFilmExec,
];

header("Content-Type: application/json");

echo json_encode($result);
