'use strict';

const catArray = (localStorage.getItem('categories')) ? JSON.parse(localStorage.getItem('categories')) : [];


function getCatlength(arr) {
    return arr.length;
}


// create out count function
const count = (function() {
    let counter = 0;
    let listcount = 0;

    return {
        add: function() {
            return counter += 1;
        },
        minus: function() {
            return counter -= 1;
        },
        total: function() {
            return counter;
        },
        listAdd: function() {
            return listcount += 1;
        },
        listMinus: function() {
            return listcount -= 1;
        },
        listTotal: function(){
            return listcount;
        },
        clearListCount: function(){
          let a = listcount;
          console.log(`a: ${a}`);
          let b = listcount - a;
          console.log(`b: ${b}`);
          return listcount -= a;
        }
    }
    // return counter;
})();

const ListDetails = function(name){
  this.name = name;
  this.lstID = 0;
  this.lstTitle = '';
  this.statusColor = 'darkred';
  this.active = '';
  this.catListCount = function(){
    this.lstID = count.listAdd();
  };
  this.catListMinus = function(){
    this.lstID -= 1;
  }
}

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

    const addTodo = (val, pos) => {
        catArray[pos].todo.push(val);
        catArray[pos].todo2.push(new ListDetails(val));

        let len = catArray[pos].todo2.length - 1;
        console.log(catArray[pos]);
        // catArray[pos].updateList(val);
        catArray[pos].todo2[len].catListCount();
        catArray[pos].todo2[len].lstTitle = `listItm-${catArray[pos].todo2[len].lstID}`;
        // catArray[pos].updateListCounter();
    }

    function createCat(input) {
        const CategoryClass = function(name) {
            this.name = name;
            this.listId = '';
            this.id = 0;
            this.todo = [];
            this.todo2 = [];
            // this.listCounter = 0;
            this.doing = [];
            this.completed = [];
            this.genID = function() {
                this.id = count.add();
            };
            this.minusID = function() {
                this.id -= 1;
            };
            // this.updateListCounter = function(choice){
			// 	if (choice === 'minus') {
			// 		this.listCounter -= 1;
			// 	}
            //   	else {
            //   		this.listCounter += 1;
            //   	}
            // }
        }
        storeCat(new CategoryClass(name));
    }

    return {
        getInputVal: function(val) {
            name = val;
        },
        add: function() {
            createCat(name);
            (function() {
                localStorage.setItem('categories', JSON.stringify(catArray));
            })();
        },
        todoFunc: function(pos) {
            addTodo(name, pos);
            (function() {
                localStorage.setItem('categories', JSON.stringify(catArray));
            })();
        },
        storedVal: function() {
            return catArray;
        }
    }
})();

$(window).resize(function(){

    if ($(window).width() > 820) {
        $('.cover').css({'visibility':'visible'});
    }else {
        $('.cover').css({'visibility':'hidden'});
    }

})


$(document).ready(function() {



    let mdlID = '';
    const render = () => {
        console.log('render function works');
        console.log(catArray);
        setTimeout(function() {
            for (var i = 0; i < catArray.length; i++) {
                count.add();
                createCatList('cat', catArray[i].name, '#catList_cards');

				let statusCount = returnStatusCount(catArray[i].id),
					listItem = catArray[catArray[i].id - 1].listId;
				console.log(statusCount);

				$(`#${listItem}`).find('.counter').each(function(){
					let newId = $(this).attr('id').slice(0,2);
					switch (newId) {
						case 'c1':
							$(`#${newId}-${catArray[i].id}`).html(statusCount[0]);
							break;
						case 'c2':
							$(`#${newId}-${catArray[i].id}`).html(statusCount[1]);
							break;
						case 'c3':
							$(`#${newId}-${catArray[i].id}`).html(statusCount[2]);
							break;
						default:

					}
				})
            }

            if (catArray.length > 0) {
                $('.cat-input').animate({
                    marginTop: '10%'
                }, 700);
            }
        }, 1000);


		function returnStatusCount(arrayPos) {
			let todoLength = catArray[arrayPos - 1].todo2,
				darkred = 0,
				darkgoldenrod = 0,
				forestgreen = 0;

			for (let i = 0; i < todoLength.length; i++) {
				switch (todoLength[i].statusColor) {
					case 'darkred':
						darkred += 1;
						break;
					case 'darkgoldenrod':
						darkgoldenrod += 1;
						break;
					case 'forestgreen':
						forestgreen += 1;
						break;
				}

			}

			return [darkred, darkgoldenrod, forestgreen];
		}

    }

    const renderListItems = (val) => {
        console.log('render LIST function works');
        console.log(catArray);

        setTimeout(function() {
            count.clearListCount();
            // console.log(`Val: ${val}`);
            // val is the position of the clicked categories todolist items
            let len = catArray[val].todo2.length;
            for (var i = 0; i < len; i++) {
                count.listAdd();
                console.log(`i: ${i}`);
                console.log(catArray[val].todo2[i].name);
                createListItem(catArray[val].todo2[i].name, 'todoList', mdlID);

                // console.log(catArray[val].todo2.listid[i]);
            }

        }, 1000);

    }

    $('#catmodal').on('show.bs.modal', function(event) {
        console.log($(event.relatedTarget));
        let $button = $(event.relatedTarget),
            $btnParent = $button.parents('li').eq(0).attr('data-id-count'),
            modal = $(this),
            catTitle = catArray[$btnParent - 1].name;

        console.log($btnParent);

        //updates mdlID with the current clicked list item id.
        mdlID = $btnParent;


        modal.find('.modal-title').html(catTitle);
        if (catArray[$btnParent - 1].todo.length > 0) {
            renderListItems($btnParent - 1);
        } else {
            console.log('renderListItems doesnt run ');
        }


    })

    $('#catmodal').on('hidden.bs.modal', function(event) {
        let modal = $(this);
        modal.find('.modal-title').html('');
        modal.find('#todoList').html('');

        count.clearListCount();

		console.log("Current Modal Id: " + mdlID);

		// updating listitemCouter
		function returnStatusCount(arrayPos) {
			let todoLength = catArray[arrayPos - 1].todo2,
				darkred = 0,
				darkgoldenrod = 0,
				forestgreen = 0;

			for (let i = 0; i < todoLength.length; i++) {
				switch (todoLength[i].statusColor) {
					case 'darkred':
						darkred += 1;
						break;
					case 'darkgoldenrod':
						darkgoldenrod += 1;
						break;
					case 'forestgreen':
						forestgreen += 1;
						break;
				}

			}

			return [darkred, darkgoldenrod, forestgreen];
		}

		let statusCount = returnStatusCount(mdlID),
			listItem = catArray[mdlID - 1].listId;
		console.log(statusCount);


		$(`#${listItem}`).find('.counter').each(function(){
			let newId = $(this).attr('id').slice(0,2);
			switch (newId) {
				case 'c1':
					$(`#${newId}-${mdlID}`).html(statusCount[0]);
					break;
				case 'c2':
					$(`#${newId}-${mdlID}`).html(statusCount[1]);
					break;
				case 'c3':
					$(`#${newId}-${mdlID}`).html(statusCount[2]);
					break;
				default:

			}
		})

    });


    // click events
    const inputFunc = (inp, add, clear) => {
        $(inp).on('keypress', function(event) {

            let button = $(this);
            if (event.keyCode === 13) {
                console.log('enter hit');
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
                    categories.add();
                    createCatList(type, inpVal, '#catList_cards');
                    // checkArrayLength();
                    // CatListFunctions();
                } else {
                    console.log('list click events should be here');
                    console.log(`MDL-ID ${mdlID}`);
                    categories.getInputVal(inpVal);

                    // pushed todolist item into correct category todoArray
                    categories.todoFunc(mdlID - 1);
                    // creates the list item in the modal
                    createListItem(inpVal, 'todoList', mdlID);

                }
                button.val('');
            }
        })

        $(add).on('click', function(event) {
            console.log('clicked');
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
                categories.add();
                createCatList(type, inpVal, '#catList_cards');
                // checkArrayLength();

            } else {
                console.log('list click events should be here');
                console.log(`MDL-ID ${mdlID}`);
                categories.getInputVal(inpVal);

                // pushed todolist item into correct category todoArray
                categories.todoFunc(mdlID - 1);
                // creates the list item in the modal
                createListItem(inpVal, 'todoList', mdlID);
            }
            $(inputBox).val('');

        });
    }


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
                    <div class="counter" id="c1-${count.total()}">
                      <p>0</p>
                    </div>
                  </div>
                  <div class="col-xs-2 col">
                    <div class="counter" id="c2-${count.total()}">
                      <p>0</p>
                    </div>
                  </div>
                  <div class="col-xs-2 col">
                    <div class="counter" id="c3-${count.total()}">
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

            // updates count variable
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

    const createListItem = (itemTitle, todoListID, modalID) => {
        console.log('list created');
        count.listTotal();
        // console.log(modalID);


        let listItem = `
          <li class="list-card animated fadeIn" id="listItm-${count.listTotal()}" count="${count.listTotal()}">
                <div class="bar">
                  <div class="row description">
                    <div class="col-xs-12">
                      <section class="custom-height">
                        <p class="category-t">${itemTitle}</p>
                        <p class="delete-cat delete-list"><i class="fa fa-times-circle-o hvr hvr-grow" id="delItem-${count.listTotal()}"></i></p>
                      </section>
                    </div>
                  </div>
                  <div class="row bar">
                      <div class="col-xs-2 col-xs-offset-3 col">
                        <div class="list-buttons" id="lb1-${count.listTotal()}">
                          <span class="fa fa-tasks"></span>
                        </div>
                      </div>
                      <div class="col-xs-2 col">
                        <div class="list-buttons" id="lb2-${count.listTotal()}">
                          <span class="fa fa-spinner"></span>
                        </div>
                      </div>
                      <div class="col-xs-2 col">
                        <div class="list-buttons" id="lb3-${count.listTotal()}">
                        <span class="fa fa-check"></span>
                        </div>
                      </div>
                  </div>
                </div>
              </li>`;

        //todolist variable is the id of the list to append the item to
        $(`#${todoListID}`).prepend(listItem);
		let positionList = $(`#${todoListID}`).children(`#listItm-${count.listTotal()}`).attr('count') - 1;
		console.log(positionList);
		let positionCat = mdlID - 1,
			statCol = catArray[positionCat].todo2[positionList].statusColor,
			idList = catArray[positionCat].todo2[positionList].lstTitle;

		// adds colour class to list when its created
		$(`#${idList}`).addClass(`${statCol}`);



        // update the todolist array with correct list item ids and list count variable
        // catArray[count.total() - 1].todo2.howManyLists = count.listTotal();
        // catArray[count.total() - 1].todo2.listid.push(`listItm-${count.listTotal()}`);
        //used to debug
        // console.log(catArray[count.total() - 1].todo2.listid[count.listTotal() - 1]);


        $(`#delItem-${count.listTotal()}`).on('click', function(event) {

            let button = $(event.target).parents('li').eq(0).attr('id'),
                listContent = $(`#${button}`).find('p').eq(0).text(),
				listCount = $(event.target).parents('li').eq(0).attr('count');

            $(`#${button}`).remove();


            let itemToDelete = catArray[modalID - 1].todo.indexOf(listContent);

            function returnDeletedID(){

              let deletedListID = '';

              catArray[modalID - 1].todo2.forEach(function(obj, index){
                console.log(`objTitle: ${obj.lstTitle}` );
                if (obj.lstTitle === button) {
                  console.log(`obj: ${index}`);
                  catArray[modalID - 1].todo2.splice(index,1);
                  deletedListID = obj.lstID;
                }
              })

              return deletedListID;
            }

            let dListID = returnDeletedID();
            console.log(dListID);


            const updateListAttrib = (position)=>{
              console.log(`updateListAttrib Position: ${position}`);
              console.log(`Array length: ${catArray[modalID - 1].todo2.length}`);
              for (let i = position - 1; i < catArray[modalID - 1].todo2.length; i++) {
                console.log("");

                let newList = catArray[modalID - 1].todo2[i],
                    currentListID = newList.lstID,
                    listTitleold = newList.lstTitle;

                // stores value of id before update
                console.log(`Current list ID: ${currentListID}`);
                console.log(`List title before ${listTitleold}`);

                // changes the id value of the list item
                newList.lstID -= 1;

                // update listId with new value if items after it have been deleted in chronological order
                newList.lstTitle = `listItm-${catArray[modalID - 1].todo2[i].lstID}`;

                // newList = catArray[i];
                console.log(`New List ID: ${newList.lstID}`);


                // update list item ID's when item is deleted
                $(`#${listTitleold}`).attr({
                    'id': newList.lstTitle,
                    'count': newList.lstID
                });

				$(`#${newList.lstTitle}`).find('.list-buttons').attr({
					'id' : `lb1-${newList.lstID}`
				});

                // update the delete buttons IDs when an item is deleted
                $(`#${newList.lstTitle}`).find('p').eq(1).children().attr('id', `delCat-${newList.lstID}`);

              }
            }
            updateListAttrib(dListID);

            count.listMinus();
            // catArray[modalID - 1].todo2
            // console.log(catArray[modalID - 1].todo2.title.indexOf(listContent));

			// push the updated array into localStorage
            localStorage.setItem('categories', JSON.stringify(catArray));

        })

		let todoBtn = $(`#listItm-${count.listTotal()}`).find(`#lb1-${count.listTotal()}`).attr('id'),
			doingBtn = $(`#listItm-${count.listTotal()}`).find(`#lb2-${count.listTotal()}`).attr('id'),
			doneBtn = $(`#listItm-${count.listTotal()}`).find(`#lb3-${count.listTotal()}`).attr('id');

		console.log(`Item Title in cat modal: ${itemTitle}`);

		// used when rendering list items to put active class on correct list-button
		if (catArray[positionCat].todo2[count.listTotal() - 1].statusColor === 'darkred') {
			let parentCol = $(`#${todoBtn}`).parent();
			$(parentCol).addClass('active');
		}
		else if (catArray[positionCat].todo2[count.listTotal() - 1].statusColor === 'darkgoldenrod') {
			let parentCol = $(`#${doingBtn}`).parent();
			$(parentCol).addClass('active');
		}
		else {
			let parentCol = $(`#${doneBtn}`).parent();
			$(parentCol).addClass('active');
		}

		// add darkred to list item background-color
		$(`#${todoBtn}`).on('click', function(){
			// gets the correct list item to apply the styles to
			let parent = $(this).parents(`li`).attr('id'),
				parentAttr = $(`#${parent}`).attr('count'),
				parentCol = $(this).parent(),
				todoBtnCol = $(`#${todoBtn}`).parent();

			// apply color styling to list item
			$(`#${parent}`).css({'background-color': 'darkred', 'transition': 'all .5s'});

			// set the value of statCol to our color & updates key/value pair with new value
			statCol = "darkred";
			catArray[positionCat].todo2[parentAttr - 1].statusColor = statCol;

			// update storage with new array
			localStorage.setItem('categories', JSON.stringify(catArray));

			// returns number referring to position of 'col' when class is split into an array
			let colParentClassArray = $(this).parent().attr('class').split(' '),
				colParent = colParentClassArray.indexOf('col'),
				colValue = colParentClassArray[colParent];
			console.log(colParent);
			console.log(colValue);
			console.log(todoBtnCol);

			let condition1 = ($(`#${doingBtn}`).parent().hasClass(`${colValue}`)),
				condition2 = ($(`#${doneBtn}`).parent().hasClass(`${colValue}`));
			if (condition1 && condition2) {
				$(`#${doingBtn}`).parent().removeClass('active');
				$(`#${doneBtn}`).parent().removeClass('active');
				if (!$(parentCol).hasClass('active')) {
					$(parentCol).addClass('active');
				}
			}


		})

		// add darkgoldenrod to list item background-color
		$(`#${doingBtn}`).on('click', function(){
			// gets the correct list item to apply the styles to
			let parent = $(this).parents(`li`).attr('id'),
				parentAttr = $(`#${parent}`).attr('count'),
				parentCol = $(this).parent(),
				todoBtnCol = $(`#${todoBtn}`).parent();

			// apply color styling to list item
			$(`#${parent}`).css({'background-color': 'darkgoldenrod', 'transition': 'all .5s'});

			// set the value of statCol to our color & updates key/value pair with new value
			statCol = "darkgoldenrod";
			catArray[positionCat].todo2[parentAttr - 1].statusColor = statCol;

			// update storage with new array
			localStorage.setItem('categories', JSON.stringify(catArray));

			// returns number referring to position of 'col' when class is split into an array
			let colParentClassArray = $(this).parent().attr('class').split(' '),
				colParent = colParentClassArray.indexOf('col'),
				colValue = colParentClassArray[colParent];
			console.log(colParent);
			console.log(colValue);
			console.log(todoBtnCol);

			let condition1 = ($(`#${todoBtn}`).parent().hasClass(`${colValue}`)),
				condition2 = ($(`#${doneBtn}`).parent().hasClass(`${colValue}`));
			if (condition1 && condition2) {
				$(`#${todoBtn}`).parent().removeClass('active');
				$(`#${doneBtn}`).parent().removeClass('active');
				if (!$(parentCol).hasClass('active')) {
					$(parentCol).addClass('active');
				}
			}

		})

		// add forestgreen to list ite, background-color
		$(`#${doneBtn}`).on('click', function(){
			// gets the correct list item to apply the styles to
			let parent = $(this).parents(`li`).attr('id'),
				parentAttr = $(`#${parent}`).attr('count'),
				parentCol = $(this).parent(),
				todoBtnCol = $(`#${todoBtn}`).parent();

			// apply color styling to list item
			$(`#${parent}`).css({'background-color': 'forestgreen', 'transition': 'all .5s'});

			// set the value of statCol to our color & updates key/value pair with new value
			statCol = "forestgreen";
			catArray[positionCat].todo2[parentAttr - 1].statusColor = statCol;
// s
			// update storage with new array
			localStorage.setItem('categories', JSON.stringify(catArray));

			// returns number referring to position of 'col' when class is split into an array
			let colParentClassArray = $(this).parent().attr('class').split(' '),
				colParent = colParentClassArray.indexOf('col'),
				colValue = colParentClassArray[colParent];
			console.log(colParent);
			console.log(colValue);
			console.log(todoBtnCol);

			let condition1 = ($(`#${todoBtn}`).parent().hasClass(`${colValue}`)),
				condition2 = ($(`#${doingBtn}`).parent().hasClass(`${colValue}`));
			if (condition1 && condition2) {
				$(`#${todoBtn}`).parent().removeClass('active');
				$(`#${doingBtn}`).parent().removeClass('active');
				if (!$(parentCol).hasClass('active')) {
					$(parentCol).addClass('active');
				}
			}
		})
    }


    const updateDataIdAttr = (position) => {

        // position is the value of the the deleted item 'data-id-count' attr
        // sets the starting position from where to update remaining item ID's
        console.log(`updateDataIdAttr: ${position}`);
        console.log(position);
        // loop sets to start from deleted items position -  1 to get the current item & update ID's
        for (var i = position - 1; i < catArray.length; i++) {
            let newList = catArray[i],
                currentListID = newList.listId;

            // stores value of id before update
            console.log(`Current list ID: ${currentListID}`);

            // changes the id value of the list item
            newList.id -= 1;

            // update listId with new value if items after it have been deleted in chronological order
            newList.listId = `catItm-${catArray[i].id}`;

            newList = catArray[i];
            console.log(`New List ID: ${newList.listId}`);

            // use the currentListID value to update the correct listItem on each iteration
            $(`#${currentListID}`).attr({
                'id': newList.listId,
                'data-mdl-id': `catmodal-${newList.id}`,
                'data-id-count': newList.id
            });

            // update the delete button id
            $(`#${newList.listId}`).find('p').eq(1).children().attr('id', `delCat-${newList.id}`);

			const ids = $(`#${newList.listId}`).find('.counter').each(function(){
				let counterId = $(this).attr('id').slice(0,3),
					counterVal = $(this).attr('id'),
					counterRep = Math.floor($(this).attr('id').slice(3,counterVal.length)),
					finalVal = counterRep -= 1;
					// replaceEnd = Math.floor(counterId.slice(3,counterId.length));

					counterId = `${counterId}${finalVal}`;

					$(this).attr('id', counterId);
			});
        }

    }

    // renders categories on the page
    render();

    // category page input boxes controls
    inputFunc('#inpBox', '#addItem');

    // modal page input boxes controls
    inputFunc('#inpList', '#addList');





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
