$(function() {
    //create order history element in html//
    const createOrderHistoryElement = (order) => {
      let status = '';
      if(order.completed) {
        status = 'completed';
      }else {
        status = 'pending';
      }

      return `<tr>
                <td class="orderid">${order.id}</td>
                <td>${order.vendor_name}</td>
                <td>${order.vendor_address}</td>
                <td>${order.vendor_phone_number}</td>
                <td>${order.order_date}</td>
                <td>${status}</td>
                <td>
                    <a href="/users/${order.user_id}/orders/${order.id}" class="btn btn-info btn-sm orderDetails">
                     Details
                  </a>
                </td>
              </tr>`
    }


   const renderOrderHistoryElement = (newArr) => {
      let user_name = '';
      newArr.forEach((order) => {
        console.log('order', order)
        const $order = createOrderHistoryElement(order)
        user_name = order.user_name;
        $('#order-container').append($order)
      })
      $('#username').text(user_name);
      $('#myModal').modal('show')
    }

    const ordersCallForUser = (userID) => {
      $.ajax({
        method: "GET",
        url: `/api/users/${userID}/orders`
      }).done((orders) => {
        renderOrderHistoryElement(orders);
        // createModal()
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

    ordersCallForUser($('.userID').data('id'));
    procesOrder(10);

})
