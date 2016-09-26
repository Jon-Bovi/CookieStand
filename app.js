// return Math.floor(Math.random() * (max - min + 1)) + min
// brainstorming: properties: min max customers per hour, hours (array), avg cookies per sale {7ish total props}

var hourlyList = [['6am'],['7am'],['8am'],['9am'],['10am'],['11am'],['12pm'],['1pm'],['2pm'],['3pm'],['4pm'],['5pm'],['6pm'],['7pm'],['8pm']];

var location1stAndPike = {
  minCustomersPerHr : 23,
  maxCustomersPerHr : 65,
  avgCookiesPerSale : 6.3,

  render : function() {

  },
  calculateHourlyCookies : function(hrIndex) {
    var hourlyCookies = hourlyList[hrIndex][1] * avgCookiesPerSale;
    hourlyList[hrIndex][2] = hourlyCookies;
    return hourlyCookies;
  },
  calculateDailyCookies : function() {

  },
  generateHourlyCustomers : function(hrIndex) {
    var randomNumCustomers = Math.floor(Math.random() * (maxCustomersPerHr - minCustomersPerHr + 1)) + minCustomersPerHr;
    hourlyList[hrIndex][1] = randomNumCustomers;
    return randomNumCustomers;
  }
}
var locationSeaTac =
var locationSeattleCenter =
var locationCapHill =
var locationAlki =
