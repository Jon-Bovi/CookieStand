'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var updateEl = document.getElementById('storeform');
var cookieTableEl = document.getElementById('cookietable');
var staffingTableEl = document.getElementById('staffingtable');
var containingDiv = document.getElementById('horizontal');
var oldSize = 1000;

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
    this.totalDailyCookies = 0;
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
    locationEl.setAttribute('id', storeIndex + 'loc');
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
    //if rendering the cookie table, insert store total for the day and the button
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
      staffingTableEl.appendChild(trEl);
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
    if (stores[i].locationName.toLowerCase() === storeName.toLowerCase()) {
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
    trEl.appendChild(document.createElement('td'));
    cookieTableEl.appendChild(trEl);
  } else {
    staffingTableEl.appendChild(trEl);
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
  trEl.appendChild(document.createElement('td'));
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
  renderHeader(false);
  var odd = true;
  for (var i = 0; i < stores.length; i++) {
    odd = !odd;
    stores[i].render(false, false, odd);
  }
}

function handleSubmitStore(event) {
  event.preventDefault();

  var locationName = event.target.location.value;
  var minCustomersPerHr = parseInt(event.target.minCusts.value);
  var maxCustomersPerHr = parseInt(event.target.maxCusts.value);
  var avgCookiesPerSale = event.target.avg.value;
  var storeToEdit = isStore(locationName);

  if (minCustomersPerHr > maxCustomersPerHr) {
    return alert('Invalid min/max values.');
  } else if (storeToEdit) {
    if (minCustomersPerHr > storeToEdit.maxCustomersPerHr) {
      return alert('Min value must be less than set max value of ' + storeToEdit.maxCustomersPerHr);
    }
    if (maxCustomersPerHr < storeToEdit.minCustomersPerHr) {
      return alert('Max value must be more than set min value of ' + storeToEdit.minCustomersPerHr);
    }
    if (minCustomersPerHr) {
      storeToEdit.minCustomersPerHr = minCustomersPerHr;
    }
    if (maxCustomersPerHr) {
      storeToEdit.maxCustomersPerHr = maxCustomersPerHr;
    }
    if (avgCookiesPerSale) {
      storeToEdit.avgCookiesPerSale = avgCookiesPerSale;
    }
    storeToEdit.generateInfoList();
  } else if (!minCustomersPerHr || !maxCustomersPerHr || !avgCookiesPerSale) {
    return alert('All fields required for new locations.');
  } else {
    stores.push(new CookieShop(locationName, minCustomersPerHr, maxCustomersPerHr, avgCookiesPerSale));
  }

  event.target.location.value = null;
  event.target.minCusts.value = null;
  event.target.maxCusts.value = null;
  event.target.avg.value = null;

  resetTables();
}

function handleTableClick(event) {
  var targetEl = event.target;
  console.log(event);
  var index = parseInt(targetEl.getAttribute('id'));
  if (!isNaN(index)) {
    // if a location name is clicked
    if (targetEl.getAttribute('id').substring(1,4) === 'loc') {
      if (event.type === 'mousedown') {
        var min = stores[index].minCustomersPerHr;
        var max = stores[index].maxCustomersPerHr;
        var avg = stores[index].avgCookiesPerSale;
        targetEl.textContent = 'min:' + min + ' max:' + max + ' avg:' + avg;
      } else if (event.type === 'click') {
        targetEl.textContent = stores[index].locationName;
      }
    // if the a delete button is clicked
    } else {
      stores.splice(index, 1);
      resetTables();
    }
  }
}

function resetTables() {
  cookieTableEl.textContent = '';
  staffingTableEl.textContent = '';

  renderCookieTable();
  renderStaffingTable();
  if (containingDiv.getAttribute('id') === 'vertical') {
    makeVertical(cookieTableEl);
    makeVertical(staffingTableEl);
  }
}

function handleResize() {
  var newSize = window.outerWidth;
  if (newSize < 750 && oldSize >= 750) {
    makeVertical(cookieTableEl);
    makeVertical(staffingTableEl);
  } else if (newSize >= 750 && oldSize < 750) {
    containingDiv.setAttribute('id', 'horizontal');
    resetTables();
  }
  oldSize = newSize;
}

function makeVertical(table) {
  containingDiv.setAttribute('id', 'vertical');
  var flippedTable = [];
  var rowEls = table.children;
  var numOldRows = rowEls.length;
  var numOldColumns = rowEls[0].children.length;
  // initialize flippedTable multidimensional array
  for (var j = 0; j < numOldColumns; j++) {
    flippedTable.push([]);
  }
  // build flippedTable and destroy old DOM table
  for (var i = 0; i < numOldRows; i++) {
    var currentRow = rowEls[i];
    var currentRowLength = currentRow.children.length;
    for (var k = 0; k < currentRowLength; k++) {
      var currentBox = currentRow.firstChild;
      // console.log(currentBox);
      flippedTable[k].push(currentRow.removeChild(currentBox));
    }
  }
  // remove remaining tr elements from table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  // build new DOM table from flippedTable
  for (var i = 0; i < flippedTable.length; i++) {
    var trEl = document.createElement('tr');
    if (i % 2 === 0) {
      trEl.setAttribute('class', 'odd');
    }
    for (var k = 0; k < flippedTable[i].length; k++) {
      trEl.appendChild(flippedTable[i][k]);
    }
    table.appendChild(trEl);
  }

}



updateEl.addEventListener('submit', handleSubmitStore);
cookieTableEl.addEventListener('click', handleTableClick);
cookieTableEl.addEventListener('mousedown', handleTableClick);
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

renderCookieTable();
renderStaffingTable();
