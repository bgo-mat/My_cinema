<?php

function rechercheFilmDistrib($inputFilm, $inputDistributor, $conn)
{

    $inputFilm = trim($inputFilm);
    $inputDistributor = trim($inputDistributor);

    $val = $conn ->prepare("SELECT *
  FROM movie
  JOIN distributor ON distributor.id =movie.id_distributor 
  WHERE distributor.name LIKE :inputDistributor
  AND movie.title LIKE :inputFilm;");
    $inputFilm = $inputFilm . '%' ;
    $inputDistributor = $inputDistributor . '%' ;
    $val -> bindvalue(':inputFilm', $inputFilm);
    $val -> bindvalue(':inputDistributor', $inputDistributor);
    $val -> execute();
    $tabGenre = $val-> fetchAll();
    return $tabGenre;
}

function rechercheFilmGenre($inputFilm, $inputGenre, $conn)
{

    $inputFilm = trim($inputFilm);
    $inputGenre = trim($inputGenre);

    $val = $conn ->prepare("SELECT *
    FROM movie
    JOIN movie_genre ON movie_genre.id_movie=movie.id 
    JOIN genre ON movie_genre.id_genre=genre.id
    JOIN distributor ON movie.id_distributor=distributor.id 
    WHERE genre.name LIKE :inputGenre 
    AND movie.title LIKE :inputFilm;");
    $inputFilm = $inputFilm . '%' ;
    $inputGenre = $inputGenre . '%' ;
    $val -> bindvalue(':inputFilm', $inputFilm);
    $val -> bindvalue(':inputGenre', $inputGenre);
    $val -> execute();
    $tabGenre = $val-> fetchAll();
    return $tabGenre;
}

function rechercheFilmAll($inputFilm, $inputGenre, $inputDistributor, $conn)
{

    $inputFilm = trim($inputFilm);
    $inputGenre = trim($inputGenre);
    $inputDistributor = trim($inputDistributor);

    $val = $conn ->prepare("SELECT *
      FROM movie
      JOIN movie_genre ON movie_genre.id_movie=movie.id 
      JOIN genre ON movie_genre.id_genre=genre.id
      JOIN distributor ON distributor.id =movie.id_distributor 
      JOIN distributor ON movie.id_distributor=distributor.id 
      WHERE genre.name LIKE :inputGenre 
      AND distributor.name LIKE :inputDistributor 
      AND movie.title LIKE :inputFilm;");
    $inputFilm = $inputFilm . '%' ;
    $inputGenre = $inputGenre . '%' ;
    $inputDistributor = $inputDistributor . '%' ;
    $val -> bindvalue(':inputDistributor', $inputDistributor);
    $val -> bindvalue(':inputFilm', $inputFilm);
    $val -> bindvalue(':inputGenre', $inputGenre);
    $val -> execute();
    $tabGenre = $val-> fetchAll();
    return $tabGenre;
}

function rechercheFilm($inputFilm, $conn)
{
    $inputFilm = trim($inputFilm);
          $val = $conn ->prepare("SELECT * FROM movie
          JOIN distributor ON distributor.id =movie.id_distributor
           WHERE title LIKE :inputFilm;");
          $inputFilm = $inputFilm . '%' ;
          $val -> bindvalue(':inputFilm', $inputFilm);
          $val -> execute();
         $tabFilm = $val-> fetchAll();
          return $tabFilm;
}


function showSchedule($input, $conn)
{
    $input = trim($input);
          $val = $conn ->prepare("SELECT title, 
          movie_schedule.date_begin,
           movie_schedule.id_room, movie_schedule.id 
           FROM movie 
          JOIN movie_schedule ON movie_schedule.id_movie = movie.id 
          WHERE date_begin >= TIMESTAMP(:input);");
          $val -> bindvalue(':input', $input);
          $val -> execute();
         $tabFilm = $val-> fetchAll();
          return $tabFilm;
}

function addSchedule($id_movie, $id_room, $date_begin, $conn)
{

          $val = $conn ->prepare("INSERT INTO movie_schedule 
          (id_movie, id_room,date_begin)  
          VALUES (:id_movie,:id_room, TIMESTAMP(:date_begin));");
          $val -> bindvalue(':id_movie', $id_movie);
          $val -> bindvalue(':id_room', $id_room);
          $val -> bindvalue(':date_begin', $date_begin);
          $val -> execute();
         $tabFilm = $val-> fetchAll();
          return $tabFilm;
}

function deleteSchedule($input, $conn)
{
    $input = trim($input);
    $val = $conn ->prepare("DELETE FROM movie_schedule
  WHERE movie_schedule.id = :input");
    $val -> bindvalue(':input', $input);
    $val -> execute();
    $tabFilm = $val-> fetchAll();
    return $tabFilm;
}
