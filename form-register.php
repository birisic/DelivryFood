<?php
    session_start();
    include_once("logic/utility.php");
    if (isset($_SESSION['user'])) {
        redirectPage("user-profile.php");
    }

    include_once("config/connection.php");
    include_once("logic/functions.php");

    //REGISTER
    if (isset($_POST['btnRegister'])) {
        //GET INPUTS
        $userName = $_POST['userName'];
        $userLastName = $_POST['userLastName'];
        $email = $_POST['userEmail'];
        $password = $_POST['userPass'];
        $passwordConfirm = $_POST['confirmUserPass'];

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

            //FIND THIS USER AND LOGIN
            $loggedUser = logIn($email, $password);

            if ($loggedUser) {
                $_SESSION['user'] = $loggedUser;

                if ($loggedUser->role == "buyer") {
                    redirectPage("user-profile.php");
                }
                // else {
                //     //ADMIN
                //     redirectPage("author.php");
                // }
            }
            else {
                $_SESSION['error-login'] = "Error while logging in.";
            }


            // $affectedRows = $query->fetch();
            // $success = $affectedRows > 0;
            // redirectPage("index.php");
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <!--meta tags -->
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="keywords" content="Delivry Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />
        <meta name="description" content="Delivry is a wide-spread online food delivery service, known for it's long and rich history of serving customers only the best food around! As a successfull online business, Delivry is most proud of it's low-complaint ratings and positive feedback from happy customers."/>
        <meta name="author" content="Martin Birišić"/>
  
        <!--booststrap-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
        
        <!-- font-awesome icons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  
        <!-- font -->
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans+Caption&display=swap" rel="stylesheet"/>
  
        <!--stylesheets-->
        <link rel="stylesheet" href="owl-carousel/owl.carousel.css"/>
        <link rel="stylesheet" href="owl-carousel/owl.theme.css"/>
  
        <!-- favicon -->
        <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"/>
        <link rel="manifest" href="images/site.webmanifest"/>
  
        <!-- main css -->
        <link href="css/style.css" rel="stylesheet" type="text/css"/>
        <title>Delivry - Order Best Restaurants!</title>
     </head>
<body>
   <?php
      if ($connection) {
         include_once("includes/navbar.php");
      }
   ?>
    <div class="header-main" id="home">
        <div class="slider">
           <div class="callbacks_container">
              <ul class="rslides" id="slider4">
                 <li>
                    <div class="three-img">
                       <div class="container">
                          <div class="slider-info mb-header-spacing">
                             <h5 id="mb-restaurant-title">Register</h5>
                             
                          </div>
                       </div>
                    </div>
                 </li>
              </ul>
           </div>
           <div class="clearfix"></div>
        </div>
      </div>

      <div class="container">
        <div class="row">
            <div class="col-lg-5 col-md-6 col-11 mx-auto">
            <!--    logic/register.php-->
            <form action="<?php $_SERVER['PHP_SELF'];?>" method="POST" onsubmit="return formValidationOnSubmit()" id="mb-form-shopping" name="form-shopping">
                       <table class="mb-table-register" align="center">
                           <tbody>
                               <tr>
                                   <td>
                                       <div class="mb-3">
                                           <label for="user-name" class="form-label text-dark">Name</label>
                                           <span class="<?=isset($errors["nameError"])?"d-inline-block":"d-none";?> mb-shopping-required px-1">*</span>
                                           <input type="text" class="form-control" name="userName" id="user-name" placeholder="Pera" 
                                           value="<?=isset($_POST['userName'])?$userName:""?>"/>
                                           <span class="<?=isset($errors["nameError"])?"d-block":"d-none";?> mb-span-danger text-danger">
                                                <?= isset($errors["nameError"])?$errors['nameError']:"";?>
                                            </span>
                                       </div>
                                   </td>
                                   <td>
                                       <div class="mb-3">
                                           <label for="user-lastname" class="form-label text-dark">Last name</label>
                                           <span class="<?=isset($errors["lastNameError"])?"d-inline-block":"d-none";?> mb-shopping-required px-1">*</span>
                                           <input type="text" class="form-control" name="userLastName" id="user-lastname" placeholder="Perić"
                                           value="<?=isset($_POST['userLastName'])?$userLastName:""?>"/>
                                           <span class="<?=isset($errors["lastNameError"])?"d-block":"d-none";?> mb-span-danger text-danger">
                                                <?= isset($errors["lastNameError"])?$errors['lastNameError']:"";?>
                                            </span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3">
                                           <label for="user-email" class="form-label text-dark">Email</label>
                                           <span class="<?= isset($errors["emailError"])?"d-inline-block":"d-none";?> mb-shopping-required px-1">*</span>
                                           <input type="email" class="form-control" name="userEmail" id="user-email" placeholder="peraperic@gmail.com" value="<?=isset($_POST['userEmail'])?$email:""?>"/>
                                           <span class="<?= isset($errors["emailError"])?"d-block":"d-none";?> mb-span-danger-large text-danger">
                                                <?= isset($errors["emailError"])?$errors['emailError']:"";?>
                                            </span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3">
                                           <label for="user-password" class="form-label text-dark">Password</label>
                                           <span class="<?= isset($errors["passwordError"])?"d-inline-block":"d-none";?> mb-shopping-required px-1">*</span>
                                           <input type="password" class="form-control" name="userPass" id="user-password"/>
                                           <span class="<?= isset($errors["passwordError"])?"d-block":"d-none";?> mb-span-danger-large text-danger">
                                                <?= isset($errors["passwordError"])?$errors['passwordError']:"";?>
                                            </span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3">
                                           <label for="user-confirm-password" class="form-label text-dark">Confirm password</label>
                                           <span class="<?= isset($errors["confirmPasswordError"])?"d-inline-block":"d-none";?> mb-shopping-required px-1">*</span>
                                           <input type="password" class="form-control" name="confirmUserPass" id="user-confirm-password"/>
                                           <span class="<?= isset($errors["confirmPasswordError"])?"d-block":"d-none";?> mb-span-danger-large text-danger">
                                                <?= isset($errors["confirmPasswordError"])?$errors["confirmPasswordError"]:"d-none";?>
                                            </span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3 text-center">
                                           <input type="submit" value="Register" id="btn-register" name="btnRegister" class="btn btn-warning text-white"/>
                                       </div>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </form>
                    <div class="mb-log-link mb-5">
                        <p class="text-center">Already have an account? <a class="text-warning fw-bold" href="form-login.php">Log in</a>
</p>
                    </div>
            </div>
        </div>
      </div>


    <?php 
      include_once("includes/footer.php");
      $connection = null;
    ?>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>    

    <!--responsive tabs-->	 
    <script src="js/easy-responsive-tabs.js"></script>
    <script>
       $(document).ready(function () {
       $('#horizontalTab').easyResponsiveTabs({
       type: 'default', //Types: default, vertical, accordion           
       width: 'auto', //auto or any width like 600px
       fit: true,   // 100% fit in a container
       closed: 'accordion', // Start closed if in accordion view
       activate: function(event) { // Callback function if tab is switched
       var $tab = $(this);
       var $info = $('#tabInfo');
       var $userName = $('span', $info);
       $userName.text($tab.text());
       $info.show();
       }
       });
       });
        
    </script>

    <!--Scrolling menu-->	 
    <script>
       jQuery.fn.liScroll = function(settings) {
           settings = jQuery.extend({
               travelocity: 0.01
               }, settings);		
               return this.each(function(){
                       var $strip = jQuery(this);
                       $strip.addClass("newsticker")
                       var stripHeight = 1;
                       $strip.find("li").each(function(i){
                           stripHeight += jQuery(this, i).outerHeight(true); // thanks to Michael Haszprunar and Fabien Volpi
                       });
                       var $mask = $strip.wrap("<div class='mask'></div>");
                       var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");								
                       var containerHeight = $strip.parent().parent().height();	//a.k.a. 'mask' width 	
                       $strip.height(stripHeight);			
                       var totalTravel = stripHeight;
                       var defTiming = totalTravel/settings.travelocity;	// thanks to Scott Waye		
                       function scrollnews(spazio, tempo){
                       $strip.animate({top: '-='+ spazio}, tempo, "linear", function(){$strip.css("top", containerHeight); scrollnews(totalTravel, defTiming);});
                       }
                       scrollnews(totalTravel, defTiming);				
                       $strip.hover(function(){
                       jQuery(this).stop();
                       },
                       function(){
                       var offset = jQuery(this).offset();
                       var residualSpace = offset.top + stripHeight;
                       var residualTime = residualSpace/settings.travelocity;
                       scrollnews(residualSpace, residualTime);
                       });			
               });	
       };
       
       $(function(){
           $("ul#ticker01").liScroll();
       });		  
        
    </script>


    <!-- start-smoth-scrolling -->
    <script src="js/move-top.js"></script>
    <script src="js/easing.js"></script>

    <script>
       jQuery(document).ready(function ($) {
           $(".scroll").click(function (event) {
               event.preventDefault();
               $('html,body').animate({
                   scrollTop: $(this.hash).offset().top
               }, 900);
           });
       });
    </script>

    <script>
       $(document).ready(function () {
       
           var defaults = {
               containerID: 'toTop', // fading element id
               containerHoverID: 'toTopHover', // fading element hover id
               scrollSpeed: 1200,
               easingType: 'linear'
           };
       
       
           $().UItoTop({
               easingType: 'easeOutQuart'
           });
       
       });
    </script>


    <!-- MY SCRIPTS -->
    <script src="js/main.js"></script>
</body>
</html>