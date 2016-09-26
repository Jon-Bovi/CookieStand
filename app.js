// return Math.floor(Math.random() * (max - min + 1)) + min
// brainstorming: properties: min max customers per hour, hours (array), avg cookies per sale {7ish total props}
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];


var location1stAndPike = {

    minCustomersPerHr: 23,
    maxCustomersPerHr: 65,
    avgCookiesPerSale: 6.3,
    hourInfoList: {},

    generateInfoList: function() {
        for (var i = 0; i < hours.length; i++) {
            var hour = hours[i];
            var hourlyCustomersGen = location1stAndPike.generateHourlyCustomers();
            location1stAndPike.hourInfoList[hour] = {
              hourlyCustomers: hourlyCustomersGen,
            };
            location1stAndPike.hourInfoList[hour].hourlyCookies = location1stAndPike.calculateHourlyCookies(hour);
        }
    },

    generateHourlyCustomers: function() {
        var randomNumCustomers = Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
        return randomNumCustomers;
    },

    calculateHourlyCookies: function(hour) {
        return Math.round(location1stAndPike.hourInfoList[hour].hourlyCustomers * location1stAndPike.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      return total;
    },

    render: function() {
      
    }
};

location1stAndPike.generateInfoList();

var locationSeaTac =
    var locationSeattleCenter =
        var locationCapHill =
            var locationAlki =
