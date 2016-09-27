// return Math.floor(Math.random() * (max - min + 1)) + min
// brainstorming: properties: min max customers per hour, hours (array), avg cookies per sale {7ish total props}
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];


var location1stAndPike = {

    location: '1st and Pike',
    minCustomersPerHr: 23,
    maxCustomersPerHr: 65,
    avgCookiesPerSale: 6.3,
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
        var randomNumCustomers = Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
        return randomNumCustomers;
    },

    calculateHourlyCookies: function(hour) {
        return Math.round(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      return total;
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
      liEl.textContent = 'Total: ' + this.calculateDailyCookies() + ' cookies';
      ulEl.appendChild(liEl);
    }
};

var locationSeaTac = {

    location: 'SeaTac Airport',
    minCustomersPerHr: 3,
    maxCustomersPerHr: 24,
    avgCookiesPerSale: 1.2,
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
        var randomNumCustomers = Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
        return randomNumCustomers;
    },

    calculateHourlyCookies: function(hour) {
        return Math.round(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      return total;
    },

    render: function() {
      var h3El = document.getElementById('SeaTac_header');
      var ulEl = document.getElementById('SeaTac_list');

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
      liEl.textContent = 'Total: ' + this.calculateDailyCookies() + ' cookies';
      ulEl.appendChild(liEl);
    }
};

var locationSeattleCenter = {

    location: 'Seatlle Center',
    minCustomersPerHr: 11,
    maxCustomersPerHr: 38,
    avgCookiesPerSale: 3.7,
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
        var randomNumCustomers = Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
        return randomNumCustomers;
    },

    calculateHourlyCookies: function(hour) {
        return Math.round(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      return total;
    },

    render: function() {
      var h3El = document.getElementById('SeaCenter_header');
      var ulEl = document.getElementById('SeaCenter_list');

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
      liEl.textContent = 'Total: ' + this.calculateDailyCookies() + ' cookies';
      ulEl.appendChild(liEl);
    }
};

var locationCapHill = {

    location: 'Capitol Hill',
    minCustomersPerHr: 20,
    maxCustomersPerHr: 38,
    avgCookiesPerSale: 2.3,
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
        var randomNumCustomers = Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
        return randomNumCustomers;
    },

    calculateHourlyCookies: function(hour) {
        return Math.round(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      return total;
    },

    render: function() {
      var h3El = document.getElementById('CapHill_header');
      var ulEl = document.getElementById('CapHill_list');

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
      liEl.textContent = 'Total: ' + this.calculateDailyCookies() + ' cookies';
      ulEl.appendChild(liEl);
    }
};

var locationAlki = {

    location: 'Alki',
    minCustomersPerHr: 2,
    maxCustomersPerHr: 16,
    avgCookiesPerSale: 4.6,
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
        var randomNumCustomers = Math.floor(Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr;
        return randomNumCustomers;
    },

    calculateHourlyCookies: function(hour) {
        return Math.round(this.hourInfoList[hour].hourlyCustomers * this.avgCookiesPerSale);
    },

    calculateDailyCookies: function() {
      var total = 0;
      for (var i = 0; i < hours.length; i++) {
        total += this.hourInfoList[hours[i]].hourlyCookies;
      }
      return total;
    },

    render: function() {
      var h3El = document.getElementById('Alki_header');
      var ulEl = document.getElementById('Alki_list');

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
      liEl.textContent = 'Total: ' + this.calculateDailyCookies() + ' cookies';
      ulEl.appendChild(liEl);
    }
};


location1stAndPike.render();
locationSeaTac.render();
locationSeattleCenter.render();
locationCapHill.render();
locationAlki.render();
