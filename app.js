'use strict';
/*eslint-disable*/

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var hourlyTotals = [];

function CookieShop(locationName, minCustomersPerHr, maxCustomersPerHr, avgCookiesPerSale) {
  this.locationName = locationName;
  this.minCustomersPerHr = minCustomersPerHr;
  this.maxCustomersPerHr = maxCustomersPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.totalDailyCookies = 0;
  this.hourInfoList = {};

  this.generateInfoList = function() {
      for (var i = 0; i < hours.length; i++) {
          this.hourInfoList[hours[i]] = this.generateHourlyInfoObject();
      }
  };

  this.generateHourlyInfoObject = function() {
      var numCustomers = Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
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
