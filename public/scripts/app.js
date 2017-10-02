$(function() {

    //create menu element in html//
    const createMenuElement = (food, cart) => {

      let quantity = cart[food.id] || 0;

      return `<tr>
            <td class="food-name">${food.name} </td>
            <td >$${food.price}</td>
            <td >${food.description}</td>
            <td class="buttonGroup">
              <div>
                <button type="button" id="decrease${food.id}" class="btn btn-default btn-xs" aria-label="Left Align">
                  <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
                </button>
              </div>
              <div class="quantityClass">
                <p data-quantity=0  data-foodid=${food.id} class="quantity" id="quantity${food.id}">${quantity}</p>
              </div>
              <div>
                <button type="button" id="increase${food.id}" class="btn btn-default btn-xs" aria-label="Left Align">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
              </div>
            </td>
        </tr>`
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
      }).done((result) => {
        // for(food of foods) {
          if(result.id) {
            Cookies.set('id', result.id)
          }
          renderMenuElement(result.data)
        // }
      })
    }

    const createOrderElement = (food) => {
      const price = (Number(food.price) * Number(food.quantity)).toFixed(2)
      return ` <tr class="order">
          <td class="food-order-quantity">${food.quantity}</td>
          <td class="food-order-name">${food.name}</td>
          <td class="food-order-price">$${price}</td>
      </tr>`
    }

    
    const renderOrderElement = (newArr) => {
      newArr.forEach((food) => {
        const $food = createOrderElement(food)
        $('#eachElement').append($food)
      })
    }

    const ordersCallForFoodItem = () => {
      $.ajax({
        method: "GET",
        url: "/api/food"
      }).done((result) => {
        const foods = result.data
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


  const sendData = (id) => {
    let food = []
    let order = JSON.parse(Cookies.get('order'))
    for (let key in order) {
      food.push({
        id: key,
        qty: order[key]
      })
    }
    const a = {
      user_id: id,
      vender_id: 5,
      food,
    }
    $.ajax({
        method: "POST",
        url: '/api/orders',
        data: {
          vendor_id: 5,
          user_id: id,
          food,
        },
        success: function (data) {
          Cookies.remove('order')
          cart = {}
          triggerTwilio(id, data[0])
        },
        error: function (error) {
          console.log('err', JSON.stringify(error, null, 2))
        }
    })

  }

  const triggerTwilio = (userId, orderId) => {
      $.ajax({
        method: "POST",
        url: '/orders/call',
        data: {userId, orderId }
    })
  }

  const triggerSMS = (orderId, time, userNumber) => {
      $.ajax({
        method: "POST",
        url: '/orders/sms',
        data: {orderId, time, userNumber}
      })
  }




  const renderTotal = (total) => {
    $('#total-amount').append(total)
  }


  $('#addToOrder').on('click', function(event){

    Cookies.set('order', cart);
    // window.location.replace("/orders/1")
    let order = JSON.parse(Cookies.get('order'))
    if($.isEmptyObject(order)) {
      event.preventDefault()
      $('#addToOrder').attr('onclick','').unbind('click')
      alert('Please choose food quantity first!');
    } else {
        ordersCallForFoodItem()
    }
  })

  $('.thumbnail').click(function(){
  	$('.modal-body').empty();
  	var title = $(this).parent('a').attr("title");
  	$('.modal-title').html(title);
  	$($(this).parents('div').html()).appendTo('.modal-body');
  	$('#myModal').modal({show:true});
  });

  $('#submitTime').on('click', function(event) {
    triggerSMS (65, 10, '+16478856109')
  })

  initialCall()

  const userId = Cookies.get('id')
  if(userId && window.location.pathname === `/users/${userId}/order/neworder`) {
    ordersCallForFoodItem()
  }
  if(userId && window.location.pathname === `/users/${userId}/orders`) {
    sendData(userId)
  }

})


