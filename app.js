'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var newStoreEl = document.getElementById('storeform');
var cookieTableEl = document.getElementById('cookietable');
var staffingTable = document.getElementById('staffingtable');

function CookieShop(locationName, minCustomersPerHr, maxCustomersPerHr, avgCookiesPerSale) {
  this.locationName = locationName;
  this.minCustomersPerHr = minCustomersPerHr;
  this.maxCustomersPerHr = maxCustomersPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.totalDailyCookies = 0;
  this.numCustomersPerHour = [];
  this.hourInfoList = {};

  this.generateCustomersPerHour = function() {
    this.numCustomersPerHour = [];
    for (var i = 0; i < hours.length; i++) {
      this.numCustomersPerHour.push(Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr);
    }
    this.distributeCustomersPerHour();
  };

  // makes numCustomersPerHour into a pseudo bell-curve
  // whether this actually simulates reality better...I don't know
  this.distributeCustomersPerHour = function() {
    var firstHalf = this.numCustomersPerHour.slice(0, hours.length / 2);
    var secondHalf = this.numCustomersPerHour.slice(hours.length / 2, hours.length);
    //sorts the first 7 hours in ascending order
    //.sort() can only sort numbers if you give it a function that compares them
    firstHalf.sort(function(a, b) {return a - b;});
    //sorts the last 7 hours in descending order
    secondHalf.sort(function(a, b) {return b - a;});
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
  };

  this.render = function(storeIndex, renderingCookie, odd) {
    // console.log(this.hourInfoList);
    var trEl = document.createElement('tr');
    //insert first cell
    var locationEl = document.createElement('td');
    locationEl.textContent = this.locationName;
    locationEl.setAttribute('class', 'locationEl');
    trEl.appendChild(locationEl);
    //insert the hourly data
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
    //if rendering the cookie table, insert store total for the day
    if (renderingCookie) {
      tdEl = document.createElement('td');
      tdEl.textContent = this.totalDailyCookies;
      trEl.appendChild(tdEl);
      tdEl = document.createElement('td');
      var buttonEl = document.createElement('button');
      buttonEl.setAttribute('id','' + storeIndex);
      buttonEl.textContent = 'Delete';
      tdEl.appendChild(buttonEl);
      trEl.appendChild(tdEl);
    }
    if (odd) {
      trEl.setAttribute('class', 'odd');
    }
    if (renderingCookie) {
      cookieTableEl.appendChild(trEl);
    } else {
      staffingTable.appendChild(trEl);
    }
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

function calculateHourlyTotalAllStores(hour) {
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

function isStore(storeName) {
  for (var i = 0; i < stores.length; i++) {
    if (stores[i].locationName === storeName) {
      return stores[i];
    }
  }
  return false;
}

function renderHeader(renderingCookie) {
  var trEl = document.createElement('tr');
  //name the tables in the top left corner
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
    thEl = document.createElement('th');
    thEl.textContent = 'Daily Location Total';
    trEl.appendChild(thEl);
    cookieTableEl.appendChild(trEl);
  } else {
    staffingTable.appendChild(trEl);
  }
}


function renderFooter() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);
  for (var i = 0; i < hours.length; i++) {
    var hour = hours[i];
    tdEl = document.createElement('td');
    tdEl.textContent = calculateHourlyTotalAllStores(hour);
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = calculateUltimateTotal();
  trEl.appendChild(tdEl);
  cookieTableEl.appendChild(trEl);
}

function renderCookieTable() {
  renderHeader(true);
  //tell instances to render their own info
  var odd = true;
  for (var i = 0; i < stores.length; i++) {
    odd = !odd;
    stores[i].render(i, true, odd);
  }
  //render totals row
  renderFooter();
}

function renderStaffingTable() {
  var staffTable = document.getElementById('staffingtable');
  renderHeader(false);
  var odd = true;
  for (var i = 0; i < stores.length; i++) {
    odd = !odd;
    stores[i].render(false, false, odd);
  }
}

function handleSubmitStore(event) {
  event.preventDefault();
  if (event.target === newStoreEl) {
    var locationName = event.target.location.value;
    var minCustomersPerHr = parseInt(event.target.minCusts.value);
    var maxCustomersPerHr = parseInt(event.target.maxCusts.value);
    var avgCookiesPerSale = event.target.avg.value;

    if (minCustomersPerHr > maxCustomersPerHr) {
      return alert('Min value must be less than max value.');
    } else if (isStore(locationName)) {
      var changed = false;
      var storeToEdit = isStore(locationName);
      if (minCustomersPerHr) {
        storeToEdit.minCustomersPerHr = minCustomersPerHr;
        changed = true;
      }
      if (maxCustomersPerHr) {
        storeToEdit.maxCustomersPerHr = maxCustomersPerHr;
        changed = true;
      }
      if (avgCookiesPerSale) {
        storeToEdit.avgCookiesPerSale = avgCookiesPerSale;
        changed = true;
      }
      isStore(locationName).generateInfoList();
    } else if (!minCustomersPerHr || !maxCustomersPerHr || !avgCookiesPerSale) {
      return alert('All fields required for new locations.');
    } else {
        stores.push(new CookieShop(locationName, minCustomersPerHr, maxCustomersPerHr, avgCookiesPerSale));
    }
    event.target.location.value = null;
    event.target.minCusts.value = null;
    event.target.maxCusts.value = null;
    event.target.avg.value = null;
  } else {
    var index = parseInt(event.target.getAttribute('id'));
    stores.splice(index, 1);
  }

  cookieTableEl.textContent = '';
  staffingTable.textContent = '';

  renderCookieTable();
  renderStaffingTable();
}

newStoreEl.addEventListener('submit', handleSubmitStore);
cookieTableEl.addEventListener('click', handleSubmitStore);

renderCookieTable();
renderStaffingTable();
