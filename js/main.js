//BASE CONSTANTS
const BASE_IMG = "images/";
const BASE_DATA = "data/";


//GET JSON DATA AND STORE IT IN LOCALSTORAGE BEFORE FULL PAGE LOADS
if (!localStorage.getItem("categories-food.json")) {
    ajaxCallback("categories-food.json", saveToLocalStorage);
}
if (!localStorage.getItem("navigation.json")) {
    ajaxCallback("navigation.json", saveToLocalStorage);
}
if (!localStorage.getItem("restaurants.json")) {
    ajaxCallback("restaurants.json", saveToLocalStorage);
}


//SAVE DATA TO ARRAYS GLOBALLY
let foodCategories = JSON.parse(localStorage.getItem("categories-food.json"));
let restaurants = JSON.parse(localStorage.getItem("restaurants.json"));
let newRestaurants = [];


//ARRAYS FOR LATER
let initialCategories = [1,2,3,4,5,6,7,8,9,10,11,12];
let initialDelivery = 0;
let initialSort = ;
let selectedFiltersCategories = [];
let selectedFilterDelivery = 0;


//LOAD PAGE
$(document).ready(function(){
    //console.log(window.location.pathname);
    //CREATE NAVBAR
    createNavbar();

    //NAVBAR SHRINK AND INCREASE OPACITY ON SCROLL
    navbarShrinkOnScroll();
    
    //INDEX PAGE
    if (window.location.pathname == "/delivry/index.html" || window.location.pathname == "/delivry/") {//include repository name
        //OWL CAROUSEL FOOD CATEGORIES
        foodCategoriesOwlCarouselPrint();
        $("#owl-example").owlCarousel();


        //READ MORE/LESS ABOUT SECTION
        readMoreOrLess();
    }
    
    //RESTAURANTS PAGE
    //if (window.location.pathname == "/delivry/restaurants.html") {

        //CREATE CATEGORY FILTERS
        createCategoryFilters();
        showClickedFilters();

        //RADIO FILTERS DELIVERY
        showClickedRadioFilter()

        //RADIO SORT
        showClickedRadioSort();

        //PRINT DEFAULT OR FILTERED RESTAURANTS
        printRestaurants(initialCategories, initialDelivery, initialSort);


        //LISTEN FOR SELECTED CATEGORIES
        //$(document).on("click", "") 



        //LISTEN FOR CONFIRM FILTERS/SORTS BUTTON
        $(document).on("click","button#btnApply", function(){
            printRestaurants(selectedFiltersCategories, selectedFilterDelivery, selectedSort);//, selectedFilterDelivery, selectedSort
        })


        
    //}

    
})


function printRestaurants(categoriesIDs, deliveryInputValue, sortInput) {//, delivery, sort
    let restaurantsRow = document.getElementById("mb-restaurants");
    let print = "";

    newRestaurants = filterCategories(categoriesIDs);
    newRestaurants = filterDelivery(deliveryInputValue);
    newRestaurants = sortBy(sortInput);

    newRestaurants.forEach(restaurant => {
        print += `<div class="col-lg-4 col-md-6 col-12 mb-5 d-flex justify-content-center align-items-center">
        <a href="index.html" class="mb-restaurant-a">
           <div class="card border-0 rounded">
              <img src="${BASE_IMG}${restaurant.image.alt}${restaurant.image.src}" alt="${restaurant.image.alt}" class="card-img mb-restaurant-img"/>
              <div class="card-body p-0 mb-restaurant-card position-absolute rounded">
                 <span class="mb-restaurant-delivery rounded-bottom">${restaurant.deliveryTime}min <i class="fa-regular fa-clock"></i></span>
                    <div class="row w-100 m-0 mb-restaurant-bottom d-flex justify-content-between align-items-end">
                       <div class="mb-restaurant-title col-md-7 col-6">
                          <span class="mb-restaurant-tag text-white fw-bold pb-0 ps-1">${restaurant.tag}</span>
                          <p class="mb-restaurant-text card-text text-white pb-3 ps-1 pb-xl-3 fw-bold">${restaurant.name}</p>
                       </div>
                       <div class="mb-restaurant-spans col-md-5 col-6 d-flex justify-content-end align-items-center py-3 px-1">
                          <span class="bg-warning p-1 rounded"><i class="fa-solid fa-bicycle"></i>${restaurant.delivery.price==0?restaurant.delivery.type.toUpperCase():restaurant.delivery.price+"RSD"}</span>
                          <span class="text-capitalize"><i class="fa-solid fa-star"></i>(${restaurant.recommendations})</span>
                       </div>
                    </div>
                 
              </div>
           </div>
        </a>
     </div>`
    });

    restaurantsRow.innerHTML = print;

}


function filterDelivery(deliveryInputValue) {
    let parsedDelivery = parseInt(deliveryInputValue);
    if (parsedDelivery) {
        //console.log(deliveryInputValue);
        return newRestaurants.filter(x => x.delivery.type=="paid");
    }
    else {
        return newRestaurants.filter(x => x.delivery.type=="free");
    }

}


function filterCategories(arrCategoriesIDs) {
    //let filteredRestaurants = [];

    if (arrCategoriesIDs.length) {
        return restaurants.filter(x => x.categoriesID.some(id => arrCategoriesIDs.includes(id)));
    }
    else {
        return restaurants.filter(x => x.categoriesID.some(id => initialCategories.includes(id)));
    }
}


// function printDeliveryPrice(arr) {
//     let print = "";
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].type == "free") {
//             print = "FREE";
//             break;
//         }
//         else {
//             print += arr[i].price + "RSD";
//             break;
//         }
//     }
//     return print;
// }


function ajaxCallback(file,callback) {
    $.ajax({
        url: BASE_DATA + file,
        method: "get",
        dataType: "json",
        success: function(result){
            console.log(file, " saved");
            setTimeout(callback(file, result), 0);
        },
        error: function(xhr, status, exception){
            console.log(xhr, status, message);
            var message = "";
            if (status === 0) {
                message = "Not connected.\n Verify your network.";
            }else if (status == 404) {
                message = "Requested page not found. [404]";
            }else if (status == 500) {
                message = "Internal Server Error. [500]"
            }else if (exception === "parsererror") {
                message = "Requested JSON parse failed.";
            }else if (exception === "timeout") {
                message = "Timeout error.";
            }else if (exception === "abort") {
                message = "Ajax request aborted.";
            }else {
                message = "Uncaught error.\n" + xhr.responseText;
            }
            alert(message);
        }
    });
}


function createNavbar() {
    let navbarUl = document.getElementById("mb-navbar-ul");
    let navLinks = JSON.parse(localStorage.getItem("navigation.json"));
    let links = [];
    let linksNames = [];
    for (let navLink of navLinks) {
        links.push(navLink["link"]);
        linksNames.push(navLink["text"]);
    }
    //let links = ["index.html","restaurants.html","author.html","get-started.html"];
    //let linksNames = ["Home","Restaurants","Author","Get Started"];

    let print = "";
    for (let i = 0; i < linksNames.length; i++) {
        print += `<li class="nav-item  ${linksNames[i]=="Get Started"?" me-5":""}">
        <a class="nav-link ${linksNames[i]=="Get Started"?" btn-warning rounded pb-1 px-2":""}" href="${links[i]}">${linksNames[i]}</a>
      </li>`
    }
    navbarUl.innerHTML = print;
}


function navbarShrinkOnScroll() {
    $(document).on("scroll",function(){
        if ($(document).scrollTop() > 350) {
            $(".navbar").addClass("shrink");
            $(".navbar").addClass("opacity-full");
        }
        else $(".navbar").removeClass("shrink"), $(".navbar").removeClass("opacity-full");
    })
}


function readMoreOrLess() {
    $(".mb-text-hide").hide();
    $(".show_hide").on("click", function () {
        let txt = $(".mb-text-hide").is(':visible') ? 'Read more' : 'Read less';
        $(".show_hide").text(txt);
        $('.mb-text-hide').slideToggle(200);
    });
}


function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function foodCategoriesOwlCarouselPrint() {
    let owlCarouselDiv = document.querySelector("#owl-example");
    let print = "";
    //DEEP CLONE FOOD CATEGORIES
    let cloneFoodCategories = JSON.parse(JSON.stringify(foodCategories));
    //Da li treba kopirati podatke kada radimo ovako sa njima? svakako ne menja nista u JSON-u tj u originalnim podacima
    
    cloneFoodCategories.forEach(category => {
        print += `<div class="card" style="width: 18rem;">
                    <a href="" class="">
                    <img src="${BASE_IMG}food-category${category.id}.jpg" class="card-img-top img-fluid" alt="food"/>
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted text-center">${category.name}</h6>
                    </div>
                    </a>
                </div>`
    });
    owlCarouselDiv.innerHTML = print;
}


// function createSortRadios() {
//     let sortForm;
//     let print = "";
// }


function createCategoryFilters() {
    let categoriesFilterForm = document.getElementById("mb-filter-form");
    let print = "";
    for (let category of foodCategories) {
        print += `<input type="checkbox" name="filterCheck" id="${category.id}" class="mb-width-0" value="${category.name}"/>
        <label for="${category.id}" class="mb-filter-category-label text-warning rounded-pill m-2">${category.name}</label>`
    }
    categoriesFilterForm.innerHTML += print;
}


function showClickedFilters() {
    $(".mb-filter-category-label").click(function() {
        let labelForAttr = this.getAttribute("for");
        //ADD/REMOVE FROM SELECTED CATEGORIES
        if (!selectedFiltersCategories.includes(parseInt(this.previousElementSibling.id))) {
            selectedFiltersCategories.push(parseInt(this.previousElementSibling.id));
        }
        else {
            let currentCategory = selectedFiltersCategories.indexOf(parseInt(this.previousElementSibling.id));
            selectedFiltersCategories.splice(currentCategory,1);
        }
        console.log(selectedFiltersCategories);
        $(`label[for='${labelForAttr}']`).toggleClass("mb-filter-active");
    });
}


function showClickedRadioFilter() {
    $(document).on("click", 'input.mb-filter-radio', function () {
        if ($(this).is(":checked")) {
            //console.log($(this).val());
            selectedFilterDelivery = $(this).val();
          $('label.mb-filter-delivery-active').removeClass('mb-filter-delivery-active');
          $(this).next("label.mb-filter-delivery-label").addClass("mb-filter-delivery-active");
        }
      });
}


function showClickedRadioSort() {
    $(document).on("click", 'input.mb-sort-radio', function () {
        if ($(this).is(":checked")) {
            //console.log($(this).val());
          $('label.mb-sort-active').removeClass('mb-sort-active');
          $(this).next("label.mb-sort-label").addClass("mb-sort-active");
        }
      });
}
