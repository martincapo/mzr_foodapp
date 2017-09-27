$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  $.ajax({
    method: "GET",
    url: "/api/foods"
  }).done((foods) => {
    for(food of foods) {
      $("<div>").text(food.name +" "+food.price).appendTo($("#menu"));
    }
  });;
});

