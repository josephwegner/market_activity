var socket = io.connect('http://localhost:3000');
var hideBusiness;

socket.on('checkin', function(checkin) {
  markets[checkin.business.market_id].hit();
  var span = document.getElementById("business");

  clearTimeout(hideBusiness);

  span.innerText = checkin.business.name;
  span.className = "active";

  hideBusiness = setTimeout(function() {
    span.className = "";
  }, 500);
});
