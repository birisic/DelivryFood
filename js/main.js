//BASE CONSTANTS
const BASE_IMG = "images/";
const BASE_DATA = "data/";


//GET JSON DATA AND STORE IT IN LOCALSTORAGE BEFORE FULL PAGE LOADS
if (!localStorage.getItem("categories-food.json")) {
    ajaxCallback("categories-food.json", saveToLocalStorage)
}
if (!localStorage.getItem("navigation.json")) {
    ajaxCallback("navigation.json", saveToLocalStorage)
}
//GET RESTAURANTS.JSON !!

//SAVE CATEGORIES TO AN ARRAY GLOBALLY
let foodCategories = JSON.parse(localStorage.getItem("categories-food.json"));


//LOAD PAGE
$(document).ready(function(){
    if (window.location.pathname == "/delivry/index.html" || window.location.pathname == "/delivry/") {//include repository name
        //OWL CAROUSEL FOOD CATEGORIES
        foodCategoriesOwlCarouselPrint();
        $("#owl-example").owlCarousel();
    }
    

    //CREATE NAVBAR
    createNavbar();

    //NAVBAR SHRINK AND INCREASE OPACITY ON SCROLL
    navbarShrinkOnScroll();


    //READ MORE/LESS ABOUT SECTION
    readMoreOrLess();


    //CREATE CATEGORY FILTERS
    createCategoryFilters();
    showClickedFilters();
})


function ajaxCallback(file,callback) {
    $.ajax({
        url: BASE_DATA + file,//https://kanibalkorps.github.io/data/categories-food.json
        method: "get",
        dataType: "json",
        success: function(result){
            console.log(file, " saved");
            callback(file, result);
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
        $(`label[for='${labelForAttr}']`).toggleClass("mb-filter-active");
    })
}
