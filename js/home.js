$(document).ready(function(){

  //click buttons

  $('#create').on('click', function(){
    showPages('.home-screen', '.create-category');
  })

  // page functionality
  const showPages = (page, pageShow)=> {
    console.log('i run');
    $(page).fadeOut('slow');
    $(page).css({'display': 'none'});
    if ($(pageShow).css({'display':'none'})) {
      $(pageShow).fadeIn('slow');
      $(pageShow).css({'display': 'block'});
    }
  }

  // show home buttons
  const homeButtons = ()=>{
    console.log('home buttons is run');
    if(getCatlength(catArray) > 0){
      console.log('categories have been created');
        if ($('#load').hasClass('hidden')) {
          $('#load').removeClass('hidden');
        };
    }
    else {
      console.log('no categories have been created');
      // $('#load').css({'visibility': 'hidden'});
    }
  }

  homeButtons();


})
