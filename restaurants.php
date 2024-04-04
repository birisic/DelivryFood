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
                        <div class="slider-img two-img">
                           <div class="container">
                              <div class="slider-info ">
                                 <h5>Enjoy the best <span class="mb-span">food</span> from the best<span class="mb-span"> restaurants</span>.</h5>
                                 <div class="bottom-info">
                                    <h4 >Delivry - food delivery services</h4>
                                 </div>
                                 <form class="d-flex pt-3 mx-md-0 mx-auto pb-5" action="" method="get" id="mb-search">
                                    <input class="form-control" type="search" name="inputSearch" id="input-search" placeholder="Search restaurants" aria-label="Search"/>
                                    <!-- <button class="btn btn-warning px-3 py-1" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button> -->
                                  </form>
                              </div>
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
               <div class="clearfix"></div>
            </div>
            
        </div>
        <!-- RESTAURANTS -->
        <section class="py-lg-4 py-md-3 py-sm-3 py-3">
            <div class="container-fluid py-lg-1 py-md-1 py-sm-1">
               <div class="row">
                  <div class="col-12">
                     <h2 class="text-lg-start text-center text-dark text-capitalize jst-wthree-text mb-lg-3 mb-md-4 mb-sm-4 mb-4 ms-lg-5 ps-lg-5">All restaurants</h2>
                  </div>
               </div>
               <div class="row mb-lg-4 mb-3">
                  <div class="col-12 d-flex justify-content-start align-items-center">
                     <div id="mb-restaurants-filter-sort">
                        <h5 class="ms-lg-5 ps-lg-5">Filter/Sort by <button type="button" class="btn p-0" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-filter btn btn-warning text-white"></i></button></h5>
                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                           <div class="modal-dialog">
                           <div class="modal-content">
                              <div class="modal-header">
                                 <h4 class="modal-title fw-bold" id="exampleModalLabel">Filter</h4>
                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                 <h5>Categories</h5>
                                 <hr/>
                                 <div class="px-3" id="mb-filter-categories">
                                    <form action="" method="GET" id="mb-filter-form" class="d-flex justify-content-center align-items-center flex-wrap">
                                       
                                    </form>
                                 </div>
                              </div>
                              <div class="modal-body">
                                 <h5>Delivery</h5>
                                 <hr/>
                                 <div class="px-3" id="mb-filter-categories">
                                    <form action="" method="GET" id="" class="d-flex justify-content-start align-items-center flex-wrap">
                                       <input class="mb-filter-radio mb-width-0" type="radio" name="filterRadio" id="rbFilter1" value="0"/>
                                       <label for="rbFilter1" class="mb-filter-delivery-label mb-filter-delivery-active text-warning rounded-pill m-2">Free</label>
                                       <input class="mb-filter-radio mb-width-0" type="radio" name="filterRadio" id="rbFilter2" value="1"/>
                                       <label for="rbFilter2" class="mb-filter-delivery-label text-warning rounded-pill m-2">Paid</label>
                                    </form>
                                 </div>
                              </div>
                              <div class="modal-header">
                                 <h4 class="modal-title fw-bold" id="exampleModalLabel">Sort</h4>
                                 <hr/>
                              </div>
                              <div class="modal-body">
                                 <div class="px-3">
                                    <form action="" method="GET" id="" class="d-flex justify-content-center align-items-center flex-wrap">
                                       <input type="radio" name="sortRadio" id="rbSort1" class="mb-sort-radio mb-width-0" value="0"/>
                                       <label for="rbSort1" class="mb-sort-label mb-sort-active text-warning rounded-pill m-2">Najpopularniji</label>
                                       <input type="radio" name="sortRadio" id="rbSort2" class="mb-sort-radio mb-width-0" value="1"/>
                                       <label for="rbSort2" class="mb-sort-label text-warning rounded-pill m-2">Cena dostave opadajuća</label>
                                       <input type="radio" name="sortRadio" id="rbSort3" class="mb-sort-radio mb-width-0" value="2"/>
                                       <label for="rbSort3" class="mb-sort-label text-warning rounded-pill m-2">Najbrža dostava</label>
                                    </form>
                                 </div>
                              </div>
                              <div class="modal-footer">
                                 <button type="button" class="btn border" data-bs-dismiss="modal">Close</button>
                                 <button type="button" class="btn btn-warning text-white" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btnApply">Apply changes</button>
                              </div>
                           </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row pt-lg-3 px-lg-3 d-flex justify-content-center align-items-center flex-wrap" id="mb-restaurants">
                  
               </div>         
            </div>
         </section>
         <?php include_once("includes/footer.php"); $connection = null;?>
     
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