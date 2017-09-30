$(function() {
  const getFoodListOfOrder = (orderID) => {
     $.ajax({
          method: "GET",
          url: `/api/orders/${orderID}`
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
                <td>${food.id}</td>
              </tr>`
    }

    getFoodListOfOrder($('.orderNum').val());
})
