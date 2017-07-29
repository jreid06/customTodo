'use strict';

const categories = [];
<<<<<<< HEAD
function getCatlength(arr) {
  return arr.length;
}

$(document).ready(function(){

// counter and storage

let countNum = 0,
    idCount = countNum,
    truthy = false,
    listCount = 0;

const l_count = ()=>{
  listCount++;
}

const l_minus = ()=>{
  listCount--;
}

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
=======
>>>>>>> newjs

function getCatlength(arr) {
    return arr.length;
}

<<<<<<< HEAD
let currentClickID = '';
let dataIdModal;
=======
$(document).ready(function() {
>>>>>>> newjs

    // counter and storage

    let countNum = 0,
        idCount = countNum,
        truthy = false,
        listCount = 0;

<<<<<<< HEAD
  let modalIdentity = $('.list-modals').attr('id');
  $(`#${modalIdentity}`).on('show.bs.modal', function (event) {
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
    // console.log($(`#${thisModal}`).find('#inpList'));
    console.log(dataIdModal);
    console.log(modal);
    let input = $(`#${thisModal}`).find(`#inpList-${dataIdModal}`).attr('id');
    let add = $(`#${thisModal}`).find(`#addItem-${dataIdModal}`).attr('id');
    let clr = $(`#${thisModal}`).find(`#clearItem-${dataIdModal}`).attr('id');

    //use to understand what the aboive code is doing
    // console.log($(input).attr('id'));
    console.log(input);
    console.log(add);
    console.log(clr);
=======
    const l_count = () => {
        listCount++;
    }

    const l_minus = () => {
        listCount--;
    }

    const count = () => {
        countNum++;
        idCount++;
        if (truthy) {
            truthy = false;
        };
        return [countNum, truthy];
    }

    const c_minus = () => {
        countNum--;
        idCount--;
        if (!truthy) {
            truthy = true;
        };
        return [countNum, truthy];
    }
>>>>>>> newjs

    // storage

    let delId;
    const item_id_countArr = [];
    const newArr = [];

    const CategoryClass = function(name) {
        this.name = name;
        this.id = 0;
        this.todo = [];
        this.doing = [];
        this.completed = [];
        this.genID = function() {
            this.id = countNum + 1;
            count();
        }
        this.minusID = function() {
            this.id -= 1;
        }
    }

<<<<<<< HEAD

    // get the id of the todo list within that modal to add use when we create an item
    console.log(dataIdModal);
    let tdlst = modal.find('.todoItems').find(`#todoList-${dataIdModal}`);
    console.log(tdlst);

    // variable declared globally that gets the correct todo list ID
    currentClickID = $(tdlst).attr('id');
    console.log(`todolist id = ${currentClickID}`);
=======
    let currentClickID = '';
    let dataIdModal;
>>>>>>> newjs

    // call Functions

    function catItemFunctions() {

<<<<<<< HEAD

=======
        let modalIdentity = $('.list-modals').attr('id');
        $(`#${modalIdentity}`).on('show.bs.modal', function(event) {
            // console.log(`#catmodal-${idCount}`);
            console.log("");
            console.log("");
>>>>>>> newjs

            console.log('clicked');
            let button = $(event.target),
                modal = $(this),
                thisModal = modal.attr('id'),
                dataIdModal = modal.attr('data-id-count');

            console.log(button);
            console.log(thisModal);
            // console.log($(`#${thisModal}`).find('#inpList'));
            console.log(dataIdModal);
            console.log(modal);
            let input = $(`#${thisModal}`).find(`#inpList-${dataIdModal}`).attr('id');
            let add = $(`#${thisModal}`).find(`#addItem-${dataIdModal}`).attr('id');
            let clr = $(`#${thisModal}`).find(`#clearItem-${dataIdModal}`).attr('id');

            //use to understand what the aboive code is doing
            // console.log($(input).attr('id'));
            console.log(input);
            console.log(add);
            console.log(clr);

            // initizes click functions for that modal
            clickItem(add, $(`#${input}`), $(`#${clr}`), $(`#${input}`).attr('data-type'));


<<<<<<< HEAD
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
              // console.log(categories[i].id);
              // console.log(clickID);
              if (categories[i].id === clickID) {
                console.log(true);
                categories[i].todo.push(val);
              }
            }
=======
            // get the id of the todo list within that modal to add use when we create an item
            console.log(dataIdModal);
            let tdlst = modal.find('.todoItems').find(`#todoList-${dataIdModal}`);
            console.log(tdlst);
>>>>>>> newjs

            // variable declared globally that gets the correct todo list ID
            currentClickID = $(tdlst).attr('id');
            console.log(`todolist id = ${currentClickID}`);

        })

        // clickItem()
    }
<<<<<<< HEAD
    return;
  })
=======
>>>>>>> newjs



<<<<<<< HEAD
              // updates id for each item e.g the last in the array
              categories[categories.length - 1].genID();
              console.log(categories);
              createItem(val);
              slideUpDown('.cat-input');
              deleteItem();


              this.value = '';
            }
          break;
        case 'list':
            console.log('list input click');
            if(val){
              let clickID = Math.floor(inp.attr('data-input'));

              // categories.todo.push(new CategoryClass(val));
              for (var i = 0; i < categories.length; i++) {
                // console.log(`clickID: ${clickID}`);
                // console.log(categories[i].id);
                if (categories[i].id === clickID) {
                    console.log(true + ": VALUE ADDED TO TODO ARRAY");
                    categories[i].todo.push(val);
                  }
              }

              console.log(categories);
              createListItem(val, currentClickID);

              inp.val('');
=======
    // click functions



    function clickItem(clickItm, inp, clearInp, type) {
        // let button = $(event.relatedTarget);
        // console.log(button);
        document.getElementById(clickItm).addEventListener('click', function() {
            let val = inp.val();
            switch (type) {
                case 'cat':
                    console.log('cat input click');
                    if (val) {
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
                    console.log("");
                    console.log("");
                    console.log('list input click');
                    if (val) {
                        let clickID = Math.floor(inp.attr('data-input'));
                        console.log(`clickID: ${clickID}`);
                        // console.log();

                        // categories.todo.push(new CategoryClass(val));
                        for (var i = 0; i < categories.length; i++) {
                            // console.log(categories[i].id);
                            // console.log(clickID);
                            if (categories[i].id === clickID) {
                                console.log(true);
                                categories[i].todo.push(val);
                            }
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
        document.getElementById(input).addEventListener('keypress', function(event) {
            let val = this.value;

            if (event.keyCode === 13) {
                switch (type) {
                    case 'cat':
                        console.log('cat input click');
                        if (val) {
                            categories.push(new CategoryClass(val));

                            // updates id for each item e.g the last in the array
                            categories[categories.length - 1].genID();
                            console.log(categories);
                            createItem(val);
                            slideUpDown('.cat-input');
                            deleteItem();


                            this.value = '';
                        }
                        break;
                    case 'list':
                        console.log(" ");
                        console.log(" ");
                        console.log('list input click');
                        if (val) {
                            let clickID = Math.floor(inp.attr('data-input'));

                            // categories.todo.push(new CategoryClass(val));
                            for (var i = 0; i < categories.length; i++) {
                                // console.log(`clickID: ${clickID}`);
                                // console.log(categories[i].id);
                                if (categories[i].id === clickID) {
                                    console.log(true + ": VALUE ADDED TO TODO ARRAY");
                                    categories[i].todo.push(val);
                                }
                            }

                            console.log(categories);
                            createListItem(val, currentClickID);

                            inp.val('');
                        }

                        break;
                }
>>>>>>> newjs
            }
        })

        let del = clearInp.attr('id');
        document.getElementById(del).addEventListener('click', function() {
            inp.val('');
        })
    }

    // actions

    const getRemainingId = (idVal) => {
        // array to store each item data-id-count value. loops and checkes after an item has been deleted
        $('.cat-card').each(function() {
            let temp = Math.floor($(this).attr('data-id-count'));
            // console.log(`Items id\'s: ${temp}`);
            item_id_countArr.push(temp);
        })

        item_id_countArr.sort(function(a, b) {
            return a - b
        });
        // console.log(`before: ${item_id_countArr}`);

        let temp = 0;
        if (item_id_countArr[0] === 1) {
            temp += 1;
            // console.log(`temp: ${temp}`);
        }

        if (temp === 1) {
            console.log(`deleted id data-id-count value: ${idVal}`);
            //deleted item number - 1;
            let t = idVal - 1;
            // start from deleted items position and -1 from each value updating id's
            for (let i = t; i < item_id_countArr.length; i++) {
                item_id_countArr[i] -= 1;
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

    const updateListNumbers = (parent) => {
        console.log(`Current Modal TodoList id: #${parent}`);
        let howMany = $(`#${parent}`).find('li');
        console.log(howMany.length);

        // gets the direct child element of todolist-"1"
        let correctListItem = $(`#${parent}`).children('li').attr('id');
        console.log(correctListItem);
        $(`#${correctListItem}`).attr({
            'item-num': howMany.length,
            'id': `${correctListItem}${howMany.length}`
        });

        // let splitClass = correctListItem.split(' ');
        // console.log(splitClass[0]);
        // $(`.${splitClass[0]}`).attr('item-num', howMany.length);

        setTimeout(function() {
            let param = $(`#${correctListItem}${howMany.length}`).attr('item-num');
            console.log("''");
            console.log(`New Val for correctListItem: ` + param);
            console.log(correctListItem);
            let list = $(`#${parent}`).children('li').attr('id');
            console.log(list);

            if ($(`#${list}`).parent().attr('id') === parent) {
              console.log(true);
              let delBtn = $(`#${list}`).find('p').eq(1),
                  delBtnID = delBtn.attr('id');
              console.log(delBtn);
              console.log(delBtnID);
              let newId = delBtnID + `-${param}`;
              console.log(newId);
              delBtn.attr('id', newId);

              let listAfter = $(`#${parent}`).children('li').attr('id');
              console.log(listAfter);

              deleteListItem(newId);
            }

        }, 2000)

    }

    const updateDataIdAttr = () => {
        // console.log('updateDataIdAttr Results: ');
        item_id_countArr.sort(function(a, b) {
            return b - a
        });
        let num = -1,
            num2 = -1,
            num3 = -1;

        $('.cat-card').each(function() {
            // goes through each item attribute and updates it with its new value from the array item_id_countArr;
            $(this).attr({
                'data-id-count': item_id_countArr[num += 1],
                'data-mdl-id': `catmodal-${item_id_countArr[num]}`
            });
        })

        $('.category-t').each(function() {
            $(this).attr('data-target', `#catmodal-${item_id_countArr[num2 += 1]}`)
        })

        // let lowHigh = item_id_countArr.sort(function(a,b){return a - b});
        $('.list-modals').each(function() {
            $(this).attr({
                'id': `catmodal-${item_id_countArr[num3 += 1]}`,
                'data-id-count': item_id_countArr[num3]
            });
        })

        console.log('item_id_count_arr:');
        console.log(item_id_countArr);

        $('.list-cards').each(function() {
            let storeId = $(this).attr('id');
            let idSubstr = storeId.substr(0, storeId.length - 1);
            // console.log(idSubstr);
            let val = $(this).parents('div').eq(3).attr('data-id-count');
            console.log("list card parent data-id-count attrib: " + val);
            $(this).attr({
                'id': `${idSubstr}${val}`
            });
            // console.log(`${idSubstr}${val}`);
        })

        //
        $('.list-input').children().each(function() {
            let storeId = $(this).attr('id'),
                val = $(this).parents('div').eq(3).attr('data-id-count'),
                idSubstr = storeId.replace(/.$/, `${val}`);
            $(this).attr({
                'id': `${idSubstr}`
            });
            if ($(this).attr('data-input')) {
                $(this).attr('data-input', `${val}`);
            }
            // console.log(`${idSubstr}${val}`);


        })
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
    const deleteListItem = (val) => {
        console.log('deleteListItem() called');
        $(`#${val}`).click(function(event) {
            console.log('delete Item clicked');
            let item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
            console.log(item);
            let itemID = $(item).attr('id');
            console.log(`Deleted item ID: ${itemID}`);
            let parent = $(item.parentNode).attr('id');
            console.log(`Parent: ${parent}`);
            // parent.removeChild(item);
            $(`#${parent}`).find(`#${itemID}`).remove();
            // $(`#${itemID}`).remove();
            // let textBoxValue = $(this).parent().children('.category-t').text();

            // used to delete list item from the correct category todo.array
            let modalParentID = $(this).parents('li').attr('item-num');

            // console.log(modalParentID);
            console.log(`deleted item position: ${modalParentID}`);
            // categories[modalParentID].todo

            l_minus();
        })
    }

    const deleteItem = () => {
        $('#delCat').click(function(event) {
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

    const slideUpDown = (element, n) => {
        n = categories.length;
        if (n >= 1 && n <= 1) {
            $(element).animate({
                marginTop: '10%'
            }, 1000);
        } else if (n === 0) {
            $(element).animate({
                marginTop: '40%'
            }, 1000);
        }

    }

    const createListItem = (itemTitle, todoList) => {
        // listCount = 0;
        // l_count();
        console.log('list created');
        let listItem = `<li class="list-card animated fadeIn" id="listItm">
      <div class="bar">
        <div class="row description">
          <div class="col-xs-12">
            <section class="custom-height">
              <p class="category-t">${itemTitle}</p>
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

        // todo list ID e.g -1 (not minus one) must correspond with modal ID e.g -1 with the numerical park to the
        // const todoSec = document.getElementById('todolist');

        //todolist variable is the id of the list to append the item to
        $(`#${todoList}`).prepend(listItem);
        updateListNumbers(todoList);
        // deleteListItem();
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
                    <div class="input-buttons " id="addItem-${idCount}"><span class="fa fa-plus-circle"></span></div>
                    <div class="input-buttons clearBox" id="clearItem-${idCount}"><span class="fa fa-times-circle-o"></span></div>
                </section>
                <section class="todo-sec todoItems todoList">
                    <h3>Todo Items <span class="fa fa-tasks"></span></h3>
                    <ul class="list-cards" id="todoList-${idCount}"> </ul>
                </section>
                <section class="todo-sec doingItems doingList">
                    <h3>Doing Items <span class="fa fa-spinner"></span></h3>
                    <ul class="list-cards" id="doingList-${idCount}"> </ul>
                </section>
                <section class="todo-sec completedItems doneList">
                    <h3>Completed Items <span class="fa fa-check"></span></h3>
                    <ul class="list-cards" id="doneList-${idCount}"> </ul>
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


        setTimeout(function() {
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
