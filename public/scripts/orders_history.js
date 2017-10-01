$(function() {
    //create order history element in html//
    const createOrderHistoryElement = (order) => {

      return `<tr>
                <td class="orderid">${order.id}</td>
                <td>${order.vendor_name}</td>
                <td>${order.vendor_address}</td>
                <td>${order.vendor_phone_number}</td>
                <td>${order.order_date}</td>
                <td>${order.completed}</td>
                <td>
                    <a href="/users/${order.user_id}/orders/${order.id}" class="btn btn-success btn-sm orderDetails">
                     Details
                  </a>
                </td>
              </tr>`
    }


   const renderOrderHistoryElement = (newArr) => {
      let user_name = '';
      newArr.forEach((order) => {
        const $order = createOrderHistoryElement(order)
        user_name = order.user_name;
        $('#order-container').append($order)
      })
      $('#username').text(user_name);

    }
    const ordersCallForUser = (userID) => {
      $.ajax({
        method: "GET",
        url: `/api/users/${userID}/orders`
      }).done((orders) => {
        renderOrderHistoryElement(orders);
      })
    }

    const procesOrder = (min) => {
      var current_progress = 0;
      var interval = setInterval(function() {
          current_progress += 10;
          $("#dynamic")
          .css("width", current_progress + "%")
          .attr("aria-valuenow", current_progress)
          .text(current_progress + "% Complete");
          if (current_progress >= 100)
              clearInterval(interval);
      }, min*1000);
    }

    ordersCallForUser($('.userID').text());
    procesOrder(1);

})


