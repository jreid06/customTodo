'use strict';

const catArray = (localStorage.getItem('categories')) ? JSON.parse(localStorage.getItem('categories')):[];

// create out count function
const count = (function() {
    let counter = 0;

    return {
        add: function() {
            return counter += 1;
        },
        minus: function() {
            console.log(counter);
            return counter -= 1;
        },
        total: function() {
            return counter;
        }
    }
    // return counter;
})();

// create storage for all categories
const categories = (function(input) {
    let name = '';
    const storeCat = (val) => {
        catArray.push(val);
        catArray[catArray.length - 1].genID();
        console.log(catArray);
        if (catArray.length > 0) {
          $('.cat-input').animate({
            marginTop: '10%'
          }, 600);
        }
    }

    function createCat(input) {
        const CategoryClass = function(name) {
            this.name = name;
            this.listId = '';
            this.id = 0;
            this.todo = [];
            this.doing = [];
            this.completed = [];
            this.genID = function() {
                this.id = count.add();
                // count();
            }
            this.minusID = function() {
                this.id -= 1;
            }
        }
        storeCat(new CategoryClass(name));
    }

    return {
        getInputVal: function(val) {
            name = val;
            // add();
        },
        add: function() {
            createCat(name);
            (function() {
              localStorage.setItem('categories', JSON.stringify(catArray));
            })();
        },
        storedVal: function() {
            return catArray;
        }
    }
})();


$(document).ready(function() {
    const render = ()=>{
      console.log('render function works');
      console.log(catArray);
      setTimeout(function(){
        for (var i = 0; i < catArray.length; i++) {
          count.add();
          createCatList('cat',catArray[i].name,'#catList_cards');
        }

        if (catArray.length > 0) {
          $('.cat-input').animate({
            marginTop: '10%'
          }, 700);
        }
      }, 1000);

    }

    // save all categories to local storage
    function categoriesArrayUpdated() {
        localStorage.setItem('categories', JSON.stringify(catArray));
    }



    // click events
    $('#inpCat').on('keypress', function(event) {
        let button = $(this);
        if (event.keyCode === 13) {
            console.log('Enter event has been run');
            console.log('-------------------------');
            console.log(button);
            let type = $(button).attr('data-type'),
                inpVal = $(button).val();

            console.log(type);
            console.log(inpVal);
            console.log('');
            console.log('');
            if (type === 'cat') {
                categories.getInputVal(inpVal);
                categories.add('');
                createCatList(type, inpVal, '#catList_cards');
                // checkArrayLength();
                // CatListFunctions();
            }
            button.val('');
        }
    })

    $('#addCat').on('click', function(event) {

        // get the button that triggered the event & its type e.g cat or list
        let button = `#${$(event.target).parent().attr('id')}`,
            type = $(button).attr('data-type'),
            inputBox = `#${$(event.target).parents().eq(1).children(0).attr('id')}`,
            inpVal = $(inputBox).val();

        console.log('input id\'s, data-type attrib and VAl');
        console.log('----------------------------');
        console.log(button);
        console.log(type);
        console.log(inputBox);
        console.log(inpVal);

        console.log('---------------');
        if (type === 'cat') {
            categories.getInputVal(inpVal);
            categories.add('');
            createCatList(type, inpVal, '#catList_cards');
            // checkArrayLength();

        }
        $(inputBox).val('');

    });

    const createCatList = (type, val, listDest) => {

        const catHTML =
            $(`<li class="cat-card animated fadeIn" id="catItm-${count.total()}" data-mdl-id="catmodal-${count.total()}" data-id-count="${count.total()}">
              <div class="bar">
                <div class="row description">
                  <div class="col-xs-12">
                    <section class="custom-height">
                        <p class="category-t" data-toggle="modal" data-target="#catmodal">${val}</p>
                        <p class="delete-cat"><i class="fa fa-times-circle-o hvr hvr-grow" id="delCat-${count.total()}"></i></p>
                    </section>
                  </div>
                </div>
                <div class="row counters">
                  <div class="col-xs-2 col-xs-offset-3 col">
                    <div class="counter" id="c1">
                      <p>0</p>
                    </div>
                  </div>
                  <div class="col-xs-2 col">
                    <div class="counter" id="c2">
                      <p>0</p>
                    </div>
                  </div>
                  <div class="col-xs-2 col">
                    <div class="counter" id="c3">
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>`);

        $(listDest).prepend(catHTML);
        catArray[count.total() - 1].listId = `catItm-${catArray[count.total() - 1].id}`;
        // CatListFunctions();
        $(`#delCat-${count.total()}`).on('click', function(event) {
            console.log('');
            console.log('');
            let button = $(event.target),
                list = $(button).parents('li');
            console.log('Delete Click event function init');
            console.log('--------------------------------');
            console.log(button);
            let position = Math.floor($(list).attr('data-id-count'));
            let correctItem = `#${$(list).attr('id')}`;
            console.log(correctItem);
            count.minus();
            $(correctItem).remove();

            for (var i = 0; i < catArray.length; i++) {
                // console.log('In for loop Below');
                // console.log('-------------------');
                console.log(catArray[i].id);
                if (catArray[i].id === position) {
                    // console.log(`Name; ${catArray[i].name} - ID: ${catArray[i].id}`);
                    // console.log(position);
                    // console.log('');
                    // console.log('');
                    console.log('item deleted below -------');
                    console.log(catArray[i]);
                    catArray.splice(i, 1);
                    console.log(catArray);
                    updateDataIdAttr(position);

                    localStorage.setItem('categories', JSON.stringify(catArray));
                }

            }

          if (catArray.length === 0) {
            $('.cat-input').animate({
              marginTop: '40%'
            }, 600);
          }

        })
    }

    const updateDataIdAttr = (position) => {

        // position is the value of the the deleted item 'data-id-count' attr
        // sets the starting position from where to update remaining item ID's
        console.log(`updateDataIdAttr: ${position}`);
        console.log(position);
        for (var i = position - 1; i < catArray.length; i++) {
            let newList = catArray[i],
                currentListID = newList.listId;

            // stores value of id before update
            console.log(`Current list ID: ${currentListID}`);

            // newList.minusID();
            newList.id -= 1;
            newList.listId = `catItm-${catArray[i].id}`;

            newList = catArray[i];
            console.log(`New List ID: ${newList.listId}`);

            // use the currentListID value to update the correct listItem
            $(`#${currentListID}`).attr({
                'id': newList.listId,
                'data-mdl-id': `catmodal-${newList.id}`,
                'data-id-count': newList.id
            });

            // update the delete button id
            $(`#${newList.listId}`).find('p').eq(1).children().attr('id', `delCat-${newList.id}`);


        }

    }


    render();







    ///////////////////////////////////////////////////////////////////////



    function dwightJob(title) {
        // console.log(`title: ${title}`);
        return function(prefix) {
            console.log(`prefix: ${prefix}`);
            console.log(`returned title: ${title}`);

            return prefix + ' ' + title;
        };
    }

    var sales = dwightJob('Salesman');
    var manager = dwightJob('Manager');

    // these become the prefix values
    // console.log(sales('Top'));  // Top Salesman
    // console.log(manager('Assistant to the Regional')); // Assistant to the Regional Manager
    // console.log(manager('Regional')); // Regional Manager



})
