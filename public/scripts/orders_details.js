$(function() {
  const getFoodListOfOrder = (userID, orderID) => {
     $.ajax({
          method: "GET",
          url: `/api/users/${userID}/orders/${orderID}/food`
      }).done((food) => {
          renderFoodListOfOrderElement(food);
      })

    }

    const renderFoodListOfOrderElement = (newArr) => {
       newArr.forEach((food) => {
         const $food = createFoodListOfOrderElement(food)
         $('#order-details').append($food);
      })
    }

    //create order history element in html//
    const createFoodListOfOrderElement = (food) => {

      return `<tr>
                <td>${food.name}</td>
                <td>${food.description}</td>
                <td>${food.price}</td>
                <td>${food.qty}</td>
                <td>${(food.price * food.qty).toFixed(2)}</td>
              </tr>`
    }

    getFoodListOfOrder($('.userID').text(), $('.orderID').text());
})
