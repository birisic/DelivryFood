<?php
    session_start();
    include("utility.php");
    if (isset($_POST['btnRegister'])) {
        //GET INPUTS
        $userName = $_POST['userName'];
        $userLastName = $_POST['userLastName'];
        $email = $_POST['userEmail'];
        $password = $_POST['userPass'];
        $passwordConfirm = $_POST['confirmUserPass'];
        include("../config/connection.php");
        include("functions.php");
        // var_dump($connection);

        //CHECK INPUTS
        $errors = registerInputsCheck($userName, $userLastName, $email, $password, $passwordConfirm);

        //REGISTER NEW USER
        $success = false;
        if (count($errors) == 0) {
            //hash password
            $hashPassword = md5($password . "conststring");

            //upit za bazu
            $query = $connection->prepare("INSERT INTO users (first_name,last_name,email,password,date_added) VALUES (:first_name, :last_name, :email, :hashPassword, now())");

            //parameters
            $query->bindParam(':first_name', $userName);
            $query->bindParam(':last_name', $userLastName);
            $query->bindParam(':email', $email);
            $query->bindParam(':hashPassword', $hashPassword);

            $query->execute();//$result = 


            $affectedRows = $connection->exec($query);
            $success = $affectedRows > 0;
            redirectPage("../index.php");
        }
        else {
            redirectPage("../form-register.php");
        }
    }
?>