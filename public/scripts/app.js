
$(function() {
  
    //create menu element in html//
    const createMenuElement = (food, cart) => {
  
      let quantity = cart[food.id] || 0;
  
      return `<tr>
            <td class="food-name">${food.name} </td>
            <td >$${food.price}</td>
            <td >${food.description}</td>
            <td >
              <button type="button" id="decrease${food.id}" class="btn btn-default btn-xs" aria-label="Left Align">
                <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
              </button>
            </td>
            <td class="quantityClass">
               <p data-quantity=0  data-foodid=${food.id} class="quantity" id="quantity${food.id}">${quantity}</p>
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
  
  
    let cart = {};
    if (Cookies.get('order')) {
      cart = JSON.parse(Cookies.get('order'))
    }
  
    const renderMenuElement = (foods) => {
      foods.forEach((food) => {
        const $menu = createMenuElement(food, cart)
        $('#menu-container').prepend($menu)
        // for each food, you are creating an event listener
        $(`#decrease${food.id}`).on('click', function(event) {
          let quantity = $(`#quantity${food.id}`)
          let previousNumber = Number(quantity.text())
          let foodkey= "" + food.id;
  
          if (foodkey in cart && cart[foodkey] > 0) {
              cart[foodkey]--;
          } else {
              cart[foodkey] = 0;
          }
          console.log('im here', cart)
          if(previousNumber !== 0) {
            quantity.data('quantity', previousNumber - 1).text(previousNumber - 1)
          }
  
        })
  
        // increase
        $(`#increase${food.id}`).on('click', function(event) {
          let quantity = $(`#quantity${food.id}`)
          let previousNumber = Number(quantity.text())
          let foodkey= "" + food.id;
  
          if (foodkey in cart) {
              cart[foodkey]++;
          } else {
              cart[foodkey] = 1;
          }
  
          console.log('next', cart)
  
          quantity.attr('data-quantity', previousNumber + 1).text(previousNumber + 1)
          quantity.text(previousNumber + 1)
  
        })
      })
    }
  
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
  
    
   

    const createOrderElement = (food) => {  
      const price = (Number(food.price) * Number(food.quantity)).toFixed(2)
      return `<div style = "margin-top: 30px;" id="order-container">
        <section class="order">
          <p class="food-order-quantity">${food.quantity}</p>
          <p class="food-order-name">${food.name}</p>
          <p class="food-order-price">$${price}</p>
        </section>
      </div>`
    }
  
    const renderOrderElement = (newArr) => {
      newArr.forEach((food) => {
        const $food = createOrderElement(food)
        $('#order-container').append($food)
      })
    }
    
    const ordersCallForFoodItem = () => {
      $.ajax({
        method: "GET",
        url: "/api/food"
      }).done((foods) => {
        let order = JSON.parse(Cookies.get('order'))
        //array of foodid
        let orderedFoods = []
        // total price
        let total = 0
        Object.keys(order).forEach(orderId => {
          foods.forEach(food => {
            if(food.id === orderId) {
              const foodObject = Object.assign({}, food, {quantity: order[orderId]})
              orderedFoods.push(foodObject)
              total += Number(food.price) * Number(order[orderId])
            }
          })
        })
        renderOrderElement(orderedFoods) //new array of only the foods that were ordered
        renderTotal(total.toFixed(2))
      })
    }

    const renderTotal = (total) => {
      $('#total-amount').text(total)
    }
 
    // //create order history element in html//
    // const createOrderHistoryElement = (order) => {
    //   return `<section class="past-order">
    //       <p class="restaurant-name">${order.}</p>
    //       <p class="datetime">${order.}</p>
    //       <p class="price"> ${order.}</p>
    //     </section>`

    // const renderOrderHistoryElement = (newArr) => {
    //   newArr.forEach((food) => {
    //     const $food = createOrderElement(food)
    //     $('#order-container').append($food)
    //   })
    // }


    // const ordersCallForFoodItem = () => {
    //   $.ajax({
    //     method: "GET",
    //     url: "/users/:id/orders"
    //   }).done((foods) => {
    
    //   }




  $('#addToOrder').on('click', function(event){
    // Cookies.remove('order')
    console.log('last', cart)
    Cookies.set('order', cart);
    window.location.replace("/orders/1")
    let order = JSON.parse(Cookies.get('order'))
    if($.isEmptyObject(order)) {
      event.preventDefault()
      $('#addToOrder').attr('onclick','').unbind('click')
      alert('Please choose food quantity first!');
    } else {
    ordersCallForFoodItem()
    }
  })
  
    initialCall()



  
    if(window.location.pathname === '/orders/1') {
      ordersCallForFoodItem()
    }
  
})