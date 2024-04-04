<?php
   session_start();
   include_once("logic/utility.php");
   include_once("config/connection.php");
   include_once("logic/functions.php");
?>
<!--A Design by W3layouts
   Author: W3layout
   Author URL: http://w3layouts.com
   License: Creative Commons Attribution 3.0 Unported
   License URL: http://creativecommons.org/licenses/by/3.0/
   -->
<!DOCTYPE html>
<html lang="en">
   <head>
      <!--meta tags -->
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="keywords" content="Delivry Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />

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
      <title>Delivry - Order and eat within minutes!</title>
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
                     <div class="slider-img one-img">
                        <div class="container">
                           <div class="slider-info ">
                              <h5>Enjoy your every<span class="mb-span"> meal</span>.</h5>
                              <div class="bottom-info">
                                 <h4 >Delivry - food delivery services</h4>
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>
               </ul>
            </div>

            <div class="clearfix"></div>
         </div>
         
      </div>
      <!-- categories -->
      <div class="container mb-5">
         <div class="row">
            <div class="col-12">
               <h2 class="text-lg-start text-center fw-bold">Categories</h2>
            </div>
         </div>
      </div>
      <!-- owl carousel -->
      <div id="owl-example" class="owl-carousel owl-theme">
         
       </div>

      <!--about -->
      <section class="about py-lg-4 py-md-3 py-sm-3 py-3" id="about">
         <div class="container py-lg-5 py-md-5 py-sm-4 py-4">
            <div class="row agile-abt-info ">
               <div class="col-lg-6 col-12 w3layouts-left-side-img mt-5 d-flex justify-content-center align-items-center">
                  <img src="images/delivery.jpg" alt="delivery" class="img-fluid"/>
               </div>
               <div class="col-lg-6 col-12 info-sub-w3 pb-lg-3 pb-md-2 pb-2">
                  <div class="jst-wthree-text text-lg-start text-center pb-3">
                     <h2>Welcome To <span class="mb-span">Delivry</span>!
                     </h2>
                     <p class="text-muted">True joy starts with food.</p>
                  </div>
                  <p class="mb-text">We are a dedicated team of professionals who believe in making the delivery process of food <strong>simple, fast, and reliable.</strong> 
                  </p><p class="mb-text-hide">Our mission is to provide a seamless delivery experience for our customers. We understand that <strong>time is a valuable commodity,</strong> and our goal is to help you<strong> save time and effort</strong> by taking care of your delivery needs. Delivry was founded on the principle of providing a convenient and <strong>stress-free delivery experience.</strong><br/>
                     We use state-of-the-art technology to manage and track your deliveries, ensuring that your food <strong>reaches its destination safely</strong> and efficiently. Our drivers are professional, reliable and insured, giving you peace of mind that <strong>your food is in good hands. </strong>   
                  </p>
                  <button class="btn show_hide border">Read more</button>
               </div>
            </div>
         </div>
      </section>
      <!--Popular restaurants-->
      <section class="our-menu py-lg-4 py-md-3 py-sm-3 py-3">
         <div class="container-fluid py-lg-5 py-md-5 py-sm-4 py-3">
            <div class="row">
               <div class="col-12 mb-3">
                  <h2 class="text-lg-start text-center text-white text-capitalize jst-wthree-text mb-lg-5 mb-md-4 mb-sm-4 mb-4 ms-lg-5 ps-lg-5">Popular restaurants</h2>
               </div>
            </div>
            <div class="row justify-content-center" id="mb-popular-restaurants-row">
               
            </div>         
         </div>
      </section>
      <!--team -->
      <section class="team py-lg-4 py-md-3 py-sm-3 py-3">
         <div class="container py-lg-5 py-md-5 py-sm-4 py-4">
            <h2 class="jst-wthree-text text-lg-end text-center text-capitalize fw-bold mb-lg-5 mb-md-4 mb-sm-4 mb-3 me-lg-5 pe-lg-5">Your favorite employees</h2>
            <div class="row client-agile-says d-flex justify-content-around align-items-center">
               <div class="col-lg-3 col-md-6 col-sm-6 item-clents">
                  <div class="gap-one">
                     <div class="img-text">
                        <img src="images/t1.jpg" alt="restaurant-eployee" class="img-fluid"/>
                     </div>
                     <div class="team-text">
                        <div class="clt-syas-agile">
                           <h5>Milly kent</h5>
                           <span class="text-muted">KFC</span>
                           <p>Main Chef at KFC</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-lg-3 col-md-6 col-sm-6 item-clents">
                  <div class="gap-two">
                     <div class="img-text">
                        <img src="images/t2.jpg" alt="restaurant-eployee" class="img-fluid"/>
                     </div>
                     <div class="team-text">
                        <div class="clt-syas-agile">
                           <h5>Omar Deo</h5>
                           <span class="text-muted">Richard Gyros</span>
                           <p>Your favorite Chef's assistant</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-lg-3 col-md-6 col-sm-6 me-lg-5 item-clents">
                  <div class="gap-three">
                     <div class="img-text">
                        <img src="images/t3.jpg" alt="restaurant-eployee" class="img-fluid"/>
                     </div>
                     <div class="team-text">
                        <div class="clt-syas-agile">
                           <h5>Clark Kent</h5>
                           <span class="text-muted">Crni Đorđe</span>
                           <p>The driver that always delivers on time</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-lg-3 col-md-6 col-sm-6 item-clents ">
                  <div class="gap-four">
                     <div class="img-text">
                        <img src="images/t4.jpg" alt="restaurant-eployee" class="img-fluid"/>
                     </div>
                     <div class="team-text">
                        <div class="clt-syas-agile">
                           <h5>Sam Will</h5>
                           <span class="text-muted">Valter</span>
                           <p>New Cook at Valter's</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-lg-3 col-md-6 col-sm-6 item-clents">
                  <div class="gap-five">
                     <div class="img-text">
                        <img src="images/t1.jpg" alt="restaurant-eployee" class="img-fluid"/>
                     </div>
                     <div class="team-text">
                        <div class="clt-syas-agile">
                           <h5>Willy West</h5>
                           <span class="text-muted">Milky</span>
                           <p>Everybody's favorite Waiter</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-lg-3 col-md-6 col-sm-6 item-clents">
                  <div class="gap-six">
                     <div class="img-text">
                        <img src="images/t2.jpg" alt="restaurant-eployee" class="img-fluid"/>
                     </div>
                     <div class="team-text">
                        <div class="clt-syas-agile">
                           <h5>Max Son</h5>
                           <span class="text-muted">Chickenero</span>
                           <p>New face in the Chickenero's kitchen</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
        <?php
         include_once("includes/footer.php");
         $connection = null;
        ?>


      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
      <!--responsiveslides banner-->

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
      <script src="owl-carousel/owl.carousel.min.js"></script>
      <script src="js/main.js"></script>
   </body>
</html>