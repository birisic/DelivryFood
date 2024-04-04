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
                    <div class="three-img">
                       <div class="container">
                          <div class="slider-info mb-header-spacing">
                             <h5 id="mb-restaurant-title"></h5>
                             <form class="d-flex pt-3 mx-md-0 mx-auto pb-5" action="" method="get" id="mb-search">
                                <input class="form-control mb-5" type="search" name="inputSearch" id="restaurant-input-search" placeholder="Search restaurant" aria-label="Search"/>
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

    <!-- INFO ABOUT RESTAURANT -->
    <section id="mb-restaurant-info" class="container-fluid mb-4">
        <div class="row d-flex justify-content-center">
            <div class="col-12 d-flex justify-content-center align-items-center flex-wrap">
                <div class="mb-restaurant-info-text d-flex justify-content-center align-items-center">
                    <span id="mb-restaurant-working-time" class="px-3 text-center"></span>
                    <span id="mb-restaurant-more-info" class="px-3 text-center"><button type="button" class="mb-contact-modal-btn text-warning text-decoration-none" id="mb-modal-btn" data-bs-toggle="modal" data-bs-target="#exampleModalInfo">
                        More info
                      </button>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModalInfo" tabindex="-1" aria-labelledby="exampleModalLabelInfo" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabelInfo">Information about restaurant</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <span id="moreInfoWorkingHours"></span>
                              <span id="moreInfoAddress"></span>
                              <span id="moreInfoDeliveryTime"></span>
                              <span id="moreInfoMinimalDeliveryPrice"></span>
                              <span id="moreInfoEmail"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                </div>
                <div class="mb-restaurant-info-icons d-flex justify-content-center align-items-center pt-md-0 pt-3">
                    <span id="mb-restaurant-rating" class="px-3 text-center"><i class="fa-solid fa-star text-warning"></i></span>
                    <span id="mb-restaurant-add-favorites" class="px-3 fs-4 text-center"><i class='fa-solid fa-heart'></i></span>
                </div>
                
            </div>
        </div>
    </section>

    <!-- FILTERS AND SORTS -->
    <section id="mb-restaurant-filters-sorts" class="container-fluid mb-5 pt-3 border-top">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-4">
                <div id="mb-restaurant-categories-title">
                    <h5 class="text-center">Filter by category</h5>
                </div>
                <form id="mb-restaurant-categories-spans" class="d-flex justify-content-center align-items-center flex-wrap mt-2">

                </form>
            </div>
            <div class="col-md-4 mt-md-0 mt-4">
                <form action="">
                    <div class="">
                        <div class="mb-range-text d-flex justify-content-center align-items-center">
                           <label for="mb-range" class="fs-5">Max price: </label>
                            <output class="fs-5" id="mb-range-output"> 1500 RSD</output> 
                        </div>
                        <input id="mb-range" class="form-range d-block mx-auto" type="range" value="1500" min="500" max="1500" step="100" oninput="this.previousElementSibling.lastElementChild.value = this.value + ' RSD'">
                    </div>
                </form>
            </div>
            <div class="col-md-4 mt-md-0 mt-4">
                <div id="mb-restaurant-sorts-title">
                    <h5 class="text-center">Sort by:</h5>
                </div>
                <div id="mb-restaurant-sorts-dropdown" class="d-flex justify-content-center align-items-center flex-wrap mt-2">
                    <select name="restaurantSortsSelect" id="mb-restaurant-sorts-select" class="form-select w-50">

                    </select>
                </div>
            </div>
        </div>
    </section>   

     <!-- FOOD PRINTING  -->
    <section id="mb-restaurant-food" class="container-fluid">
        <div class="row justify-content-around align-items-center" id="mb-restaurant-food-row">
            
        </div>
    </section>

    <!-- GO TO CART -->
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