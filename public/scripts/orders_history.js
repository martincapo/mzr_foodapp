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
                    <a href="/users/orders/${order.id}" class="btn btn-success btn-sm orderDetails">
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
    const ordersCallForUser = (orderID) => {
      $.ajax({
        method: "GET",
        url: `/api/orders/users/${orderID}`
      }).done((orders) => {
        renderOrderHistoryElement(orders);
      })
    }

    ordersCallForUser($('.orderNum').val());

})
