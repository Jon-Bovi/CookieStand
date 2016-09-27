'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

/// this object is more refined than others
/// consolidated genhourlycusts and calchoulycookies into genhourlyobject
/// added totaldailycookies property
/// remove calculateDailyCookies; move funtionality into generation of hourly object
var location1stAndPike = {

    location: '1st and Pike',
    minCustomersPerHr: 23,
    maxCustomersPerHr: 65,
    avgCookiesPerSale: 6.3,
    totalDailyCookies: 0,
    hourInfoList: {},

    generateInfoList: function() {
        for (var i = 0; i < hours.length; i++) {
            this.hourInfoList[hours[i]] = this.generateHourlyInfoObject();
        }
    },

    generateHourlyInfoObject: function() {
        var numCustos = Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
        var numCookies = Math.ceil(numCustos * this.avgCookiesPerSale);
        this.totalDailyCookies += numCookies;
        var hourInfoObject = {
          hourlyCustomers: numCustos,
          hourlyCookies: numCookies
        };
        return hourInfoObject;
    },

    render: function() {
      var h3El = document.getElementById('Pike_header');
      var ulEl = document.getElementById('Pike_list');
      h3El.textContent = this.location;

      this.generateInfoList();
      console.log(this.hourInfoList);
      
      var hour;
      for (var i = 0; i < hours.length; i++) {
        var liEl = document.createElement('li');
        hour = hours[i];
        liEl.textContent = hour + ': ' + this.hourInfoList[hour].hourlyCookies + ' cookies';
        ulEl.appendChild(liEl);
      }
      var liEl = document.createElement('li');
      liEl.textContent = 'Total: ' + this.totalDailyCookies + ' cookies';
      ulEl.appendChild(liEl);
    }
};

var locationSeaTac = {

    location: 'SeaTac Airport',
    minCustomersPerHr: 3,
    maxCustomersPerHr: 24,
    avgCookiesPerSale: 1.2,
    totalDailyCookies: 0,
    hourInfoList: {},

    generateInfoList: function() {
        for (var i = 0; i < hours.length; i++) {
            var hour = hours[i];
            var hourlyCustomersGen = this.generateHourlyCustomers();
            this.hourInfoList[hour] = {
              hourlyCustomers: hourlyCustomersGen,
            };
            this.hourInfoList[hour].hourlyCookies = this.calculateHourlyCookies(hour);
        }
    },

    generateHourlyCustomers: function() {
        return Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
    },

    calculateHourlyCookies: function(hour) {
        return Math.ceil(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      this.totalDailyCookies = total;
    },

    render: function() {
      var h3El = document.getElementById('SeaTac_header');
      var ulEl = document.getElementById('SeaTac_list');

      h3El.textContent = this.location;

      this.generateInfoList();
      console.log(this.hourInfoList);
      this.calculateDailyCookies();
      var hour;
      for (var i = 0; i < hours.length; i++) {
        var liEl = document.createElement('li');
        hour = hours[i];
        liEl.textContent = hour + ': ' + this.hourInfoList[hour].hourlyCookies + ' cookies';
        ulEl.appendChild(liEl);
      }
      var liEl = document.createElement('li');
      liEl.textContent = 'Total: ' + this.totalDailyCookies + ' cookies';
      ulEl.appendChild(liEl);
    }
};

var locationSeattleCenter = {

    location: 'Seatlle Center',
    minCustomersPerHr: 11,
    maxCustomersPerHr: 38,
    avgCookiesPerSale: 3.7,
    totalDailyCookies: 0,
    hourInfoList: {},

    generateInfoList: function() {
        for (var i = 0; i < hours.length; i++) {
            var hour = hours[i];
            var hourlyCustomersGen = this.generateHourlyCustomers();
            this.hourInfoList[hour] = {
              hourlyCustomers: hourlyCustomersGen,
            };
            this.hourInfoList[hour].hourlyCookies = this.calculateHourlyCookies(hour);
        }
    },

    generateHourlyCustomers: function() {
        return Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
    },

    calculateHourlyCookies: function(hour) {
        return Math.ceil(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      this.totalDailyCookies = total;
    },

    render: function() {
      var h3El = document.getElementById('SeaCenter_header');
      var ulEl = document.getElementById('SeaCenter_list');

      h3El.textContent = this.location;

      this.generateInfoList();
      console.log(this.hourInfoList);
      this.calculateDailyCookies();
      var hour;
      for (var i = 0; i < hours.length; i++) {
        var liEl = document.createElement('li');
        hour = hours[i];
        liEl.textContent = hour + ': ' + this.hourInfoList[hour].hourlyCookies + ' cookies';
        ulEl.appendChild(liEl);
      }
      var liEl = document.createElement('li');
      liEl.textContent = 'Total: ' + this.totalDailyCookies + ' cookies';
      ulEl.appendChild(liEl);
    }
};

var locationCapHill = {

    location: 'Capitol Hill',
    minCustomersPerHr: 20,
    maxCustomersPerHr: 38,
    avgCookiesPerSale: 2.3,
    totalDailyCookies: 0,
    hourInfoList: {},

    generateInfoList: function() {
        for (var i = 0; i < hours.length; i++) {
            var hour = hours[i];
            var hourlyCustomersGen = this.generateHourlyCustomers();
            this.hourInfoList[hour] = {
              hourlyCustomers: hourlyCustomersGen,
            };
            this.hourInfoList[hour].hourlyCookies = this.calculateHourlyCookies(hour);
        }
    },

    generateHourlyCustomers: function() {
        return Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
    },

    calculateHourlyCookies: function(hour) {
        return Math.ceil(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      this.totalDailyCookies = total;
    },

    render: function() {
      var h3El = document.getElementById('CapHill_header');
      var ulEl = document.getElementById('CapHill_list');

      h3El.textContent = this.location;

      this.generateInfoList();
      console.log(this.hourInfoList);
      this.calculateDailyCookies();
      var hour;
      for (var i = 0; i < hours.length; i++) {
        var liEl = document.createElement('li');
        hour = hours[i];
        liEl.textContent = hour + ': ' + this.hourInfoList[hour].hourlyCookies + ' cookies';
        ulEl.appendChild(liEl);
      }
      var liEl = document.createElement('li');
      liEl.textContent = 'Total: ' + this.totalDailyCookies + ' cookies';
      ulEl.appendChild(liEl);
    }
};

var locationAlki = {

    location: 'Alki',
    minCustomersPerHr: 2,
    maxCustomersPerHr: 16,
    avgCookiesPerSale: 4.6,
    totalDailyCookies: 0,
    hourInfoList: {},

    generateInfoList: function() {
        for (var i = 0; i < hours.length; i++) {
            var hour = hours[i];
            var hourlyCustomersGen = this.generateHourlyCustomers();
            this.hourInfoList[hour] = {
              hourlyCustomers: hourlyCustomersGen,
            };
            this.hourInfoList[hour].hourlyCookies = this.calculateHourlyCookies(hour);
        }
    },

    generateHourlyCustomers: function() {
        return Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
    },

    calculateHourlyCookies: function(hour) {
        return Math.ceil(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      this.totalDailyCookies = total;
    },

    render: function() {
      var h3El = document.getElementById('Alki_header');
      var ulEl = document.getElementById('Alki_list');
      h3El.textContent = this.location;

      this.generateInfoList();
      console.log(this.hourInfoList);
      this.calculateDailyCookies();

      var hour;
      for (var i = 0; i < hours.length; i++) {
        var liEl = document.createElement('li');
        hour = hours[i];
        liEl.textContent = hour + ': ' + this.hourInfoList[hour].hourlyCookies + ' cookies';
        ulEl.appendChild(liEl);
      }
      var liEl = document.createElement('li');
      liEl.textContent = 'Total: ' + this.totalDailyCookies + ' cookies';
      ulEl.appendChild(liEl);
    }
};


location1stAndPike.render();
locationSeaTac.render();
locationSeattleCenter.render();
locationCapHill.render();
locationAlki.render();
