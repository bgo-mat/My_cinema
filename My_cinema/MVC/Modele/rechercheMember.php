<?php

function rechercheMemberAllName($inputFirst, $inputLast, $conn)
{
    $inputFirst = trim($inputFirst);
    $inputLast = trim($inputLast);
    $val = $conn ->prepare("SELECT * FROM user WHERE user.lastname 
    LIKE :inputLast AND user.firstname LIKE :inputFirst;");
    $valeurLast = $inputLast . '%';
    $valeurFirst = $inputFirst . '%';
    $val -> bindvalue(':inputLast', $valeurLast);
    $val -> bindvalue(':inputFirst', $valeurFirst);
    $val -> execute();
    $tabFilm = $val-> fetchAll();
    return $tabFilm;
}
function rechercheMember($conn)
{
    $val = $conn ->query("SELECT * FROM user");
    $tabFilm = $val-> fetchAll();
    return $tabFilm;
}
function rechercheMemberLastName($input, $conn)
{
    $input = trim($input);
    $val = $conn ->prepare("SELECT * FROM user 
    WHERE user.lastname LIKE :input;");
    $valeur = $input . '%';
    $val -> bindvalue(':input', $valeur);
    $val -> execute();
    $tabFilm = $val-> fetchAll();
    return $tabFilm;
}

function rechercheMemberFirstName($input, $conn)
{
    $input = trim($input);
    $val = $conn ->prepare("SELECT * FROM user 
    WHERE user.firstname LIKE :input;");
    $valeur = $input . '%';
    $val -> bindvalue(':input', $valeur);
    $val -> execute();
    $tabFilm = $val-> fetchAll();
    return $tabFilm;
}

function rechercheFilmId($input, $conn)
{
    $input = trim($input);
    if (empty($input)) {
        $val = $conn->prepare("SELECT id FROM movie;");
    } else {
        $val = $conn->prepare("SELECT id FROM movie
         WHERE title LIKE :input;");
        $valeur = $input . '%';
        $val->bindvalue(':input', $valeur);
    }
    $val -> execute();
    $tabFilm = $val-> fetchAll();
    return $tabFilm;
}

function rechercheFilmNom($input, $conn)
{
    $input = trim($input);
    if (empty($input)) {
        $val = $conn->prepare("SELECT title FROM movie;");
    } else {
        $val = $conn->prepare("SELECT title FROM movie 
        WHERE title LIKE :input;");
        $valeur = $input . '%';
        $val->bindvalue(':input', $valeur);
    }
    $val -> execute();
    $tabFilm = $val-> fetchAll();
    return $tabFilm;
}

function rechercheSub($input, $conn)
{
    $demandeSub = $conn ->query("SELECT subscription.name FROM subscription   
    JOIN membership 
    ON membership.id_subscription = subscription.id   
    JOIN user 
    ON user.id = membership.id_user    
    WHERE membership.id_user = " . $input . ";");
    $tabSub = $demandeSub-> fetchAll();
    return $tabSub;
}

function changeSub($input, $conn, $inputIdSub)
{
    $test = $conn ->prepare("UPDATE membership 
    SET id_subscription=:subscription 
    WHERE id_user =:id; ");
    $test -> bindvalue(':subscription', $inputIdSub);
    $test -> bindvalue(':id', $input);
    $test -> execute();
}

function rechercheHistorical($input, $conn)
{
    $input = trim($input);
    $val = $conn ->prepare("SELECT * FROM movie
    JOIN historical ON historical.movie_id = movie.id 
    WHERE historical.user_id =:input;");
    $val -> bindvalue(':input', $input);
    $val -> execute();
    $tabHistori = $val-> fetchAll();
    return $tabHistori;
}
function addOnHistorical($inputUserId, $inputMovieId, $inputDate, $conn)
{
    $inputUserId = trim($inputUserId);
    $inputMovieId = trim($inputMovieId);
    $inputDate = trim($inputDate);
    $val = $conn ->prepare("INSERT INTO historical 
    (user_id, movie_id, date_of_view) 
    VALUES (:inputUserId,:inputMovieId,:inputDate);");
    $val -> bindvalue(':inputUserId', $inputUserId);
    $val -> bindvalue(':inputMovieId', $inputMovieId);
    $val -> bindvalue(':inputDate', $inputDate);
    $val -> execute();
}

function deleteOnHistorical($inputMovieId, $conn)
{
    $inputMovieId = trim($inputMovieId);
    $val = $conn ->prepare("DELETE FROM `historical`
     WHERE add_id=:inputMovieId");
    $val -> bindvalue(':inputMovieId', $inputMovieId);
    $val -> execute();
}
