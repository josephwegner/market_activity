var socket = io.connect('http://localhost:3000');

socket.on('checkin', function(checkin) {
  console.log("hitting market", checkin.business.market_id);
  markets[checkin.business.market_id].hit();
});
