'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function CookieShop(locationName, minCustomersPerHr, maxCustomersPerHr, avgCookiesPerSale) {
  this.locationName = locationName;
  this.minCustomersPerHr = minCustomersPerHr;
  this.maxCustomersPerHr = maxCustomersPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.totalDailyCookies = 0;
  this.numCustomersPerHour = [];
  this.hourInfoList = {};

  this.generateCustomersPerHour = function() {
    for (var i = 0; i < hours.length; i++) {
      this.numCustomersPerHour.push(Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr);
    }
    this.distributeCustomersPerHour();
    console.log(this.numCustomersPerHour);
  };

  // makes numCustomersPerHour into a pseudo bell-curve
  // whether this actually simulates reality better...I don't know
  this.distributeCustomersPerHour = function() {
    var firstHalf = this.numCustomersPerHour.slice(0, hours.length / 2);
    var secondHalf = this.numCustomersPerHour.slice(hours.length / 2, hours.length);
    //sorts the first 7 hours in ascending order
    firstHalf.sort(function(a, b) {return a - b}); // eslint-disable
    //sorts the last 7 hours in descending order
    secondHalf.sort(function(a, b) {return b - a});  //eslint-disable
    this.numCustomersPerHour = firstHalf.concat(secondHalf);
  };

  this.generateInfoList = function() {
    this.generateCustomersPerHour();
    for (var i = 0; i < hours.length; i++) {
        this.hourInfoList[hours[i]] = this.generateHourlyInfoObject(i);
    }
  };

  this.generateHourlyInfoObject = function(i) {
      var numCustomers = this.numCustomersPerHour[i];
      var numCookies = Math.ceil(numCustomers * this.avgCookiesPerSale);
      var numStaff = this.calculateNumStaffNeeded(numCustomers);
      this.totalDailyCookies += numCookies;
      var hourInfoObject = {
        hourlyCustomers: numCustomers,
        hourlyCookies: numCookies,
        staffNeeded: numStaff
      };
      return hourInfoObject;
  };

  this.calculateNumStaffNeeded = function(numCustomers) {
    var numStaff = Math.ceil(numCustomers / 20);
    if (numStaff < 2) {
      numStaff = 2;
    }
    return numStaff;
  }

  this.render = function(tableEl, renderingCookie) {
    // console.log(this.hourInfoList);
    var trEl = document.createElement('tr');

    var locationEl = document.createElement('td');
    locationEl.textContent = this.locationName;
    trEl.appendChild(locationEl);

    var hour;
    for (var j = 0; j < hours.length; j++) {
      hour = hours[j];
      var tdEl = document.createElement('td');
      if (renderingCookie){
        tdEl.textContent = this.hourInfoList[hour].hourlyCookies;
      }
      else {
        tdEl.textContent = this.hourInfoList[hour].staffNeeded;
      }
      trEl.appendChild(tdEl);
    }

    if (renderingCookie){
      var tdEl = document.createElement('td');
      tdEl.textContent = this.totalDailyCookies;
      trEl.appendChild(tdEl);
    }
    tableEl.appendChild(trEl);
  };
    this.generateInfoList();
}

var stores = [
  new CookieShop('1st and Pike', 23, 65, 6.3),
  new CookieShop('SeaTac Airport', 3, 24, 1.2),
  new CookieShop('Seattle Center', 11, 38, 3.7),
  new CookieShop('Capitol Hill', 20, 38, 2.3),
  new CookieShop('Alki', 2, 16, 4.6)
];

function renderTable() {
  var tableEl = document.getElementById('cookiestores');

  renderHeader(tableEl, true);
  //tell instances to render their own info
  for (var i = 0; i < stores.length; i++) {
    stores[i].render(tableEl, true);
  }
  //render totals row
  renderFooter(tableEl, true);

}

function renderHeader(tableEl, renderingCookie) {
  var trEl = document.createElement('tr');
  //append the blank corner first
  var titleEl = document.createElement('th');
  if (renderingCookie)
    titleEl.textContent = 'Cookies Sold';
  else
    titleEl.textContent = 'Staff Needed';
  trEl.appendChild(titleEl);
  //append the hours as th's
  for (var i = 0; i < hours.length; i++) {
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  if (renderingCookie) {
    var thEl = document.createElement('th');
    thEl.textContent = 'Daily Location Total';
    trEl.appendChild(thEl);
  }
  tableEl.appendChild(trEl);
}

function renderFooter(tableEl) {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);
  for (var i = 0; i < hours.length; i++) {
    var hour = hours[i];
    tdEl = document.createElement('td');
    tdEl.textContent = calculateHourlyTotal(hour);
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = calculateUltimateTotal();
  trEl.appendChild(tdEl);
  tableEl.appendChild(trEl);
}

function calculateHourlyTotal(hour) {
  var total = 0;
  for (var i = 0; i < stores.length; i++) {
    total += stores[i].hourInfoList[hour].hourlyCookies;
  }
  return total;
}

function calculateUltimateTotal() {
  var total = 0;
  for (var i = 0; i < stores.length; i++) {
    total += stores[i].totalDailyCookies;
  }
  return total;
}

function renderStaffingTable() {
  var staffTable = document.getElementById('staffingtable');

  renderHeader(staffTable, false);

  for (var i = 0; i < stores.length; i++) {
    stores[i].render(staffTable, false);
  }
}


renderTable();

renderStaffingTable();
