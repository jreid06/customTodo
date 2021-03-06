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
        idCount --;
        if (!truthy) {
            truthy = true;
        };
        return [countNum, truthy];
    }

    // MODEL

    let delId;
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
    const storeCategoryList = function(input, identity) {

        const id = ['addCat','inpCat','addItem'];
        console.log("identity: " + identity);
        // let num = 100;
        // create object for cat item;
        if(identity === id[0] || identity === id[1]){
          categories.push(new CatConstruct(input));
        }
        else if (identity === id[1]){
          categories[0].todo.push(input);
        }

        // return categories;
        console.log(categories);
    }

    const deleteListItem = () => {
      console.log('activated');
      $('.delete-list').click(function(event){
        console.log('click works');
        let item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
        let parent = item.parentNode;
        console.log(item);

        // parent.removeChild(item);
        $('#listItm').remove();
      })
}


      const listInputFunc = () => {

        $('#addItem').click(function(event){
          let listVal = $('#inpList').val();
          if (listVal) {
            createListItem(listVal);
            deleteListItem();
            $('#inpList').val('');
          }
          else {
            alert('cant have an empty list item!!');
          }

        })
        document.getElementById('inpList').addEventListener('keypress', function(event){
          let listVal = this.value;
          if (event.keyCode === 13) {
            if (listVal) {
              createListItem(listVal);
              deleteListItem();
              this.value = "";
            }
            else {
              alert('cant have an empty list item!!');
            }

          }
        })
        document.getElementById('clearItem').addEventListener('click', function(){
          $('#inpList').val("");
        })
      }

    // VIEW

    const showModals = (mdlTarget) => {
        // input functions

        // // deleteListItem function
        // const deleteListItem = () => {
        //   console.log('activated');
        //   $('.delete-list').click(function(event){
        //     console.log('click works');
        //     let item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
        //     let parent = item.parentNode;
        //     console.log(item);
        //
        //     // parent.removeChild(item);
        //     $('#listItm').remove();
        //   })
        // }


        // call modal functions

        $(mdlTarget).on('show.bs.modal', function(event){
          console.log('modal clicked');
          listInputFunc();
          // createListItem();
          deleteListItem();
        })
    }

    const createListItem = (listItem) => {
      // list item template code
      let listHtml = `<li class="list-card animated fadeIn" id="listItm">
        <div class="bar">
          <div class="row description">
            <div class="col-xs-12">
              <section class="custom-height">
                <p class="category-t">${listItem}</p>
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

      // get parent id's for items
      const list = document.getElementById('todoList');

      list.innerHTML = listHtml + list.innerHTML;

      // stops issue with fade on items when new one is created
      setTimeout(function() {
          if ($('.list-card').hasClass('fadeIn')) {
              $('.list-card').removeClass('fadeIn');
          }
      }, 2100);
    }

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


            let modalList = `<div class="modal list-modals fade" tabindex="-1" role="dialog" id="catmodal-${countNum}"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title"><strong>${usrInput}</strong></h4> </div> <div class="modal-body"> <section class="inputField list-input"> <input type="text" name="" value="" class="inputBox inputList" id="inpList" placeholder="Add List Items ..."><div class="input-buttons"><span class="fa fa-plus-circle" id="addItem"></span></div> <div class="input-buttons clearBox" id="clearItem"><span class="fa fa-times-circle-o"></span></div> </section> <section class="todo-sec todoItems"> <h3>Todo Items <span class="fa fa-tasks"></span></h3> <ul class="list-cards" id="todoList"> </ul> </section> <section class="todo-sec doingItems"> <h3>Doing Items <span class="fa fa-spinner"></span></h3> <ul class="list-cards" id="doingList"> </ul> </section> <section class="todo-sec completedItems"> <h3>Completed Items <span class="fa fa-check"></span></h3> <ul class="list-cards" id="completeList"> </ul> </section> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close Categorgies list</button> </div> </div> </div> </div`;

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

    // const modalFunctions = () => {
      //   console.log('modal functions has been initialized');
      //
      //
      //   // input functions
      //   const listInputFunc = () => {
      //
      //     $('#addItem').click(function(event){
      //       let listVal = $('#inpList').val();
      //       if (listVal) {
      //         createListItem(listVal);
      //         deleteListItem();
      //         $('#inpList').val('');
      //       }
      //       else {
      //         alert('cant have an empty list item!!');
      //       }
      //
      //     })
      //     document.getElementById('inpList').addEventListener('keypress', function(event){
      //       let listVal = this.value;
      //       if (event.keyCode === 13) {
      //         if (listVal) {
      //           createListItem(listVal);
      //           deleteListItem();
      //           this.value = "";
      //         }
      //         else {
      //           alert('cant have an empty list item!!');
      //         }
      //
      //       }
      //     })
      //     document.getElementById('clearItem').addEventListener('click', function(){
      //       $('#inpList').val("");
      //     })
      //   }
      //
      //   // deleteListItem function
      //   const deleteListItem = () => {
      //     console.log('activated');
      //     $('.delete-list').click(function(event){
      //       console.log('click works');
      //       let item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
      //       let parent = item.parentNode;
      //       console.log(item);
      //
      //       // parent.removeChild(item);
      //       $('#listItm').remove();
      //     })
      //   }
      //   // call modal functions
      //   // listInputFunc();
      //
      // }



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
                console.log("");
                let identifyStorageDestination = $(this).attr('id');
                console.log(`identifyStorageDestination: ${identifyStorageDestination}`);
                if(identifyStorageDestination === 'addCat'){
                    createCatFunc(value);
                    storeCategoryList(value, identifyStorageDestination);
                    slideUp(categories.length);
                    showModals($('.modal'));
                }

                // init deleteCatModal function for list item
                deleteCatModal();

                // clear the value of the input field
                input.val('');
            } else {
                alert("No Input");
            }
        });
        document.getElementById('inpCat').addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                let v = this.value;
                if (v) {
                    // creates our list item
                    console.log("");
                    console.log(v);
                    let identifyStorageDestination = $(this).attr('id');
                    console.log(`identifyStorageDestination: ${identifyStorageDestination}`);
                    if(identifyStorageDestination === 'inpCat'){
                        createCatFunc(v);
                        storeCategoryList(v, identifyStorageDestination);
                        slideUp(categories.length);
                        showModals($('.modal'));
                    }

                    // init deleteCatModal function for list item
                    deleteCatModal();

                    // clear the value of the input field
                    this.value = "";
                } else {
                    alert("No Input");
                }

            }
        });
        document.getElementById(clearBtn).addEventListener('click', function() {
            input.val('');
        });
    }

    const getRemainingId = (idVal) => {
          // array to store each item data-id-count value. loops and checkes after an item has been deleted
          $('.cat-card').each(function(){
            let temp = Math.floor($(this).attr('data-id-count'));
            // console.log(`Items id\'s: ${temp}`);
            item_id_countArr.push(temp);
          })

          item_id_countArr.sort(function(a,b){return a - b});
          console.log(`before: ${item_id_countArr}`);

          let temp = 0;
          if (item_id_countArr[0] === 1) {
            temp +=1;
            console.log(`temp: ${temp}`);
          }

          if (temp === 1) {
            console.log(`deleted id data-id-count value: ${idVal}`);
            //deleted item number - 1;
            let t = idVal - 1;
            // start from deleted items position and -1 from each value updating id's
            for (let i = t; i < item_id_countArr.length; i++) {
              item_id_countArr[i] -=1;
            }
          }
          // -1 from all each value if item 1 is deleted
          else if (temp === 0) {
            for (let j = 0; j < item_id_countArr.length; j++) {
              item_id_countArr[j] -= 1;
            }
          }

    } // end getRemainingId function

    const updateDataIdAttr = () =>{
      // console.log('updateDataIdAttr Results: ');
      item_id_countArr.sort(function(a,b){return b - a});
      let num = -1;
          num2 = -1;
          num3 = -1;

      $('.cat-card').each(function(){
        $(this).attr({'data-id-count': item_id_countArr[num += 1], 'data-mdl-id': `catmodal-${item_id_countArr[num]}`});
      })

      $('.category-t').each(function(){
        $(this).attr('data-target', `#catmodal-${item_id_countArr[num2 += 1]}`)
      })

      let lowHigh = item_id_countArr.sort(function(a,b){return a - b});
      $('.list-modals').each(function(){
        $(this).attr('id', `catmodal-${lowHigh[num3 += 1]}`)
      })

    }

    // used to clear the array each time item is deleted so array can be updated with new items left on page
    function clearExisting() {
      console.log('array updated');
      if (item_id_countArr.length > 0) {
          item_id_countArr.splice(0, item_id_countArr.length);
          console.log('item_id_count_arr after splice: ');
          console.log(item_id_countArr);
      }
      return item_id_countArr;
    }


    const deleteCatModal = () => {
        $('.delete-cat').click(function(event) {
            
            let item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
            let parent = item.parentNode;
            let textBoxValue = $(this).parent().children('.category-t').text();

            // get the id from the deleted attribute to update id's dynamically
            delId = $(item).attr('data-id-count');

            // used to delete correct modal
            let id = $(item).attr('data-mdl-id');

            // code here is used to remove items & modals
            parent.removeChild(item); // item
            $(`#${id}`).remove(); // modal

            // deletes value from array based on a linear search
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].name === textBoxValue) {
                    categories.splice(i, 1);
                }
            }

            //get length of list after item is deleted;

            getRemainingId(delId);

            //display updated categories array; use when debugging
            setTimeout(function() {
                c_minus();
                console.log("");
                console.log("");

                console.log(`count num after -- (${countNum})`);
                console.log(`deleted item id: ${id}`);
                console.log(item_id_countArr);

                console.log("");

                console.log(categories);
                // console.log('Updated Array Below:');
                // $.each(categories, function(i, item) {
                //     console.log(categories[i].name);
                // })
                console.log(" ");
                console.log(" ");

                slideUp(categories.length);
                updateDataIdAttr();
                clearExisting();
            }, 10);


        }) // end of click event
    } //end of deleteCat function




    // Call functions
    getInputVal($('#addCat').attr('id'), $('#clearBox').attr('id'), $('#inpCat'));
    showModals($('.modal'));
    // deleteCat();









    // will store single values with key=>value pair
      // localStorage.setItem("name", "jason reid");
      // let carType;
      //
      //
      // $('#myBtn2').click(function() {
      //     carType = 'Vauxhall corsa';
      //     localStorage.setItem("car", carType);
      //     $('#storage1').text(localStorage.getItem("car"));
      // })
      //
      // $('#myBtn3').click(function() {
      //     let pTag = document.createElement('p');
      //     pTag.classList.add('created');
      //     pTag.innerText = 'hello';
      //     let position = document.getElementById('screate');
      //
      //     position.insertBefore(pTag, position.childNodes[0]);
      //     let mynode = pTag.parentNode;
      //     console.log(mynode);
      //     // let stringNode = JSON.stringify(node);
      //     let stringNode = mynode.toString();
      //
      //     console.log(stringNode);
      //     // localStorage.setItem('node', stringNode);
      // })
      //
      // let obj = {
      //     fname: 'reid',
      //     age: 22
      // }
      //
      // // this will turn object into a string so it can be stored in localStorage
      // let str = JSON.stringify(obj);
      // localStorage.setItem('testobj', str);
      //
      // $('#storage1').text(localStorage.getItem("car"));
      //
      // //we retrieve object that has been stored as a string
      // let retrieveObjString = localStorage.getItem('testobj');
      //
      // // before we can use the object we have to turn it back into an object
      // let retrieveObj = JSON.parse(retrieveObjString);
      //
      // // console.log(typeof retrieveObj);
      // // console.log(retrieveObj.fname);
      //
      // $('#storage2').text(retrieveObj.fname);
      //
      // $('#myBtn').click(function(e) {
      //     carType = 'porshe';
      //     localStorage.setItem('car', carType);
      //     // localStorage.removeItem('car');
      //     $('#storage1').text(localStorage.getItem("car"));
      //     return carType;
      // })


})
