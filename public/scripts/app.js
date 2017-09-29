
// external app

$(function() {

  //create menu element in html//
  const createMenuElement = (food) => {

<<<<<<< HEAD
    return `<section style = "margin-top: 30px;" class="menu">
       <section class="item-picture"> <img id="item-picture" src="/images/beef_jerky.jpg"></section>
       <div class="food-body">
       <div class="food-title">
         <p class="food-name">${food.name} </p>
         <p class="food-price">$${food.price}</p>
       </div>
       <section class="food-description">${food.description}</section>
      </div>
      <section class="quantityButton">
       <div class="decrease" id="decrease${food.id}">-</div>
       <div data-quantity=1 class="quantity" id="quantity${food.id}">0</div>
       <div class="increase" id="increase${food.id}">+</div>
      </section>
    </section>`

=======
>>>>>>> d722c55e98be21d1e122b0549ccffe5dbef29e71
    return `<tr>
          <td class="food-name">${food.name} </td>
          <td >$${food.price}</td>
          <td >${food.description}</td>
          <td >
            <button type="button" id="decrease${food.id}" class="btn btn-default btn-xs" aria-label="Left Align">
              <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
            </button>
          </td>
          <td>

             <p data-quantity=0  data-foodid=${food.id} class="quantity" id="quantity${food.id}">0</p>
          </td>
          <td>
            <button type="button" id="increase${food.id}" class="btn btn-default btn-xs" aria-label="Left Align">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
            </div>
          </td>
          </tr>
        `
    // return `<section style = "margin-top: 30px;" class="menu">
    //    <section class="item-picture"> <img id="item-picture" src=""></section>
    //    <div class="food-body">
    //    <div class="food-title">
    //      <p class="food-name">${food.name} </p>
    //      <p class="food-price">$${food.price}</p>
    //    </div>
    //    <section class="food-description">${food.description}</section>
    //   </div>
    //   <section class="quantityButton">
    //    <div class="decrease" id="decrease${food.id}">-</div>
    //    <div data-quantity=1 class="quantity" id="quantity${food.id}">0</div>
    //    <div class="increase" id="increase${food.id}">+</div>
    //   </section>
    // </section>`
  }

  //create order element in html//
  // const createOrderElement = (order) => {
  //   return `<div style = "margin-top: 30px;" id="order-container">
  //     <section class="order">
  //       <p class="food-order-quantity">${order.}</p>
  //       <p class="food-order-name">${order.}</p>
  //       <p class="food-order-price">${order.} </p>
  //     </section>
  //   </div>`
  // }

  // //create order history element in html//
  // const createOrderHistoryElement = (order) => {
  // `<section class="past-order">
  //    <p class="restaurant-name">${order.}</p>
  //    <p class="datetime">${order.}</p>
  //    <p class="price"> ${order.}</p>
  //  </section>`

  const renderMenuElement = (foods) => {
    foods.forEach((food) => {
      const $menu = createMenuElement(food)
      $('#menu-container').prepend($menu)
      // for each food, you are creating an event listener
      $(`#decrease${food.id}`).on('click', function(event) {
        let quantity = $(`#quantity${food.id}`)
        let previousNumber = Number(quantity.text())
        if(previousNumber !== 0) {
          quantity.data('quantity', previousNumber - 1).text(previousNumber - 1)
        }
      })
      // increase
      $(`#increase${food.id}`).on('click', function(event) {
        let quantity = $(`#quantity${food.id}`)
        let previousNumber = Number(quantity.text())
        quantity.attr('data-quantity', previousNumber + 1).text(previousNumber + 1)
        quantity.text(previousNumber + 1)

      })
    })
  }

  // const renderOrderElement = (orders) => {
  //   foods.forEach((order) => {
  //     const $order = createMenuElement(order)
  //     $('#order-container').append($order)
  //   })
  // }


  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"))
  //   }
  // })

  const initialCall = () => {
    $.ajax({
      method: "GET",
      url: "/api/food"
    }).done((foods) => {
      // for(food of foods) {
        renderMenuElement(foods)
      // }
    })
  }

  // $.ajax({
  //   method: "GET",
  //   url: "/api/orders"
  // }).done((orders) => {
  //   // for(order of orders) {
  //     createOrderElement(orders)
  //   // }
  // })
let cart = [];

$(function() {
  console.log('is it?')
  $('.quantity').each(function(get){





   var getId = $(this).data('foodid');
   var getQuantity = $(this).data('quantity');
   console.log('this stuff', getQuantity)
   if (getQuantity.quantity == 0){
    }else{
      cart.push({id: getId, quantity: getQuantity});
    }
  })
  });

// $.cookie("people", JSON.stringify(cart));
// var orders = $.parseJSON($.cookie("people"));

//  $('#cookies').on('click', function(){

//   Cookies.set('john', '2');
//   })


  initialCall()


});


