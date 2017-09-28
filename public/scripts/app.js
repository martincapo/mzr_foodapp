
$(function() {

  //create menu element in html//
  const createMenuElement = (food) => {
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
        quantity.data('quantity', previousNumber + 1).text(previousNumber + 1)
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
      url: "/api/foods"
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

  initialCall()

  // {
  //   name: 'Spicy Cold Noodle',
  //   price: 6.15, 
  //   vendorid: 5, 
  //   description: 'Whole wheat spicy noodles',
  //   image: 'beef_jerky.jpg'
  // }
})

