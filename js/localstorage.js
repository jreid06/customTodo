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
