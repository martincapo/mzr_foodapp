$(function() {
  // food list from DB
  const getFoodListOfOrder = (userID, orderID) => {
     $.ajax({
          method: "GET",
          url: `/api/users/${userID}/orders/${orderID}/food`
      }).done((food) => {
          renderFoodListOfOrderElement(food);
      })

    }

    const renderFoodListOfOrderElement = (newArr) => {
       let total = [];
       newArr.forEach((food) => {
         total.push(food.price * food.qty);
         const $food = createFoodListOfOrderElement(food)
         $('#order-details').append($food);
      })
      let result = total.reduce((sum, num) => {
        return sum + num;
      });

      $('#total').append(result.toFixed(2));

    }

    //create food list element in html//
    const createFoodListOfOrderElement = (food) => {

      return `<tr>
                <td>${food.name}</td>
                <td>${food.description}</td>
                <td>${food.price}</td>
                <td>${food.qty}</td>
                <td>${(food.price * food.qty).toFixed(2)}</td>
              </tr>`
    }

    getFoodListOfOrder($('.userID').data('uID'), $('.orderID').data('order'));
})
