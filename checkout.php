<?php
    session_start();
    include_once("logic/utility.php");
    include_once("config/connection.php");
    include_once("logic/functions.php");
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
        <title>Delivry - Your Cart</title>
     </head>
<body>
    <?php
      if ($connection) {
         include_once("includes/navbar.php");
      }
   ?>


    <!--subscribe-->
    <section class="subscribe-footer py-lg-5 py-md-3 py-sm-3 py-3">
        <h2 class="text-center text-white mb-padding-top">Your information</h2>
        <div class="container mt-3">
           <div class="row mx-auto px-0">
               <div class="col-12 px-0 mx-auto">
                   <form action="" id="mb-form-shopping" name="form-shopping">
                       <table class="mb-table-shopping" align="center">
                           <tbody>
                               <tr>
                                   <td>
                                       <div class="mb-3">
                                           <label for="user-name" class="form-label">Name</label><span class="d-none mb-shopping-required px-1">*</span>
                                           <input type="text" class="form-control" id="user-name" placeholder="Pera"/>
                                           <span class="d-none mb-span-danger text-danger"></span>
                                       </div>
                                   </td>
                                   <td>
                                       <div class="mb-3">
                                           <label for="user-lastname" class="form-label">Last name</label><span class="d-none mb-shopping-required px-1">*</span>
                                           <input type="text" class="form-control" id="user-lastname" placeholder="Perić"/>
                                           <span class="d-none mb-span-danger text-danger"></span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3">
                                           <label for="user-address" class="form-label">Address</label><span class="d-none mb-shopping-required px-1">*</span>
                                           <input type="text" class="form-control" id="user-address" placeholder="Trg republike 3"/>
                                           <span class="d-none mb-span-danger-large text-danger"></span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3">
                                           <label for="user-city" class="form-label">City</label><span class="d-none mb-shopping-required px-1">*</span>
                                           <input type="text" class="form-control" id="user-city" placeholder="Beograd 11000"/>
                                           <span class="d-none mb-span-danger-large text-danger"></span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3">
                                           <label for="user-phone" class="form-label">Phone number</label><span class="d-none mb-shopping-required px-1">*</span>
                                           <input type="tel" class="form-control" id="user-phone" placeholder="06..."/>
                                           <span class="d-none mb-span-danger-large text-danger"></span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3">
                                           <label for="user-email" class="form-label">Email</label><span class="d-none mb-shopping-required px-1">*</span>
                                           <input type="email" class="form-control" id="user-email" placeholder="peraperic@gmail.com"/>
                                           <span class="d-none mb-span-danger-large text-danger"></span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2" align="center">
                                       <div class="mb-3">
                                           <label for="fizicko-lice-radio" class="form-label">Pay with card</label>
                                           <input type="radio" name="orderer" value="fizicko-lice" id="fizicko-lice-radio" class="me-3" checked="checked"/>
                                           <label for="preduzece-radio" class="form-label">Pay with cash</label>
                                           <input type="radio" name="orderer" value="preduzece" id="preduzece-radio" class="me-3"/>
                                       </div>
                                       <span class="d-none mb-span-danger-large text-danger"></span>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3 text-center">
                                           <input type="checkbox" value="TermsOfService" name="terms" id="terms"/>
                                           <label for="terms" class="form-label">I have read and I fully agree with the<button type="button" class="mb-contact-modal-btn" id="mb-modal-btn" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                               Terms of Service
                                             </button><span class="mb-shopping-required px-1 d-none">*</span>
                                             
                                             <!-- Modal -->
                                             <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                               <div class="modal-dialog">
                                                 <div class="modal-content">
                                                   <div class="modal-header">
                                                     <h5 class="modal-title" id="exampleModalLabel2">Terms of Service</h5>
                                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                   </div>
                                                   <div class="modal-body">
                                                     <p>Terms of Service say that you, the customer, are fully obligated to pay the costs of delivery.</p>
                                                   </div>
                                                   <div class="modal-footer">
                                                     <button type="button" class="btn btn-warning text-white" data-bs-dismiss="modal">Accept</button>
                                                   </div>
                                                 </div>
                                               </div>
                                             </div>
                                           </label>
                                           <span class="d-none mb-span-danger-large text-danger"></span>
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td colspan="2">
                                       <div class="mb-3 text-center">
                                           <input type="button" value="Order" id="btn-order" name="btn-order" class="btn btn-warning text-white"/>
                                       </div>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </form>
               </div>
           </div>
       </div>
       </section>
       <section class="buttom-footer py-lg-4 py-md-3 py-sm-3 py-3">
        <div class="container pt-lg-5 pt-md-5 pt-sm-4 pt-4">
           <div class="row footer-agile-grids ">
                    <div class="col-lg-3 col-md-6 col-12 footer-header pl-0">
                       <h4><a href="index.php" class="text-warning fw-bold">Delivry</a></h4>
                       <p>Enjoy your every meal.</p>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 footer-para">
                        <h4 class="pb-lg-3 pb-3 text-warning fw-bold">Contact Us</h4>
                       <p>Belgrade, Serbia<br>Cetinjska 3</p>
                       <p>+381 062318723</p>
                       <p><a href="mailto:birisicmartin02@gmail.com" class="text-warning">birisicmartin02&#64;gmail&#46;com</a></p>
                    </div>
                    <div class="col-lg-3 col-12 my-lg-0 my-3 wthree-left-right">
                       <h4 class="pb-lg-3 pb-3">About Us</h4>
                       <div class="address-para">
                          <p>We are a dedicated team of professionals who believe in making the delivery process of food simple, fast, and reliable.</p>
                       </div>
                    </div>
                    <div class="col-lg-3 col-12 wthree-left-right ">
                       <h4 class="pb-lg-3 pb-3">Follow us</h4>
                       <div class="icons">
                          <ul>
                             <li><a href="https://www.facebook.com" target="_blank"><i class="fa-brands fa-square-facebook"></i></a></li>
                             <li><a href="mailto:birisicmartin02@gmail.com" target="_blank"><i class="fa-regular fa-envelope"></i></a></li>
                             <li><a href="https://www.instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
                             <li><a href="sitemap.xml" target="_blank"><i class="fa-solid fa-sitemap"></i></a></li>
                             <li><a href="documentation.pdf" target="_blank"><i class="fa-solid fa-book"></i></a></li>
                          </ul>
                       </div>
                    </div>
                 </div>
           </div>
        </div>
        </section>
        <footer>
            <p class="mb-footer-copy text-muted">&copy;2023 Delivry. All Rights Reserved | Design by <a href="http://www.W3Layouts.com" target="_blank" class="text-muted">W3Layouts</a></p>
        </footer>


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
       var $name = $('span', $info);
       $name.text($tab.text());
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