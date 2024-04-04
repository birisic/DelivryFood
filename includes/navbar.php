<?php
  $navNames = [];
  $navLinks = [];
  $navObj = printNavigation();

  if ((isset($_SESSION['user']) && $_SESSION['user']->role != "admin") || (!isset($_SESSION['user']))) {
    foreach ($navObj as $obj) {
      if ($obj->name != '<i class="fa-solid fa-wrench"></i>') {
        $navNames[] = $obj->name;
        $navLinks[] = $obj->link;
      }
    }
  }

  if (isset($_SESSION['user']) && $_SESSION['user']->role == "admin") {
    foreach ($navObj as $obj) {
      $navNames[] = $obj->name;
      $navLinks[] = $obj->link;
    }
  }

?>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
         <div class="container-fluid">
            <div class="header-bar ms-lg-5 ms-2">
               <h1><a href="index.php">Delivry</a></h1>
            </div>
           <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
           </button>
           <div class="collapse navbar-collapse" id="navbarNav">
             <ul class="navbar-nav ms-auto" id="mb-navbar-ul">
              <?php
              $br = 0;
              //$navLinks[$br]
              //<?=!isset($_SESSION['user'])?$navLinks[$br]:""
              //<?=isset($_SESSION['user']) && $navLinks[$br] == "form-register.php"?"user-profile.php":"$navLinks[$br]"
                          // if (!$_SESSION['user']) {
                          //   echo($navLinks[$br]); 
                          // }

                          // if ($_SESSION['user'] && $navLinks[$br] == "form-register.php") {
                          //   echo "user-profile.php";
                          // }
                          // else {
                          //   echo($navLinks[$br]);
                          // }
                        
              foreach ($navNames as $name) :
              ?>
                <li class="nav-item">
                  <a class="nav-link d-flex justify-content-lg-center align-items-center <?=$name=="<i class='fa-solid fa-cart-shopping'></i>"?"me-5":""?>" 
                  href="<?php
                          if (!isset($_SESSION['user'])) {
                              echo($navLinks[$br]); 
                            }
  
                          if (isset($_SESSION['user']) && $navLinks[$br] == "form-register.php") {
                            echo "user-profile.php";
                          }

                          if (isset($_SESSION['user']) && $navLinks[$br] != "form-register.php") {
                            echo($navLinks[$br]);
                          }
                  ?>">
                  <?= $name != '<i class="fa-solid fa-user"></i>' && $name != "<i class='fa-solid fa-cart-shopping'></i>" && $name != '<i class="fa-solid fa-wrench"></i>'?$name:""?>
                  <?= isset($_SESSION['user']) && $_SESSION['user']->role == "admin" && $name == '<i class="fa-solid fa-wrench"></i>'?'<i class="fa-solid fa-wrench bg-warning text-white rounded-circle p-2"></i>':""?>
                  <?= isset($_SESSION['user']) && $name=='<i class="fa-solid fa-user"></i>'?'<i class="fa-solid fa-user bg-warning text-white rounded-circle p-2"></i>':""?>
                  <?= !isset($_SESSION['user']) && $name=='<i class="fa-solid fa-user"></i>'?'<i class="fa-solid fa-user p-2"></i>':""?>
                  <?=$name=="<i class='fa-solid fa-cart-shopping'></i>"?"<i class='fa-solid fa-cart-shopping pt-2'></i>". "<span class='mb-show-number btn btn-warning text-white'>0</span>":""?></a>
                </li>
              <?php $br++; endforeach;?>
               
             </ul>
           </div>
         </div>
       </nav>

