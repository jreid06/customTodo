$(document).ready(function() {

    let count = 0;
    // MODEL

    //category storage
    let categories = [];

    // setInterval(function(){
    //   console.log(categories.name);
    // }, 5000);
    const CatConstruct = function(name){
      this.name = name;
      // will get populated once user has created a list item.
      this.todo = [];
      // when user adds task to doing list item will be added here
      this.doing = [];
      // completed task goes here
      this.done = [];
    }

    // adds category to storage object to storage
    const storeCategory = function(input){
      let num = 100;
      // create object for cat item;
      categories.push(new CatConstruct(input));
      // return categories;
      // console.log(categories.length);
    }


    // VIEW

    const createCatFunc = (usrInput, event) => {
        let htmlListitem = `
          <li class="cat-card animated fadeIn" id="catItm">
            <div class="bar">
              <div class="row description">
                <div class="col-xs-12">
                  <section class="custom-height">
                      <p class="category-t">${usrInput}</p>
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
        let modalList = ``;
        // create our list and add class
        const catList = document.getElementById('catList_cards');

        // let testCat = new CatConstruct(usrInput);
        // console.log(`Category Name: ${testCat.name}`);
        catList.innerHTML = htmlListitem + catList.innerHTML;
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

        count++;
    }

    // CONTROLLER

    const getInputVal = (clickBtn, clearBtn, input) => {
      // console.log(clickBtn);
      document.getElementById(clickBtn).addEventListener('click', function(){
          // console.log(input.val());
          let value = input.val();
          if (value) {
              // creates our list item
              createCatFunc(value);
              storeCategory(value);
              deleteCat();

              // clear the value of the input field
              input.val('');
          } else {
              alert("No Input");
          }
      });
      document.getElementById(clearBtn).addEventListener('click', function(){
          input.val('');
      });
    }

    const deleteCat = () => {
        $('.delete-cat').click(function(event){
          let item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
          let parent = item.parentNode;
          parent.removeChild(item);
        })
    }





  // Call functions
  getInputVal($('#addCat').attr('id'), $('#clearBox').attr('id'), $('#inpCat'));






















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
