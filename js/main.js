//BASE CONSTANTS
const BASE_IMG = "images/";
const BASE_DATA = "data/";


//CHECKOUT FORM OBJECTS
var objName, objLastName, objAddress, objCity, objPhone, objEmail, objOrderDdl, arrOrderRadio, arrOrderCheck;
var submitBtn = document.getElementById("btn-order");

var objPass, objConfirmPass;

//REGEXES
var reFullName = /^([A-ZŠČĆĐŽ][a-zščćđž]{2,14}){1,3}$/;
var reAddress = /^(([A-ZŠĐČĆŽ][a-zšđžčć]{1,15}(\.)?)|([1-9][0-9]{0,2}(\.)?))[a-zA-Z0-9\s\/\-]+$/;
var reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var reCity = /^[A-ZŠČĆĐŽ][a-zščćđž]{2,14}\s[1-9][0-9]{4}$/;
var rePhone = /^(\+381)?(\s|-)?06(([0-6]|[8-9])\d{6,8}|(77|78)\d{7}){1}$/;
var rePass = /^[A-Za-z\d]{8,20}$/;


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
if (!localStorage.getItem("food.json")) {
    ajaxCallback("food.json", saveToLocalStorage);
}


//SAVE DATA TO ARRAYS GLOBALLY
var foodCategories = JSON.parse(localStorage.getItem("categories-food.json"));
var restaurants = JSON.parse(localStorage.getItem("restaurants.json"));
var food = JSON.parse(localStorage.getItem("food.json"));
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
var popularRestaurants = document.querySelector("#mb-popular-restaurants-row");


//VARIABLES FOR FOOD
var restaurantH1 = document.querySelector("#mb-restaurant-title");
var workingHoursSpan = document.querySelector("#mb-restaurant-working-time");
var recommendationsSpan = document.querySelector("#mb-restaurant-rating");
var moreInfoModalTitle = document.querySelector("#exampleModalLabelInfo");
var moreInfoWorkingHours = document.querySelector("#moreInfoWorkingHours");
var moreInfoAddress = document.querySelector("#moreInfoAddress");
var moreInfoDeliveryTime = document.querySelector("#moreInfoDeliveryTime");
var moreInfoMinimalDeliveryPrice = document.querySelector("#moreInfoMinimalDeliveryPrice");
var moreInfoPhone = document.querySelector("#moreInfoPhone");
var filteredFood = [];
var arrFood = [];
var inputRangeValue = 1500;


//VARIABLES FOR CART
var arrFoodIdOrder = [];
var foodIDOrder = 0;
var foodQuantityOrder = 0;
var foodImgPath = "";
var foodImgAlt = "";
var foodPrice = 0;
var foodName = "";
var objFoodOrder = {
    "foodID": foodIDOrder,
    "name": foodName,
    "quantity": foodQuantityOrder,
    "price": foodPrice,
    "image": {
        "src": foodImgPath,
        "alt": foodImgAlt
    }
};
let receipt = 0;
let cartTableBody = document.querySelector("#mb-cart-table tbody");
var arrOrder = [];


//SAVE ARRAY OF ORDERS IN LOCALSTORAGE 
//localStorage.setItem("Orders", arrOrders);




//LOAD PAGE
$(document).ready(function(){
    //console.log(window.location.pathname);
    //CREATE NAVBAR
    //createNavbar();

    //NAVBAR SHRINK AND INCREASE OPACITY ON SCROLL
    navbarShrinkOnScroll();


    //CHANGE CART NUMBER
    JSON.parse(localStorage.getItem("Order")) != null ? arrOrder = JSON.parse(localStorage.getItem("Order")) : arrOrder = [];
    $(".mb-show-number").first().text(arrOrder.length);
    
    //INDEX PAGE
    if (window.location.pathname == "/delivry_2/index.php" || window.location.pathname == "/delivry_2/") {//include repository name
    //if (window.location.pathname == "/index.php" || window.location.pathname == "/") {
        //OWL CAROUSEL FOOD CATEGORIES
        foodCategoriesOwlCarouselPrint();
        $("#owl-example").owlCarousel();


        //READ MORE/LESS ABOUT SECTION
        readMoreOrLess();

        //PRINT POPULAR RESTAURANTS
        let arrRestaurantsSorted = restaurants.sort(function(a,b){
            return b.recommendations - a.recommendations;
        });
        for (let i = 0; i < 3; i++) {
            popularRestaurants.innerHTML += `<div class="col-lg-4 col-md-6 col-12 mb-5 d-flex justify-content-center align-items-center">
            <a href="restaurant${arrRestaurantsSorted[i].id}.php" class="mb-restaurant-a">
               <div class="card border-0 rounded">
                  <img src="${BASE_IMG}${arrRestaurantsSorted[i].image.alt}${arrRestaurantsSorted[i].image.src}" alt="${arrRestaurantsSorted[i].image.alt}" class="card-img mb-restaurant-img"/>
                  <div class="card-body p-0 mb-restaurant-card position-absolute rounded">
                     <span class="mb-restaurant-delivery rounded-bottom">${arrRestaurantsSorted[i].deliveryTime}min <i class="fa-regular fa-clock"></i></span>
                        <div class="row w-100 m-0 mb-restaurant-bottom d-flex justify-content-between align-items-end">
                           <div class="mb-restaurant-title col-md-7 col-6">
                              <span class="mb-restaurant-tag text-white fw-bold pb-0 ps-1">${arrRestaurantsSorted[i].tag}</span>
                              <p class="mb-restaurant-text card-text text-white pb-3 ps-1 pb-xl-3 fw-bold">${arrRestaurantsSorted[i].name}</p>
                           </div>
                           <div class="mb-restaurant-spans col-md-5 col-6 d-flex justify-content-end align-items-center py-3 px-1">
                              <span class="bg-warning p-1 rounded"><i class="fa-solid fa-bicycle"></i>${arrRestaurantsSorted[i].delivery.price==0?arrRestaurantsSorted[i].delivery.type.toUpperCase():arrRestaurantsSorted[i].delivery.price+"RSD"}</span>
                              <span class="text-capitalize"><i class="fa-solid fa-star"></i>(${arrRestaurantsSorted[i].recommendations})</span>
                           </div>
                        </div>
                     
                  </div>
               </div>
            </a>
         </div>`            
        }
    }
    

    //RESTAURANTS PAGE
    if (window.location.pathname == "/delivry_2/restaurants.php") {
    //if (window.location.pathname == "/restaurants.php") {
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


    //CHECKOUT PAGE
    if (window.location.pathname == "/delivry_2/checkout.php") {
    //if (window.location.pathname == "/checkout.php") {
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


    //REGISTER PAGE
    if (window.location.pathname == "/delivry_2/form-register.php") {

        //let submitRegister = document.getElementById("btn-register");
        objName = document.querySelector("#user-name");
        objLastName = document.querySelector("#user-lastname");
        objEmail = document.querySelector("#user-email");
        objPass = document.querySelector("#user-password");
        objConfirmPass = document.querySelector("#user-confirm-password");

        objName.addEventListener("blur",function(){
            regexValidation(reFullName, objName);
        });
        objLastName.addEventListener("blur",function(){
            regexValidation(reFullName, objLastName);
        });
        objEmail.addEventListener("blur",function(){
            regexValidation(reEmail, objEmail);
        });
        objPass.addEventListener("blur",function(){
            regexValidation(rePass, objPass);
        });

        //submitRegister.addEventListener("submit",formValidationOnSubmit);
        //submitRegister.addEventListener("click",formValidationOnSubmit); 
    }
    //LOGIN PAGE
    if (window.location.pathname == "/delivry_2/form-login.php") {
        objEmail = document.querySelector("#user-email");
        objPass = document.querySelector("#user-password");
        objEmail.addEventListener("blur",function(){
            regexValidation(reEmail, objEmail);
        });
        objPass.addEventListener("blur",function(){
            regexValidation(rePass, objPass);
        });
    }


    //RESTAURANT PAGE
    for (let i = 0; i < restaurants.length; i++) {
        createRestaurantPage(restaurants[i]);        
    }


    //CART PAGE
    if (window.location.pathname == "/delivry_2/cart.php") {
    //if (window.location.pathname == "/cart.php") {// /delivry_2/cart.php
        printCart();
    }
})


function printCart() {
    JSON.parse(localStorage.getItem("Order")) != null ? arrOrder = JSON.parse(localStorage.getItem("Order")) : arrOrder = [];

    arrOrder.forEach(foodElement => {
        let elementImg = `<img class="rounded" height="120" src='${foodElement.image.src}' alt='${foodElement.image.alt}'/>`;
        let elementName = `${foodElement.name}`;
        let elementQuantity = `${foodElement.quantity}`;
        let elementPrice = `${foodElement.price}`;
        let elementRemoveBtn = `<button type='button' class='btn btn-danger mb-order-remove-item' data-id="${foodElement.foodID}">Remove</button>`
        let tableRow = `<tr>
                            <td>
                                ${elementImg}
                            </td>
                            <td>
                                ${elementName}
                            </td>
                            <td>
                                ${elementQuantity}
                            </td>
                            <td>
                                ${elementPrice} RSD
                            </td>
                            <td class="fw-bold">
                                ${elementPrice * elementQuantity} RSD
                            </td>
                            <td class="text-center">
                                ${elementRemoveBtn}
                            </td>
                        </tr>`
        $("#mb-cart-table tbody").append(tableRow);
        receipt += elementPrice * elementQuantity;
        $("#mb-order-recepit").text(receipt);
    });

    //EMPTY CART MESSAGE
    if ($("#mb-cart-table tbody").children().length == 0) {
        $("#mb-cart-table").remove();

        $("#mb-order-message").removeClass("d-none");
        $("#mb-order-message").addClass("d-block");
        $("#mb-order-message").text("Your cart is empty.");

        $("#mb-receipt-header").removeClass("d-block");
        $("#mb-receipt-header").addClass("d-none");
    }
    else {
        $("#mb-order-message").removeClass("d-block");
        $("#mb-order-message").addClass("d-none");

        $("#mb-receipt-header").removeClass("d-none");
        $("#mb-receipt-header").addClass("d-block");
    }


    //REMOVE ITEM ON CLICK
    $(".mb-order-remove-item").click(function() {
        $("#mb-cart-table tbody").empty();
        let filteredItems = arrOrder.filter(x => x.foodID != $(this).data("id"));

        if (filteredItems.length == 0) localStorage.clear;//AKO JE SAMO TAJ ITEM

        localStorage.setItem("Order",JSON.stringify(filteredItems));

        
        receipt = 0;
        $("#mb-order-recepit").text(receipt);
        $(".mb-show-number").first().text(filteredItems.length);
        printCart();
    });
}


function createRestaurantPage(restaurant){
    if (window.location.pathname == `/delivry_2/restaurant${restaurant.id}.php`) {
    //if (window.location.pathname == `/restaurant${restaurant.id}.php`) {
        //SET TITLE
        restaurantH1.textContent = restaurant.name;
        moreInfoModalTitle.textContent = restaurant.name;
        
        //SET WORKING TIME
        workingHoursSpan.textContent = restaurant.workingHours + " Mon-Fri";
        moreInfoWorkingHours.textContent = restaurant.workingHours + " Mon-Fri";
        if (restaurant.workingHoursWeekend != restaurant.workingHours) {
            workingHoursSpan.innerHTML += "<br/>" + "(" + restaurant.workingHoursWeekend + " Sat-Sun)";
            moreInfoWorkingHours.innerHTML += "<br/>" + "(" + restaurant.workingHoursWeekend + " Sat-Sun)";
        }

        //SET ADDRESS
        moreInfoAddress.innerHTML = "<br/>Address: " + restaurant.address[0].street + ", " + restaurant.address[0].city.name;

        //SET AVERAGE DELIVERY TIME
        moreInfoDeliveryTime.innerHTML = "<br/>Average delivery time: " + restaurant.deliveryTime + "min";

        //SET MINIMAL DELIVERY PRICE
        moreInfoMinimalDeliveryPrice.innerHTML = "<br/>Minimal delivery price: " + restaurant.minimalOrderPrice.price + "RSD";

        //SET PHONE NUMBER
        moreInfoEmail.innerHTML = "<br/>Email: " + restaurant.email;

        //SET RECOMMENDATIONS (RATING)
        recommendationsSpan.innerHTML += "(" + restaurant.recommendations + ")";
        
        //PRINT SORT OPTIONS
        printRestaurantSortOptions();

        //PRINT CATEGORIES
        printCategoriesRestaurant(restaurant);

        //CHECK IF ANY CATEGORY IS SELECTED
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
            filteredFood = [];
            filterAndPrintFood(restaurant, selectedFiltersCategories, inputRangeValue, selectedSearchInput, selectedSort);
        });

        //INPUT RANGE FILTER
        $("#mb-range").on("change", function() {
            inputRangeValue = parseInt($("#mb-range").val());
            filterAndPrintFood(restaurant, selectedFiltersCategories, inputRangeValue, selectedSearchInput, selectedSort);
        });

        //INPUT SEARCH
        $("#restaurant-input-search").keyup(function(){
            selectedSearchInput = $("#restaurant-input-search").val();
            selectedSearchInput == "" || null ? selectedSearchInput = initialSearch : $("#restaurant-input-search").val();
            filterAndPrintFood(restaurant, selectedFiltersCategories, inputRangeValue, selectedSearchInput, selectedSort);
        });

        //DROPDOWN SELECT SORT
        $("#mb-restaurant-sorts-select").on("change", function() {
            selectedSort = $(this).val();
            filterAndPrintFood(restaurant, selectedFiltersCategories, inputRangeValue, selectedSearchInput, selectedSort);
        });

        //PRINT DEFAULT FOOD
        filterAndPrintFood(restaurant, selectedFiltersCategories, inputRangeValue, selectedSearchInput, selectedSort);
    } 
}


function foodSortBy(sortInput) {
    let arrSorted = [];

    switch(sortInput){
       
        case "0":                   arrSorted = arrFood.sort(function(a,b){
                                        return b.name.localeCompare(a.name, 'en', { sensitivity: 'base' });
                                    });
                                    return arrSorted;

        case "1":                   arrSorted = arrFood.sort(function(a,b){
                                        return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
                                    });
                                    return arrSorted;

        case "2":                   arrSorted = arrFood.sort(function(a,b){
                                        return a.price.newPrice - b.price.newPrice;
                                    });
                                    return arrSorted;

        case "3":                   arrSorted = arrFood.sort(function(a,b){
                                        return b.price.newPrice - a.price.newPrice;
                                    });
                                    return arrSorted;

        default:                    arrSorted = arrFood;
                                    return arrSorted;
    }
}


function foodFilterSearch(selectedSearchInput) {
    if (selectedSearchInput == initialSearch || selectedSearchInput == null) {
        return arrFood;
    }
    return arrFood.filter(x => x.name.toLowerCase().includes(selectedSearchInput.toLowerCase().trim()));
}


function foodFilterRange(inputRangeValue) {
    return arrFood.filter(x => x.price.newPrice <= inputRangeValue);
}


function foodFilterCategories(arr) {
        if (arr.length) {
            return arrFood.filter(x => arr.includes(x.categoryID));
        }
        else {
            return arrFood;
        }
}


function printRestaurantFood(restaurant, selectedFiltersCategories, inputRangeValue, selectedSearchInput, sortInput){

    let foodSectionRow = document.querySelector("#mb-restaurant-food-row");
    let foodIngredients = "";
    let printFood = "";

    //FILTER AND SORT
    arrFood = foodFilterCategories(selectedFiltersCategories);
    arrFood = foodFilterRange(inputRangeValue);
    arrFood = foodFilterSearch(selectedSearchInput);
    arrFood = foodSortBy(sortInput);

    for (let objFilteredFood of arrFood) {
        if (objFilteredFood.ingredients != null && objFilteredFood.ingredients.length) {
            foodIngredients = objFilteredFood.ingredients;
        }
        
        printFood += `<div class="col-lg-5 col-md-11 col-12 mx-md-2 px-md-3 my-3 border rounded mb-food-col">
        <a href="#" class="mb-food-a" data-bs-toggle="modal" data-bs-target="#exampleModal${objFilteredFood.id}">
            <div class="mb-food container-fluid p-0">
                <div class="row justify-content-between align-items-start">
                    <div class="col-6 p-2">
                        <div class="mb-food-text">
                            <div class="mb-food-info">
                                <h6 class="text-dark text-truncate">${objFilteredFood.name}</h6>
                                <p class="text-muted">${foodIngredients.length > 50?foodIngredients.slice(0,50)+"&hellip;":foodIngredients}${objFilteredFood.ingredients == null?"":""}</p>
                            </div>
                            <div class="mb-food-price-tag">
                                <span class="text-warning">${objFilteredFood.price.newPrice} RSD</span>
                                <s class="text-dark">${objFilteredFood.price.oldPrice!=null?objFilteredFood.price.oldPrice + " RSD":""}</s>
                                <span class="btn-warning text-white rounded">${objFilteredFood.popularTag?"<span class='p-2 text-capitalize'>popular</span>":""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-2">
                        <div class="mb-food-img">
                            <img class="img-fluid rounded" src="${BASE_IMG}${objFilteredFood.image.alt}${objFilteredFood.image.src}" alt="${objFilteredFood.image.alt}"/>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        </div>
        <!-- Modal -->
            <div class="modal fade" id="exampleModal${objFilteredFood.id}" tabindex="-1" aria-labelledby="exampleModalLabel${objFilteredFood.id}" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-food-img">
                        <img class="img-fluid rounded" src="${BASE_IMG}${objFilteredFood.image.alt}${objFilteredFood.image.src}" alt="${objFilteredFood.image.alt}"/>
                    </div>
                    <div class="mb-food-text pt-4">
                                <div class="mb-food-info">
                                    <h4 class="text-dark">${objFilteredFood.name}</h4>
                                    <p class="py-2">${objFilteredFood.ingredients!=null?objFilteredFood.ingredients:""}</p>
                                </div>
                                <div class="mb-food-price-tag">
                                    <span class="text-warning mb-current-price">${objFilteredFood.price.newPrice}</span><span class="text-warning"> RSD</span>
                                    <s class="text-dark">${objFilteredFood.price.oldPrice!=null?objFilteredFood.price.oldPrice + " RSD":""}</s>
                                    <span class="btn-warning text-white rounded">${objFilteredFood.popularTag?"<span class='p-2 text-capitalize'>popular</span>":""}</span>
                                </div>
                            </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-white ms-0 me-auto border rounded" data-bs-dismiss="modal">Close</button>
                    <form action="" class="d-flex justify-content-center">
                            <input type="number" class="form-control w-50 me-1 ms-auto mb-food-amount-input" name="foodAmountInput" placeholder="Ammount"/>
                            <input type="button" data-id="${objFilteredFood.id}" data-bs-dismiss="modal" class="btn btn-warning text-white mb-btn-add-to-cart" value="Add to cart" name="btnAddToCart"/>
                    </form>
                </div>
                </div>
            </div>
            </div>`
            foodIngredients = "";
        
    }
    foodSectionRow.innerHTML = printFood;
    printFood = "";

    //LISTEN FOR ADD TO CART CLICKS
    $(".mb-btn-add-to-cart").on("click", function(){
        let hasFoodID = false;
        
        //GET FROM LS
        if (arrOrder.length > 0) {
            for (let objFoodFromOrder of arrOrder) {
                if (objFoodFromOrder.foodID == $(this).data("id")) {
                    hasFoodID = true;
                    break;
                }
            }
        }

        //IF THE ORDER DOESN'T ALREADY CONTAIN THE SELECTED FOOD
        if (!hasFoodID) {
            arrOrder.push({
                "foodID": $(this).data("id"),
                "name": $(this).parent().parent().prev().children(".mb-food-text").children(".mb-food-info").children("h4").text(),
                "quantity": $(this).prev().val()=="" || parseInt($(this).prev().val()) < 1 ? 1:parseInt($(this).prev().val()),
                "price": parseInt($(this).parent().parent().prev().children(".mb-food-text").children(".mb-food-price-tag").children(".mb-current-price").text()),
                "image": {
                    "src": $(this).parent().parent().prev().children(".mb-food-img").children("img").attr("src"),
                    "alt": $(this).parent().parent().prev().children(".mb-food-img").children("img").attr("alt")
                }
            });
            localStorage.setItem("Order",JSON.stringify(arrOrder));
        }
        $(".mb-show-number").first().text(arrOrder.length);
    })
}


function filterAndPrintFood(restaurant, selectedFiltersCategories, inputRangeValue, selectedSearchInput, sortInput) {
    for (let restaurantCategoryID of restaurant.categoriesID) {
        for (let foodCategory of foodCategories) {
            if (restaurantCategoryID == foodCategory.id) {// && filteredFood.length != restaurant.categoriesID.length
                filteredFood = food.filter(x => x.categoryID == foodCategory.id);

                for (let objFood of filteredFood) {
                    if (!arrFood.includes(objFood)) {
                        arrFood.push(objFood);//add food globally
                    }
                }                
                printRestaurantFood(restaurant, selectedFiltersCategories, inputRangeValue, selectedSearchInput, sortInput);
            }
        }
    }
}

function printCategoriesRestaurant(restaurant) {
    let categoriesDiv = document.querySelector("#mb-restaurant-categories-spans");
    let printCategoriesFilters = "";

    for (let restaurantCategoryID of restaurant.categoriesID) {
        for (let foodCategory of foodCategories) {
            //PRINT CATEGORIES
            if (restaurantCategoryID == foodCategory.id) {
                printCategoriesFilters += `<input type="checkbox" name="restaurantPageCategoryFilter" id="${foodCategory.id}" value="${foodCategory.id}" class="mb-width-0"/><label for="${foodCategory.id}" class="mb-filter-category-label text-warning rounded-pill m-2">${foodCategory.name}</label>`;
                break;
            }
        }
    }
    categoriesDiv.innerHTML += printCategoriesFilters;
}


function printRestaurantSortOptions() {
    let sortSelect = document.querySelector("#mb-restaurant-sorts-select");
    let sortsNames = ['Name asc.','Name desc.','Price asc.','Price desc.'];
    let print = "";

    for (let i = 0; i < sortsNames.length; i++) {
        print += `<option value="${i}">${sortsNames[i]}</option>`      
    }
    sortSelect.innerHTML = print;
}


function formValidationOnSubmit(){
    // let arrErrors = [];
    let arrErrors = 0;
    //REGEXES
    // arrErrors.push(regexValidation(reEmail, objEmail));
    // arrErrors.push(regexValidation(reFullName, objName));
    // arrErrors.push(regexValidation(reFullName, objLastName));
    arrErrors += regexValidation(reFullName, objName);
    arrErrors += regexValidation(reFullName, objLastName);
    arrErrors += regexValidation(reEmail, objEmail);
    arrErrors += regexValidation(rePass, objPass);

    if (window.location.pathname == "/delivry_2/form-reg.php") {

    }

    
    if (window.location.pathname == "/delivry_2/checkout.php") {
        // arrErrors.push(regexValidation(reAddress, objAddress));
        // arrErrors.push(regexValidation(reCity, objCity));
        // arrErrors.push(regexValidation(rePhone, objPhone));
        arrErrors += regexValidation(reAddress, objAddress);
        arrErrors += regexValidation(reCity, objCity);
        arrErrors += regexValidation(rePhone, objPhone);
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

    if (objConfirmPass.value != objPass.value) {
        objConfirmPass.nextElementSibling.classList.remove("d-none");
        objConfirmPass.nextElementSibling.classList.add("d-block");

        objConfirmPass.previousElementSibling.classList.remove("d-none");
        objConfirmPass.previousElementSibling.classList.add("d-inline");
        objConfirmPass.nextElementSibling.innerHTML = "Lozinka nije ista!";
    }
    else {
        objConfirmPass.previousElementSibling.classList.remove("d-inline");
        objConfirmPass.previousElementSibling.classList.add("d-none");
        objConfirmPass.nextElementSibling.classList.remove("d-block");
        objConfirmPass.nextElementSibling.classList.add("d-none");
        objConfirmPass.nextElementSibling.innerHTML = "";
    }

    if (arrErrors) {
        return false;
    }
    return true;
    
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
            else if (obj == objPass) {
                throw("Lozinka mora sadržati 8-20 karaktera i to samo slova i brojeve.");
            }
        }
        else {
            obj.previousElementSibling.classList.remove("d-inline");
            obj.previousElementSibling.classList.add("d-none");
            obj.nextElementSibling.classList.remove("d-block");
            obj.nextElementSibling.classList.add("d-none");
            obj.nextElementSibling.innerHTML = "";
            return 0;
        }
    }
    catch (err) {
        //PRINT MESSAGE
        obj.previousElementSibling.classList.remove("d-none");
        obj.previousElementSibling.classList.add("d-inline");
        obj.nextElementSibling.innerHTML = err;
        return 1;
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
        <a href="restaurant${restaurant.id}.php" class="mb-restaurant-a">
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
    return newRestaurants.filter(x => x.name.toLowerCase().includes(searchInput.toLowerCase().trim()));
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
        timeout: 0,
        success: function(result){
            console.log(file, " saved");
            callback(file, result);//setTimeout(
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


// function createNavbar() {
//     let navbarUl = document.getElementById("mb-navbar-ul");
//     let navLinks = JSON.parse(localStorage.getItem("navigation.json"));
//     let links = [];
//     let linksNames = [];
//     for (let navLink of navLinks) {
//         links.push(navLink["link"]);
//         linksNames.push(navLink["text"]);
//     }
//     //let links = ["index.php","restaurants.php","author.php","get-started.html"];
//     //let linksNames = ["Home","Restaurants","Author","Get Started"];

//     let print = "";
//     for (let i = 0; i < linksNames.length; i++) {
//         print += `<li class="nav-item  ${linksNames[i]=="Get Started"?" me-5":""}">
//         <a class="nav-link ${linksNames[i]=="<i class='fa-solid fa-cart-shopping'></i>"?"me-5":""}" href="${links[i]}">${linksNames[i]=="<i class='fa-solid fa-cart-shopping'></i>" || linksNames[i] == "<i class='fa-solid fa-heart'></i>"?linksNames[i] + "<span class='mb-show-number btn btn-warning text-white'>0</span>":linksNames[i]}</a>
//       </li>`
//     }
//     navbarUl.innerHTML = print;
// }


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
                    <a href="restaurants.php?categoryID=${category.id}" class="mb-category-anchor">
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


