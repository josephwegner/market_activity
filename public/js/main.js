var width = window.innerWidth,
    height = window.innerHeight;

var projection = d3.geo.albersUsa()
    .scale(width > height ? width : height)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
d3.json("/public/zips_us_topo.json", function(error, zips) {

  d3.json("/public/us.json", function(error, us) {

    d3.json("/public/market_zips.json", function(error, market_zips) {

      svg.append("path")
          .datum(topojson.feature(us, us.objects.states))
          .attr("class", "state")
          .attr("d", path);
      svg.append("path")
          .datum(topojson.merge(us, us.objects.states.geometries))
          .attr("class", "country")
          .attr("d", path);


      var markets = {};

      for(var i=0,max=zips.objects.zip_codes_for_the_usa.geometries.length; i<max; i++) {

        var geometry = zips.objects.zip_codes_for_the_usa.geometries[i];


        if(typeof(market_zips[geometry.properties.zip]) !== "undefined") {
          var market = market_zips[geometry.properties.zip];

          if(typeof(markets[market]) === "undefined") {
            markets[market.id] = new Market(market.id, market.name);
          }

          markets[market.id].addGeometry(geometry);
        }
      }

      for(id in markets) {
        var market = markets[id];

        var fence = svg.append("path")
          .datum(topojson.merge(zips, market.getGeometries()))
          .attr("d", path)[0][0]

        market.setSVG(fence);
      }

      window.markets = markets;
    })
  });


});

d3.select(self.frameElement).style("height", height + "px");
