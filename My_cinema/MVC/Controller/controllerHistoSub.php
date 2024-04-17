<?php

header("Access-Control-Allow-Origin: *");
include "../Modele/connexionDB.php";
include "../Modele/rechercheMember.php";


    $memberId = $_GET['memberId'];


if (isset($_GET['filmName']) && !empty($_GET['filmName'])) {
    $inputFilm = $_GET['filmName'];
    $nomFilm = rechercheFilmNom($inputFilm, connection());
} else {
    $nomFilm = rechercheFilmNom("", connection());
}


if (empty($_GET['filmNameChange'])) {
    $idFilm = "vide";
} elseif (empty($_GET['filmNameChange']) == false) {
    $inputFilm = $_GET['filmNameChange'] ;
    $nomFilm = rechercheFilmNom($inputFilm, connection());
    $inputDate = $_GET['dateAdd'];
    $idFilm = rechercheFilmId($nomFilm[0][0], connection());
    addOnHistorical($memberId, $idFilm[0][0], $inputDate, connection());
}

if (empty($_GET['filmId'])) {
} elseif (empty($_GET['filmId']) == false) {
    $valHisto = rechercheHistorical($memberId, connection());
    deleteOnHistorical($valHisto[0]["add_id"], connection());
}



    $valHisto = rechercheHistorical($memberId, connection());

if (empty($_GET['inputSubId'])) {
    $inputSubId = "vide";
} elseif (empty($_GET['inputSubId']) == false) {
    $inputSubId = $_GET['inputSubId'];
    changeSub($memberId, connection(), $inputSubId);
}


    $valSub = rechercheSub($memberId, connection());

if (empty($valSub) == true) {
    changeSub($memberId, connection(), 5);
    $valSub = "No Sub";
}




$result = [
   'subInfo' => $valSub,
    'histoInfo' => $valHisto,
    'nomFilm' => $nomFilm,
];

header("Content-Type: application/json");

echo json_encode($result);
