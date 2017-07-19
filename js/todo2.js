$(document).ready(function(){


// counter and storage

let countNum = 0;
let idCount = countNum;
let truthy = false;

const count = () => {
    countNum++;
    idCount ++;
    if (truthy) {
        truthy = false;
    };
    return [countNum, truthy];
}

const c_minus = () => {
    countNum--;
    idCount --;
    if (!truthy) {
        truthy = true;
    };
    return [countNum, truthy];
}

// storage

const CategoryClass = function(name){
  this.name = name;
  this.id = 0;
  this.todo = [];
  this.doing = [];
  this.completed = [];
  this.genID = function(){
    this.id = countNum;
    count();
  }
}

let categories = [];


// click functions
function clickItem(clickItm, inp, clearInp, type) {
  document.getElementById(clickItm).addEventListener('click', function(){
    let val = input.val();

    switch (type) {
      case 'cat':
          console.log('cat input click');
          if(val){
            categories.push(new CategoryClass(val));

            // updates id for each item e.g the last in the array
            categories[categories.length - 1].genID();
            console.log(categories);
            createItem(val);
            slideUpDown('.cat-input');
            // updateStorage();
          }
        break;
      case 'list':

        break;
    }
  })

  input = inp.attr('id');
  document.getElementById(input).addEventListener('keypress', function(event){
    let val = this.value;

    if (event.keyCode === 13) {
      switch (type) {
        case 'cat':
            console.log('cat input click');
            if(val){
              categories.push(new CategoryClass(val));

              // updates id for each item e.g the last in the array
              categories[categories.length - 1].genID();
              console.log(categories);
              createItem(val);
              slideUpDown('.cat-input');
              // updateStorage();
            }
          break;
        case 'list':

          break;
      }

    }

  })
}

// actions

const slideUpDown = (element, n)=>{
  n = categories.length;
  if (n >=1 && n <=1) {
    $(element).animate({
      marginTop: '10%'
    }, 1000);
  }else if (n === 0) {
    $(element).animate({
      marginTop: '40%'
    }, 1000);
  }

}

const createItem = (catTitle, id, event) => {
  let listHtml = `<li class="list-card animated fadeIn" id="listItm">
    <div class="bar">
      <div class="row description">
        <div class="col-xs-12">
          <section class="custom-height">
            <p class="category-t">${catTitle}</p>
            <p class="delete-cat delete-list" id="delItem"><i class="fa fa-times-circle-o hvr hvr-grow"></i></p>
          </section>
        </div>
      </div>
      <div class="row bar">
          <div class="col-xs-2 col-xs-offset-3 col active">
            <div class="list-buttons" id="lb1">
              <span class="fa fa-tasks"></span>
            </div>
          </div>
          <div class="col-xs-2 col">
            <div class="list-buttons" id="lb2">
              <span class="fa fa-spinner"></span>
            </div>
          </div>
          <div class="col-xs-2 col">
            <div class="list-buttons" id="lb3">
            <span class="fa fa-check"></span>
            </div>
          </div>
      </div>

    </div>
    </li>`;
  let destList = document.getElementById('catList_cards');
  $(destList).prepend(listHtml);
}

clickItem('addCat', $('#inpCat'), $('#clearBox'), $('.inputBox').attr('data-type'));


})
