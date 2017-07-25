'use strict';

const categories = [];
function getCatlength(arr) {
  return arr.length;
}

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

let delId;
const item_id_countArr = [];
const newArr = [];

const CategoryClass = function(name){
  this.name = name;
  this.id = 0;
  this.todo = [];
  this.doing = [];
  this.completed = [];
  this.genID = function(){
    this.id = countNum + 1;
    count();
  }
  this.minusID = function(){
    this.id -= 1;
  }
}

let currentClickID = '';
let dataIdModal;

// call Functions

function catItemFunctions() {

  $('.list-modals').on('show.bs.modal', function (event) {
    // console.log(`#catmodal-${idCount}`);
    console.log("");
    console.log("");

    console.log('clicked');
    let button = $(event.target),
        modal = $(this),
        thisModal = modal.attr('id'),
        dataIdModal = modal.attr('data-id-count');

    console.log(button);
    console.log(thisModal);
    console.log($(`#${thisModal}`).find('#inpList'));
    let input = $(`#${thisModal}`).find(`#inpList-${dataIdModal}`).attr('id');
    let add = $(`#${thisModal}`).find(`#addItem-${dataIdModal}`).attr('id');
    let clr = $(`#${thisModal}`).find(`#clearItem-${dataIdModal}`).attr('id');

    //use to understand what the aboive code is doing
    // console.log($(input).attr('id'));
    console.log(input);
    console.log(add);
    console.log(clr);

    // initizes click functions for that modal
    clickItem(add,$(`#${input}`), $(`#${clr}`),$(`#${input}`).attr('data-type'));


    // get the id of the todo list within that modal to add use when we create an item
    console.log(dataIdModal);
    let tdlst = modal.find('.todoItems').find(`#todoList-${dataIdModal}`);
    console.log(tdlst);

    // variable declared globally that gets the correct todo list ID
    currentClickID = $(tdlst).attr('id');
    console.log(`todolist id = ${currentClickID}`);

  })

  // clickItem()
}



// click functions



function clickItem(clickItm, inp, clearInp, type) {
  // let button = $(event.relatedTarget);
  // console.log(button);
  document.getElementById(clickItm).addEventListener('click', function(){
    let val = inp.val();
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
            deleteItem();

            createListItem(val, currentClickID);
            // catItemFunctions();

            inp.val('');
          }
        break;
      case 'list':
          console.log('list input click');
          if(val){
            let clickID = Math.floor(inp.attr('data-input'));
              console.log(`clickID: ${clickID}`);
              // console.log();

            // categories.todo.push(new CategoryClass(val));
            for (var i = 0; i < categories.length; i++) {
              console.log(categories[i].id);
              // console.log(clickID);
              // if (categories[i].id === clickID) {
              //   console.log(true);
              //   categories[i].todo.push(val);
              // }
            }

            // let correctList = this.parentNode;
            // console.log(correctList);

            console.log(categories);
            createListItem(val, currentClickID);

            // deleteItem();
              // $('#delItem').on('click', function(event){
              //   let button = $(event.target.id);
              //   console.log(button);
              // });
              // updateStorage();
            inp.val('');
          }

        break;
    }
    return;
  })

  let input = inp.attr('id');
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
              deleteItem();
              // updateStorage();
              // catItemFunctions();
              // $('.list-cards').each(function(){
              //   console.log($(this));
              //   let todo = $(this).attr('id');
              //   console.log(todo);
              //   let rep = todo.substr(0, todo.length - 1);
              //   console.log(`REP: ${rep}`);
              //   // if ($(this).attr('id') === "todoList") {
              //   //
              //   // }
              //   // $(this).attr({'id':`todoList-${item_id_countArr[num3 += 1]}`, 'data-id-count': item_id_countArr[num3]});
              // })

              this.value = '';
            }
          break;
        case 'list':
            console.log('list input click');
            if(val){
              let clickID = Math.floor(inp.attr('data-input'));

              // categories.todo.push(new CategoryClass(val));
              for (var i = 0; i < categories.length; i++) {
                console.log(`clickID: ${clickID}`);
                console.log(categories[i].id);
                if (categories[i].id === clickID) {
                    console.log(true);
                    categories[i].todo.push(val);
                  }
              }

              console.log(categories);
              createListItem(val, currentClickID);

              inp.val('');
            }

          break;
      }
    }
  })

  let del = clearInp.attr('id');
  document.getElementById(del).addEventListener('click', function(){
    inp.val('');
  })
}

// actions

const getRemainingId = (idVal) => {
      // array to store each item data-id-count value. loops and checkes after an item has been deleted
      $('.cat-card').each(function(){
        let temp = Math.floor($(this).attr('data-id-count'));
        // console.log(`Items id\'s: ${temp}`);
        item_id_countArr.push(temp);
      })

      item_id_countArr.sort(function(a,b){return a - b});
      // console.log(`before: ${item_id_countArr}`);

      let temp = 0;
      if (item_id_countArr[0] === 1) {
        temp +=1;
        // console.log(`temp: ${temp}`);
      }

      if (temp === 1) {
        console.log(`deleted id data-id-count value: ${idVal}`);
        //deleted item number - 1;
        let t = idVal - 1;
        // start from deleted items position and -1 from each value updating id's
        for (let i = t; i < item_id_countArr.length; i++) {
          item_id_countArr[i] -=1;
          categories[i].minusID();
        }
      }
      // -1 from all each value if item 1 is deleted
      else if (temp === 0) {
        for (let j = 0; j < item_id_countArr.length; j++) {
          item_id_countArr[j] -= 1;
          categories[j].minusID();
        }
      }

} // end getRemainingId function

const updateDataIdAttr = () =>{
  // console.log('updateDataIdAttr Results: ');
  item_id_countArr.sort(function(a,b){return b - a});
  let num = -1,
      num2 = -1,
      num3 = -1,
      num4 = -1,
      num5 = -1,
      num6 = -1;

  $('.cat-card').each(function(){
    $(this).attr({'data-id-count': item_id_countArr[num += 1], 'data-mdl-id': `catmodal-${item_id_countArr[num]}`});
  })

  $('.category-t').each(function(){
    $(this).attr('data-target', `#catmodal-${item_id_countArr[num2 += 1]}`)
  })

  // let lowHigh = item_id_countArr.sort(function(a,b){return a - b});
  $('.list-modals').each(function(){
    $(this).attr({'id':`catmodal-${item_id_countArr[num3 += 1]}`, 'data-id-count': item_id_countArr[num3]});
  })

  // $('.list-cards').each(function(){
  //   console.log($(this));
  //   let todo = $(this).attr('id');
  //   console.log(todo);
  //   let rep = todo.substr(0, todo.length);
  //   console.log(`REP: ${rep}`);
  //   // if ($(this).attr('id') === "todoList") {
  //   //
  //   // }
  //   // $(this).attr({'id':`todoList-${item_id_countArr[num3 += 1]}`, 'data-id-count': item_id_countArr[num3]});
  // })

}

// used to clear the array each time item is deleted so array can be updated with new items left on page
function clearExisting() {
  // console.log('array updated');
  if (item_id_countArr.length > 0) {
      item_id_countArr.splice(0, item_id_countArr.length);
      // console.log('item_id_count_arr after splice: ');
      // console.log(item_id_countArr);
  }
  return item_id_countArr;
}

//////

const deleteItem = ()=>{
  $('#delCat').click(function(event){
    console.log('delete clicked');
    let item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    let parent = item.parentNode;
    parent.removeChild(item);
    let textBoxValue = $(this).parent().children('.category-t').text();

    // get the id from the deleted attribute to update id's dynamically
    delId = $(item).attr('data-id-count');

    // used to delete correct modal
    let id = $(item).attr('data-mdl-id');
    $(`#${id}`).remove(); // modal


    // deletes value from array based on a linear search
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].name === textBoxValue) {
            categories.splice(i, 1);
        }
    }

    //

    let catLen = categories.length;
    console.log(catLen);

    // if (catLen === 0) {
      slideUpDown('.cat-input');
    // }

    //get length of list after item is deleted;
    getRemainingId(delId);

    c_minus();

    // slideUpDown(categories.length);
    updateDataIdAttr();
    clearExisting();


    console.log("");
    console.log("");
    console.log(categories);
  })
}

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

const createListItem = (itemTitle, todoList)=>{
  console.log('list created');
  let listItem = `<li class="list-card animated fadeIn" id="listItm">
      <div class="bar">
        <div class="row description">
          <div class="col-xs-12">
            <section class="custom-height">
              <p class="category-t">${itemTitle}</p>
              <p class="delete-list-item" id="delItem"><i class="fa fa-times-circle-o hvr hvr-grow"></i></p>
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

    // todo list ID e.g -1 (not minus one) must correspond with modal ID e.g -1 with the numerical park to the
    // const todoSec = document.getElementById('todolist');
    $(`#${todoList}`).prepend(listItem);

}

const createItem = (catTitle, id) => {

  let listHtml = `
    <li class="cat-card animated fadeIn" id="catItm" data-mdl-id="catmodal-${countNum}" data-id-count="${idCount}">
      <div class="bar">
        <div class="row description">
          <div class="col-xs-12">
            <section class="custom-height">
                <p class="category-t" data-toggle="modal" data-target="#catmodal-${countNum}">${catTitle}</p>
                <p class="delete-cat" id="delCat"><i class="fa fa-times-circle-o hvr hvr-grow"></i></p>
            </section>
          </div>
        </div>
        <div class="row counters">
          <div class="col-xs-2 col-xs-offset-3 col">
            <div class="counter" id="c1">
              <p>2</p>
            </div>
          </div>
          <div class="col-xs-2 col">
            <div class="counter" id="c2">
              <p>2</p>
            </div>
          </div>
          <div class="col-xs-2 col">
            <div class="counter" id="c3">
              <p>5</p>
            </div>
          </div>
        </div>
      </div>
    </li>`;

    let modalList = `<div class="modal list-modals fade" tabindex="-1" role="dialog" id="catmodal-${countNum}" data-id-count="${idCount}">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"><strong>${catTitle}</strong></h4> </div>
            <div class="modal-body">
                <section class=" inputField list-input">
                    <input type="text" data-type="list" class="inputBox inputList" id="inpList-${idCount}" placeholder="Add List Items ..." data-input="${idCount}">
                    <div class="input-buttons"><span class="fa fa-plus-circle" id="addItem-${idCount}"></span></div>
                    <div class="input-buttons clearBox" id="clearItem-${idCount}"><span class="fa fa-times-circle-o"></span></div>
                </section>
                <section class="todo-sec todoItems todoList-${idCount}">
                    <h3>Todo Items <span class="fa fa-tasks"></span></h3>
                    <ul class="list-cards" id="todoList-${idCount}"> </ul>
                </section>
                <section class="todo-sec doingItems doingList-${idCount}">
                    <h3>Doing Items <span class="fa fa-spinner"></span></h3>
                    <ul class="list-cards" id="doingList-${idCount}"> </ul>
                </section>
                <section class="todo-sec completedItems doneList-${idCount}">
                    <h3>Completed Items <span class="fa fa-check"></span></h3>
                    <ul class="list-cards" id="completeList-${idCount}"> </ul>
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close Categorgies list</button>
            </div>
        </div>
    </div>
    </div`;

  const destList = document.getElementById('catList_cards');
  const modalsDiv = document.getElementById('mdlStorage');

  $(destList).prepend(listHtml);
  $(modalsDiv).prepend(modalList);


  setTimeout(function(){
    let catLen = categories.length;
    let mdlCount = Math.floor($('.modal').attr('data-id-count'));
    console.log(`Cat len: ${catLen}`);

    if (mdlCount === catLen) {
      let id = $('.modal').attr('id');
      console.log(id);
      catItemFunctions();
    }
  }, 1000);

}

clickItem('addCat', $('#inpCat'), $('#clearBox'), $('.inputBox').attr('data-type'));


})
