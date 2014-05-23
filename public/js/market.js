var Market = function(id, name) {
  this.id = id;
  this.name = name;

  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);

  this.color = "rgb("+r+","+g+", "+b+")";

  this.geometries = [];
  this.recentHits = 0;
}

Market.prototype.setSVG = function(svg) {
  this.svg = svg;

  svg.style.fill = this.color;
  svg.style.opacity = 0;
}

Market.prototype.addGeometry = function(geometry) {
  this.geometries.push(geometry);
}

Market.prototype.getGeometries = function() {
  return this.geometries;
}

Market.prototype.hit = function() {
  var self = this;

  clearTimeout(this.releaseTimeout);
  self.recentHits++;

  self.svg.setAttribute("class", "market active");
  self.svg.style.opacity = self.recentHits > 10 ? 1 : self.recentHits / 10;

  this.releaseTimeout =setTimeout(function() {
    self.svg.setAttribute("class", "market");
    self.svg.style.opacity = "";

    self.recentHits = 0;
  }, 1000);
}
