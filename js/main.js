//BASE CONSTANTS
const BASE_IMG = "images/";
const BASE_DATA = "data/";


//CHECKOUT FORM OBJECTS
var objName, objLastName, objAddress, objCity, objPhone, objEmail, objOrderDdl, arrOrderRadio, arrOrderCheck;
var submitBtn = document.getElementById("btn-order");
//REGEXES
var reFullName = /^([A-ZŠČĆĐŽ][a-zščćđž]{2,14}){1,3}$/;
var reAddress = /^(([A-ZŠĐČĆŽ][a-zšđžčć]{1,15}(\.)?)|([1-9][0-9]{0,2}(\.)?))[a-zA-Z0-9\s\/\-]+$/;
var reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var reCity = /^[A-ZŠČĆĐŽ][a-zščćđž]{2,14}\s[1-9][0-9]{4}$/;
var rePhone = /^(\+381)?(\s|-)?06(([0-6]|[8-9])\d{6,8}|(77|78)\d{7}){1}$/;


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
var foodCategories = JSON.parse(localStorage.getItem("categories-food.json"));
var restaurants = JSON.parse(localStorage.getItem("restaurants.json"));
var newRestaurants = [];


//VARIABLES FOR LATER
var initialCategories = [1,2,3,4,5,6,7,8,9,10,11,12];
var initialDelivery = 0;
var initialSearch = "";
var initialSort = "0";
var selectedFiltersCategories = [];
var selectedFilterDelivery = 0;
var selectedSearchInput = "";
var selectedSort = "0";
var queryStringCategory = "";
var queryStringCategoryParams = "";
var categoryID = 0;


//LOAD PAGE
$(document).ready(function(){
    //console.log(window.location.pathname);
    //CREATE NAVBAR
    createNavbar();

    //NAVBAR SHRINK AND INCREASE OPACITY ON SCROLL
    navbarShrinkOnScroll();


    //ADD JS FOR USER FORM
    
    //INDEX PAGE
    //if (window.location.pathname == "/delivry/index.html" || window.location.pathname == "/delivry/") {//include repository name
    if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
        //OWL CAROUSEL FOOD CATEGORIES
        foodCategoriesOwlCarouselPrint();
        $("#owl-example").owlCarousel();


        //READ MORE/LESS ABOUT SECTION
        readMoreOrLess();
    }
    
    //RESTAURANTS PAGE
    //if (window.location.pathname == "/delivry/restaurants.html") {
    if (window.location.pathname == "/restaurants.html") {
        //GET CATEGORY ID THROUGH URL AND PRINT RESTAURANTS
        queryStringCategory = window.location.search;
        queryStringCategoryParams = new URLSearchParams(queryStringCategory);
        categoryID = parseInt(queryStringCategoryParams.get("categoryID"));
        if (categoryID) {
            selectedFiltersCategories.push(categoryID);
        }

        //IF A CATEGORY HAS BEEN CHOSEN ON INDEX
        if (categoryID) {
            printRestaurants(selectedFiltersCategories, initialDelivery, initialSort, initialSearch);
        }
        else {
            //PRINT DEFAULT RESTAURANTS
            printRestaurants(initialCategories, initialDelivery, initialSort, initialSearch);
        }


        //CREATE CATEGORY FILTERS
        createCategoryFilters();
        showClickedFilters();

        //RADIO FILTERS DELIVERY
        showClickedRadioFilter();

        //RADIO SORT
        showClickedRadioSort();

        //LISTEN FOR SEARCH
        getSearchInput();


        //LISTEN FOR CONFIRM FILTERS/SORTS BUTTON
        $(document).on("click","button#btnApply", function(){
            printRestaurants(selectedFiltersCategories, selectedFilterDelivery, selectedSort, selectedSearchInput);
        })   
    }

    //CART PAGE
    if (window.location.pathname == "/delivry/cart.html") {
        //FORM OBJECTS AND VALIDATION
        objName = document.querySelector("#user-name");
        objLastName = document.querySelector("#user-lastname");
        objAddress = document.querySelector("#user-address");
        objCity = document.querySelector("#user-city");
        objPhone = document.querySelector("#user-phone");
        objEmail = document.querySelector("#user-email");
        arrOrderRadio = document.getElementsByName("orderer");
        arrOrderCheck = document.getElementsByName("terms");

        //CHECK INPUT ON BLUR
        objName.addEventListener("blur",function(){
            regexValidation(reFullName, objName);
        });
        objLastName.addEventListener("blur",function(){
            regexValidation(reFullName, objLastName);
        });
        objAddress.addEventListener("blur",function(){
            regexValidation(reAddress, objAddress);
        });
        objCity.addEventListener("blur",function(){
            regexValidation(reCity, objCity);
        });
        objPhone.addEventListener("blur",function(){
            regexValidation(rePhone, objPhone);
        });
        objEmail.addEventListener("blur",function(){
            regexValidation(reEmail, objEmail);
        });

        //VALIDATE ON SUBMIT
        submitBtn.addEventListener("click",formValidationOnSubmit); 
    }
})


function formValidationOnSubmit(){
    //REGEXES
    regexValidation(reFullName, objName);
    regexValidation(reFullName, objLastName);
    regexValidation(reAddress, objAddress);
    regexValidation(reCity, objCity);
    regexValidation(rePhone, objPhone);
    regexValidation(reEmail, objEmail);


    //CHECK
    let chbTerms = document.getElementsByName("terms");
    try {
        if (!chbTerms[0].checked) {
            chbTerms[0].nextElementSibling.nextElementSibling.classList.remove("d-none");
            chbTerms[0].nextElementSibling.nextElementSibling.classList.add("d-block");
            throw ("Niste pročitali uslove korišćenja.");
        }
        else {
            chbTerms[0].nextElementSibling.nextElementSibling.classList.add("d-none");
            chbTerms[0].nextElementSibling.nextElementSibling.classList.remove("d-block");
            chbTerms[0].nextElementSibling.nextElementSibling.innerHTML = "";
        }
    }
    catch (error) {
        chbTerms[0].nextElementSibling.nextElementSibling.innerHTML = error;
    }
}


function regexValidation(re, obj){    
    try {
        if (!re.test(obj.value)) {
            //WRONG INPUT HANDLING
            obj.nextElementSibling.classList.remove("d-none");
            obj.nextElementSibling.classList.add("d-block");

            
            //WHICH ELEMENT
            if (obj == objName || obj == objLastName) {
                throw("Mora sadržati bar jedno veliko slovo i maksimum 15 malih.")
            }
            else if (obj == objAddress) {
                throw("Adresa nije u dobrom formatu. Primer: Kralja Petra I 44, Sarajevska 14b...")
            }
            else if (obj == objCity) {
                throw("Grad nije u dobrom formatu. Primer: Zaječar 19000...");
            }
            else if (obj == objPhone) {
                throw("Telefon mora da započne sa 06 ili +381 i da nema preko 8 cifara.");
            }
            else if (obj == objEmail) {
                throw("Email nije u dobrom formatu. Primer: username@gmail.com...");
            }
        }
        else {
            obj.previousElementSibling.classList.remove("d-inline");
            obj.previousElementSibling.classList.add("d-none");
            obj.nextElementSibling.classList.remove("d-block");
            obj.nextElementSibling.classList.add("d-none");
            obj.nextElementSibling.innerHTML = "";
        }
    }
    catch (err) {
        //PRINT MESSAGE
        obj.previousElementSibling.classList.remove("d-none");
        obj.previousElementSibling.classList.add("d-inline");
        obj.nextElementSibling.innerHTML = err;
    }
}


function printRestaurants(categoriesIDs, deliveryInputValue, sortInput, searchInput) {
    let restaurantsRow = document.getElementById("mb-restaurants");
    let print = "";

    if (categoriesIDs == null) {
        categoriesIDs = initialCategories;
    }

    newRestaurants = filterCategories(categoriesIDs);
    newRestaurants = filterDelivery(deliveryInputValue);
    newRestaurants = filterSearch(searchInput)
    newRestaurants = sortBy(sortInput);

    newRestaurants.forEach(restaurant => {
        print += `<div class="col-lg-4 col-md-6 col-12 mb-5 d-flex justify-content-center align-items-center">
        <a href="restaurant${restaurant.id}.html" class="mb-restaurant-a">
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


function sortBy(sortInput) {
    let arrSorted = [];

    switch(sortInput){
       
        case "0":                   arrSorted = newRestaurants.sort(function(a,b){
                                        return b.recommendations - a.recommendations;
                                    });
                                    return arrSorted;

        case "1":                   arrSorted = newRestaurants.sort(function(a,b){
                                        return a.delivery.price - b.delivery.price;
                                    });
                                    return arrSorted;

        case "2":                   arrSorted = newRestaurants.sort(function(a,b){
                                        return a.deliveryTime - b.deliveryTime;
                                    });
                                    return arrSorted;

        default:                    arrSorted = newRestaurants;
                                    return arrSorted;
    }
}


function filterSearch(searchInput) {
    if (searchInput == initialSearch || searchInput == null) {
        return newRestaurants;
    }
    return newRestaurants.filter(x => x.name.toLowerCase().includes(searchInput.toLowerCase()));
}


function filterDelivery(deliveryInputValue) {
    let parsedDelivery = parseInt(deliveryInputValue);
    if (parsedDelivery) {
        return newRestaurants.filter(x => x.delivery.type=="paid");
    }
    else {
        return newRestaurants.filter(x => x.delivery.type=="free");
    }

}


function filterCategories(arrCategoriesIDs) {
    if (arrCategoriesIDs.length) {
        return restaurants.filter(x => x.categoriesID.some(id => arrCategoriesIDs.includes(id)));
    }
    else {
        return restaurants.filter(x => x.categoriesID.some(id => initialCategories.includes(id)));
    }
}


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
        <a class="nav-link ${linksNames[i]=="<i class='fa-solid fa-heart'></i>"?"me-5":""}" href="${links[i]}">${linksNames[i]=="<i class='fa-solid fa-cart-shopping'></i>" || linksNames[i] == "<i class='fa-solid fa-heart'></i>"?linksNames[i] + "<span class='mb-show-number btn btn-warning text-white'>0</span>":linksNames[i]}</a>
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
    
    cloneFoodCategories.forEach(category => {
        print += `<div class="card" style="width: 18rem;">
                    <a href="restaurants.html?categoryID=${category.id}" class="mb-category-anchor">
                    <img src="${BASE_IMG}food-category${category.id}.jpg" class="card-img-top img-fluid" alt="food"/>
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted text-center">${category.name}</h6>
                    </div>
                    </a>
                </div>`
    });
    owlCarouselDiv.innerHTML = print;
}


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
        $(`label[for='${labelForAttr}']`).toggleClass("mb-filter-active");
    });
}


function showClickedRadioFilter() {
    $(document).on("click", 'input.mb-filter-radio', function () {
        if ($(this).is(":checked")) {
            selectedFilterDelivery = $(this).val();
          $('label.mb-filter-delivery-active').removeClass('mb-filter-delivery-active');
          $(this).next("label.mb-filter-delivery-label").addClass("mb-filter-delivery-active");
        }
      });
}


function showClickedRadioSort() {
    $(document).on("click", 'input.mb-sort-radio', function () {
        if ($(this).is(":checked")) {
            selectedSort = $(this).val();
          $('label.mb-sort-active').removeClass('mb-sort-active');
          $(this).next("label.mb-sort-label").addClass("mb-sort-active");
        }
      });
}

function getSearchInput() {
    $("#input-search").keyup(function(){
        selectedSearchInput = $("#input-search").val();
        selectedSearchInput == "" || null ? selectedSearchInput = initialSearch : $("#input-search").val();
        printRestaurants(initialCategories, selectedFilterDelivery, selectedSort, selectedSearchInput);
    });
}
