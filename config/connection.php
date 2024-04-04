<?php
    define("SERVER", "localhost");
    define("DATABASE", "delivry-food-delivery");
    define("USERNAME", "root");
    define("PASSWORD", "");

    try {
        
        $connection = new PDO("mysql:host=".SERVER.";dbname=".DATABASE,USERNAME,PASSWORD);
        
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);


    } catch (PDOException $ex) {
        echo "nema konekcije ".$ex->getMessage();
    }
?>