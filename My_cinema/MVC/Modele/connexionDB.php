<?php

function connection()
{
            $servername = 'localhost';
            $username = 'root';
            $password = 'Lavieestbelle!44';



                $conn = new PDO("mysql:host=$servername;dbname=my_cinema", $username, $password);
              return $conn;
}