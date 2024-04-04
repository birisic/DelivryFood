<?php
    function printNavigation(){
        global $connection;

        $query = "SELECT * FROM `navigation`";

        $result = $connection->query($query)->fetchAll();

        return $result;
    }


    function logIn($email, $password){
        global $connection;

        $hashPassword = md5($password . "conststring");

        $query = $connection->prepare("SELECT u.id, u.first_name, u.last_name, r.role FROM users u INNER JOIN roles r ON u.role_id = r.id WHERE u.email = :email AND u.password = :hashPassword");

        $query->bindParam(":email", $email);
        $query->bindParam(":hashPassword", $hashPassword);

        $query->execute();

        $result = $query->fetch();

        return $result;
    }


    function loginInputsCheck($email, $password){
        // global $connection;

        $rePassword = "/^[A-Za-z\d]{8,20}$/";

        $errors = [];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors["emailError"] = "Email nije u dobrom formatu. Primer: username@gmail.com...";
        }
    
        if (!preg_match($rePassword, $password)) {
            $errors["passwordError"] = "Lozinka mora sadržati 8-20 karaktera i to samo slova i brojeve.";
        }
        return $errors;
    }


    function registerInputsCheck($userName, $userLastName, $email, $password, $passwordConfirm){
        global $connection;
    
        //REGEXES
        $reFullName = "/^([A-ZŠČĆĐŽ][a-zščćđž]{2,14}){1,3}$/";
        //$reEmail = "/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
        $rePassword = "/^[A-Za-z\d]{8,20}$/";
    
        $errors = [];
    
        //CHECK VALUES
        if (!preg_match($reFullName, $userName)) {
            $errors["nameError"] = "Mora sadržati bar jedno veliko slovo i maksimum 15 malih.";
        }
    
        if (!preg_match($reFullName, $userLastName)) {
            $errors["lastNameError"] = "Mora sadržati bar jedno veliko slovo i maksimum 15 malih.";
        }
    
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors["emailError"] = "Email nije u dobrom formatu. Primer: username@gmail.com...";
        }
        else {
            $query = "SELECT COUNT(*) AS count FROM users WHERE email = '$email'";
            $result = $connection->query($query)->fetch();
            if ($result->count > 0) {
                $errors["emailError"] = "Email je u upotrebi.";
            }
        }
    
        if (!preg_match($rePassword, $password)) {
            $errors["passwordError"] = "Lozinka mora sadržati 8-20 karaktera i to samo slova i brojeve.";
        }
        else {
            if ($passwordConfirm != $password) {
                $errors["confirmPasswordError"] = "Lozinka nije ista!";
            }
        }

        return $errors;
    }
?>