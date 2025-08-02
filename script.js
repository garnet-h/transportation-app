// Initialize map
const map = L.map('map-container').setView([51.505, -0.09], 13);

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker
const marker = L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Central Station')
    .openPopup();

// Transport selection
const transportButtons = document.querySelectorAll('.transport-types button');
let selectedTransport = 'bus';

transportButtons.forEach(button => {
    button.addEventListener('click', () => {
        transportButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedTransport = button.dataset.type;
    });
});

// Route finding
document.getElementById('find-route').addEventListener('click', () => {
    const destination = document.getElementById('destination').value;
    if (destination) {
        alert(`Finding ${selectedTransport} route to: ${destination}`);
        // In real app: call routing API here
    } else {
        alert('Please enter a destination');
    }
});

// Current location feature
document.getElementById('current-location').addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            map.setView([userLat, userLng], 15);

            // Remove existing user marker if any
            if (window.userMarker) {
                map.removeLayer(window.userMarker);
            }

            // Add new marker
            window.userMarker = L.marker([userLat, userLng])
                .addTo(map)
                .bindPopup("Your Location")
                .openPopup();

            alert("Location found! Map centered to your position.");
        }, () => {
            alert("Could not get your location. Please enable location services.");
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
});

// Set bus as default selected
document.querySelector('[data-type="bus"]').classList.add('active');