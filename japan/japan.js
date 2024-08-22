let itinerary = {
  2: [
    {
      lat: 47.448365,
      long:  -122.308593,
      imgUrl: "imgs/seatac.jpg",
      descrip: "3/2 4:08AM Departing from SeaTac Airport"
    },
  ],
  3: [
    {
      lat: 35.5493932,
      long: 139.7772637,
      imgUrl: "imgs/haneda.jpg",
      descrip: "3/3 8:37PM Arrived in Haneda Airport"
    },
    {
      lat: 35.6957513,
      long: 139.6980145,
      imgUrl: "imgs/kabukicho.jpg",
      descrip: "3/3 9:59PM Dropped off at Tokyu Kabukicho Tower via Airport Shuttle"
    },
    {
      lat: 35.7019034,
      long: 139.699137,
      imgUrl: "imgs/yoshinoya.jpg",
      descrip: "3/3 10:43PM First meal in Japan! Yoshinoya ftw."
    },
  ],
  4: [
    {
      lat: 35.695799,
      long: 139.701528,
      imgUrl: "imgs/kuromi.jpg",
      descrip: "3/4 12:33AM First plushie of the trip won!"
    },
    {
      lat: 35.701603,
      long: 139.698763,
      imgUrl: "imgs/4.1.jpg",
      descrip: "3/4 8:58AM First selfie of the Japan trip!"
    },
    {
      lat: 35.644429,
      long: 139.707087,
      imgUrl: "imgs/4.2.jpg",
      descrip: "3/4 12:35PM Got a perm at Mint Salon"
    },
    {
      lat: 35.668863,
      long: 139.768724,
      imgUrl: "imgs/4.3.jpg",
      descrip: "3/4 5:50PM Tried out fancy coffee at Glitch"
    }
  ],
  5: [
    {
      lat: 35.701737,
      long: 139.698594,
      imgUrl: "imgs/5.1.jpg",
      descrip: "3/5 9:31AM Can't start the day without some vending machine drinks"
    },
    {
      lat: 35.678785,
      long: 139.762788,
      imgUrl: "imgs/5.2.jpg",
      descrip: "3/5 2:05PM Omakase for $50"
    },
    {
      lat: 35.644429,
      long: 139.707087,
      imgUrl: "imgs/5.3.jpg",
      descrip: "3/5 2:59PM Daily Coffee"
    },
    {
      lat: 35.701296,
      long: 139.771158,
      imgUrl: "imgs/5.4.jpg",
      descrip: "3/5 7:08PM Curryyyy!"
    },
  ],
  6: [
    {
      lat: 35.699852,
      long: 139.700549,
      imgUrl: "imgs/6.1.jpg",
      descrip: "3/6 9:25AM Famichiki was a must every day"
    },
    {
      lat: 35.626576,
      long: 139.888010,
      imgUrl: "imgs/6.2.jpg",
      descrip: "3/6 11:34AM Tokyo DisneySea"
    },
    {
      lat: 35.693517,
      long: 139.701361,
      imgUrl: "imgs/6.3.jpg",
      descrip: "3/6 10:44PM Torikizoku to end the night"
    },
  ],
  7: [
    {
      lat: 35.694561,
      long: 139.701775,
      imgUrl: "imgs/7.1.jpg",
      descrip: "3/7 12:45PM Curry from CoCo"
    },
    {
      lat: 35.696644,
      long: 139.570040,
      imgUrl: "imgs/7.2.jpg",
      descrip: "3/7 2:14PM Ghibli Museum"
    },
    {
      lat: 35.704615,
      long: 139.574524,
      imgUrl: "imgs/7.3.jpg",
      descrip: "3/7 5:27PM Matcha roll and some matcha lattes"
    },
  ],
  8: [{}],
  9: [{}],
  10: [{}],
  11: [{}],
  12: [{}],
  13: [{}],
  14: [{}],
  15: [{}],
  16: [{}],
  17: [{}],
  18: [{}],
};

// Initialize map to Tokyo, Japan
const map = L.map('map').setView([35.670202,139.7564271], 11);

L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

let markers = [];
const addPintoMap = (lat, long, imgUrl = '', popupText = '') => {
  const popup = `<img class="popup" src="${imgUrl}"><br>${popupText}`;
  let marker = L.marker([lat,long], { autoPanOnFocus: true }).addTo(map);
  marker.bindPopup(popup, {
    autoPan: true,
    autoPanPadding: [50,50],
  });
  markers.push(marker);
};

const addPintoMapOnClick = (day = 2) => {
  if (day === 2) {
    // SeaTac Airport
    map.setView([47.448365, -122.308593], 11);
  } else {
    // Japan
    map.setView([35.670202,139.7564271], 11);
  }
  // If markers already exist, remove from map first
  if (markers) {
    for (let marker of markers) marker.remove();
    markers = [];
  }

  // Placeholder marker for WIP markers
  if (day > 7) {
    for (let event of itinerary[day]) {
      addPintoMap(35.670202, 139.7564271, "imgs/0.jpg", "This day is in progress!");
    }    
  } else {
    for (let event of itinerary[day]) {
      addPintoMap(event.lat, event.long, event.imgUrl, event.descrip);
    }    
  }
};

// Render map with corresponding markers for day clicked
const onHighlightDayClick = (event) => {
  addPintoMapOnClick(parseInt(event.target.innerText));
  document.getElementById('map').classList.add('show');
  map.invalidateSize(); // Rerenders/update map in case container has changed
}

// Put a click event listener on all the highlighted days
const highlightDaysElems = [...document.getElementsByClassName('highlight')];
highlightDaysElems.forEach(dayElem => {
  dayElem.addEventListener('click', onHighlightDayClick);
});

