$(document).ready(function() {


    // INTIALIZING COUNT VARIABLEs

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
        if (!truthy) {
            truthy = true;
        };
        return [countNum, truthy];
    }

    // MODEL

    //category storage
    let categories = [];

    const item_id_countArr = [];
    const newArr = [];

    // setInterval(function(){
    //   console.log(categories.name);
    // }, 5000);
    const CatConstruct = function(name) {
        this.name = name;
        // will get populated once user has created a list item.
        this.todo = [];
        // when user adds task to doing list item will be added here
        this.doing = [];
        // completed task goes here
        this.done = [];
    }

    // adds category to storage object to storage
    const storeCategory = function(input) {
        // let num = 100;
        // create object for cat item;
        categories.push(new CatConstruct(input));
        // return categories;
        console.log(categories);
    }

    // const updateLeftCats = (inp)=>{
    //   $.each($(imp), function(i, item){
    //     console.log(`modal id's for each list item: ${$(this).attr('data-mdl-id')}`);
    //   })
    // }


    // VIEW

    const createCatFunc = (usrInput, event) => {
        count();
        console.log(`count num after ++ ${countNum}`);
        // create our list & modals
        let htmlListitem = `
          <li class="cat-card animated fadeIn" id="catItm" data-mdl-id="catmodal-${countNum}" data-id-count="${idCount}">
            <div class="bar">
              <div class="row description">
                <div class="col-xs-12">
                  <section class="custom-height">
                      <p class="category-t" data-toggle="modal" data-target="#catmodal-${countNum}">${usrInput}</p>
                      <p class="delete-cat" id="delCat"><i class="fa fa-times-circle-o hvr hvr-grow"></i></p>
                  </section>
                </div>
              </div>
              <div class="row counters" data-toggle="modal" data-target="#catmodal-${countNum}">
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
            let modalList = `<div class="modal list-modals fade" tabindex="-1" role="dialog" id="catmodal-${countNum}"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title"><strong>${usrInput}</strong></h4> </div> <div class="modal-body"> <section class="inputField list-input"> <input type="text" name="" value="" class="inputBox inputList" id="inpList" placeholder="Add List Items ..."><div class="input-buttons"><span class="fa fa-plus-circle" id="addItem"></span></div> <div class="input-buttons clearBox" id="clearItem"><span class="fa fa-times-circle-o"></span></div> </section> <section class="todo-sec todoItems"> <h3>Todo Items <span class="fa fa-tasks"></span></h3> <ul class="list-cards" id="todoList"> <li class="list-card animated fadeIn" id="listItm"> <div class="bar"> <div class="row description"> <div class="col-xs-12"> <section class="custom-height"> <p class="category-t">${usrInput}</p> <p class="delete-cat" id="delItem"><i class="fa fa-times-circle-o hvr hvr-grow"></i></p> </section> </div> </div> <div class="row bar"> <div class="col-xs-2 col-xs-offset-3 col"> <div class="list-buttons" id="lb1"> <span class="fa fa-tasks"></span> </div> </div> <div class="col-xs-2 col"> <div class="list-buttons" id="lb2"> <span class="fa fa-spinner"></span> </div> </div> <div class="col-xs-2 col"> <div class="list-buttons" id="lb3"> <span class="fa fa-check"></span> </div> </div> </div> </div> </li> </ul> </section> <section class="todo-sec doingItems"> <h3>Doing Items <span class="fa fa-spinner"></span></h3> <ul class="list-cards" id="doingList"> </ul> </section> <section class="todo-sec completedItems"> <h3>Completed Items <span class="fa fa-check"></span></h3> <ul class="list-cards" id="completeList"> </ul> </section> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close Categorgies list</button> </div> </div> </div> </div`;

        // get parent id's for items
        const catList = document.getElementById('catList_cards');
        const modalsDiv = document.getElementById('mdlStorage');

        catList.innerHTML = htmlListitem + catList.innerHTML;
        $(modalsDiv).append(modalList);

        // stops issue with fade on items when new one is created
        setTimeout(function() {
            if ($('.cat-card').hasClass('fadeIn')) {
                $('.cat-card').removeClass('fadeIn');
            }
        }, 2100);

        //gives list item a new id
          // let attrId = $('#catItm').attr('id');
          // console.log(attrId);
          // console.log(typeof attrId);
          // console.log(count);
          //
          // let newId = `${attrId}${count}`;
          // attrId = newId;
          // console.log(attrId);
          // $('#catItm').attr('id', attrId);

          // count++;
    }

    const slideUp = (catLength) => {
        if (catLength >= 1 && catLength <= 1) {
            $('.cat-input').animate({
                marginTop: '10%'
            }, 1000);
        } else if (catLength === 0) {
            $('.cat-input').animate({
                marginTop: '40%'
            }, 1000);
        }
    }

    // CONTROLLER

    const getInputVal = (clickBtn, clearBtn, input) => {
        // console.log(clickBtn);
        document.getElementById(clickBtn).addEventListener('click', function() {
            // console.log(input.val());
            let value = input.val();
            if (value) {
                // creates our list item
                createCatFunc(value);
                storeCategory(value);
                slideUp(categories.length)
                deleteCatModal();

                // clear the value of the input field
                input.val('');
            } else {
                alert("No Input");
            }
        });
        let inputTest = document.getElementById('inpCat').addEventListener('keypress', function(e) {
            if (e.keyCode === 13) {
                createCatFunc(this.value);
                storeCategory(this.value);
                slideUp(categories.length);


                deleteCatModal();

                this.value = "";
            }
        });
        document.getElementById(clearBtn).addEventListener('click', function() {
            input.val('');
        });
    }

    const updateId = (idVal, listItemsLeft) => {
          console.log('i run');

          // array to store each item data-id-count value. loops and checkes after an item has been deleted

          $('.cat-card').each(function(){
            let temp = Math.floor($(this).attr('data-id-count'));
            // console.log(`Items id\'s: ${temp}`);
            item_id_countArr.push(temp);

          })


          function checkOrder() {
            console.log(`Array Values: ${item_id_countArr}`);

            // console.log();
            // new array id values should be printed out here
            // console.log(newArr.length);
            if (newArr.length > 0) {
              //wipe array; and then add back to it getting updated list total
              newArr.splice(0, newArr.length);
              newArr.push(...item_id_countArr);
            }
            else {
              // runs once at the beginning of program.
              newArr.push(...item_id_countArr);
              // return newArr;
            }
              console.log(newArr);
            function updateExisting() {
              item_id_countArr.splice(0, item_id_countArr.length);
              return item_id_countArr;
            }
            updateExisting();
          }
          checkOrder();
          // console.log(`UPDATED Array Values: ${item_id_countArr}`);
          // return item_id_countArr;

    } // end update ID function


    const deleteCatModal = () => {
        $('.delete-cat').click(function(event) {
            let item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
            let parent = item.parentNode;
            let textBoxValue = $(this).parent().children('.category-t').text();

            // get the id from the deleted attribute
            let id = $(item).attr('data-mdl-id');
            // code here is used to remove items & modals
            parent.removeChild(item);
            $(`#${id}`).remove();

            // deletes value from array based on a linear search
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].name === textBoxValue) {
                    categories.splice(i, 1);
                }
            }

            //get length of list after item is deleted;

            updateId(id, categories.length);

            //display updated categories array; use when debugging
            setTimeout(function() {
                c_minus();
                console.log("");
                console.log("");
                console.log(`count num after -- (${countNum})`);
                console.log(`deleted item id: ${id}`);
                // console.log('Updated Array Below:');
                // $.each(categories, function(i, item) {
                //     console.log(categories[i].name);
                // })
                console.log(" ");
                console.log(" ");
                slideUp(categories.length);
            }, 1000);


        }) // end of click event
    } //end of deleteCat function






    // Call functions
    getInputVal($('#addCat').attr('id'), $('#clearBox').attr('id'), $('#inpCat'));
    // deleteCat();








    // will store single values with key=>value pair
    localStorage.setItem("name", "jason reid");
    let carType;


    $('#myBtn2').click(function() {
        carType = 'Vauxhall corsa';
        localStorage.setItem("car", carType);
        $('#storage1').text(localStorage.getItem("car"));
    })

    $('#myBtn3').click(function() {
        let pTag = document.createElement('p');
        pTag.classList.add('created');
        pTag.innerText = 'hello';
        let position = document.getElementById('screate');

        position.insertBefore(pTag, position.childNodes[0]);
        let mynode = pTag.parentNode;
        console.log(mynode);
        // let stringNode = JSON.stringify(node);
        let stringNode = mynode.toString();

        console.log(stringNode);
        // localStorage.setItem('node', stringNode);
    })

    let obj = {
        fname: 'reid',
        age: 22
    }

    // this will turn object into a string so it can be stored in localStorage
    let str = JSON.stringify(obj);
    localStorage.setItem('testobj', str);

    $('#storage1').text(localStorage.getItem("car"));

    //we retrieve object that has been stored as a string
    let retrieveObjString = localStorage.getItem('testobj');

    // before we can use the object we have to turn it back into an object
    let retrieveObj = JSON.parse(retrieveObjString);

    // console.log(typeof retrieveObj);
    // console.log(retrieveObj.fname);

    $('#storage2').text(retrieveObj.fname);

    $('#myBtn').click(function(e) {
        carType = 'porshe';
        localStorage.setItem('car', carType);
        // localStorage.removeItem('car');
        $('#storage1').text(localStorage.getItem("car"));
        return carType;
    })


})


// get all the list item ID's that are on the page
  // let theIds = [];
  // $('.cat-card').each(function(val) {
  //     if ($(this).attr('data-mdl-id') === 'undefined') {
  //       return;
  //     }
  //     else{
  //       console.log(`modal id's for each list item left on page: ${$(this).attr('data-mdl-id')}`);
  //
  //       theIds.push($(this).attr('data-mdl-id'));
  //     }
  //
  // });
  // console.log("");
  // console.log(theIds);
  // console.log("");
  // let card = idVal,
  //     liLeft = listItemsLeft;
  // console.log(`card: ${card}`);
  // let search = parseInt(card.replace(/catmodal-/i, ' ').trim());
  // console.log(`search: ${search}`);
  // console.log(`search: ${typeof search}`);
  //
  // if (liLeft > 0) {
  //     if (search > 1) {
  //         search -= 1;
  //         return search;
  //     }
  // }
