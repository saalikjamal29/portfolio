// Navigation and Scroll
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.style.display = 'none';
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ==================== WEATHER API INTEGRATION ====================

const API_KEY = 'b6fd43b59e44062d5fb1cd4feef9be32'; // OpenWeatherMap API Key
const API_URL = 'https://api.openweathermap.org/data/2.5';
let currentCity = 'London';
let isCelsius = true;

// Get weather by city name
async function getWeatherByCity(city) {
    const loadingElement = document.getElementById('weatherLoading');
    const errorElement = document.getElementById('weatherError');
    
    try {
        loadingElement.style.display = 'flex';
        errorElement.style.display = 'none';

        const response = await fetch(
            `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        currentCity = data.name;
        displayCurrentWeather(data);
        getWeatherForecast(data.coord.lat, data.coord.lon);

    } catch (error) {
        console.error('Error fetching weather:', error);
        errorElement.textContent = error.message;
        errorElement.style.display = 'block';
    } finally {
        loadingElement.style.display = 'none';
    }
}

// Get weather by geolocation
function getWeatherByLocation() {
    const loadingElement = document.getElementById('weatherLoading');
    
    if (navigator.geolocation) {
        loadingElement.style.display = 'flex';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
                getWeatherByCity('London');
            }
        );
    } else {
        getWeatherByCity('London');
    }
}

// Get weather by coordinates
async function getWeatherByCoordinates(lat, lon) {
    const loadingElement = document.getElementById('weatherLoading');
    const errorElement = document.getElementById('weatherError');
    
    try {
        loadingElement.style.display = 'flex';
        errorElement.style.display = 'none';

        const response = await fetch(
            `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();
        currentCity = data.name;
        displayCurrentWeather(data);
        getWeatherForecast(lat, lon);

    } catch (error) {
        console.error('Error fetching weather:', error);
        errorElement.style.display = 'block';
    } finally {
        loadingElement.style.display = 'none';
    }
}

// Get 5-day forecast
async function getWeatherForecast(lat, lon) {
    try {
        const response = await fetch(
            `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();
        displayForecast(data.list);

    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const container = document.getElementById('currentWeather');
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);

    const html = `
        <div class="weather-header">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p class="weather-date">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>

        <div class="weather-main">
            <div class="weather-icon-large">
                <i class="${weatherIcon}"></i>
            </div>
            <div class="weather-info">
                <div class="temperature">${temp}°C</div>
                <div class="condition">${data.weather[0].main}</div>
                <div class="description">${data.weather[0].description}</div>
            </div>
        </div>

        <div class="weather-details">
            <div class="detail-card">
                <i class="fas fa-thermometer-half"></i>
                <div>
                    <span>Feels Like</span>
                    <p>${feelsLike}°C</p>
                </div>
            </div>
            <div class="detail-card">
                <i class="fas fa-droplet"></i>
                <div>
                    <span>Humidity</span>
                    <p>${data.main.humidity}%</p>
                </div>
            </div>
            <div class="detail-card">
                <i class="fas fa-wind"></i>
                <div>
                    <span>Wind Speed</span>
                    <p>${Math.round(data.wind.speed * 3.6)} km/h</p>
                </div>
            </div>
            <div class="detail-card">
                <i class="fas fa-compress"></i>
                <div>
                    <span>Pressure</span>
                    <p>${data.main.pressure} hPa</p>
                </div>
            </div>
            <div class="detail-card">
                <i class="fas fa-eye"></i>
                <div>
                    <span>Visibility</span>
                    <p>${(data.visibility / 1000).toFixed(1)} km</p>
                </div>
            </div>
            <div class="detail-card">
                <i class="fas fa-cloud"></i>
                <div>
                    <span>Cloudiness</span>
                    <p>${data.clouds.all}%</p>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// Display forecast
function displayForecast(forecastList) {
    const container = document.getElementById('forecast');
    const forecastData = {};

    // Group by day
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!forecastData[date]) {
            forecastData[date] = [];
        }
        forecastData[date].push(item);
    });

    let html = '';
    let dayCount = 0;

    for (const [date, items] of Object.entries(forecastData)) {
        if (dayCount >= 5) break;

        const avgTemp = Math.round(
            items.reduce((sum, item) => sum + item.main.temp, 0) / items.length
        );
        const mainWeather = items[0].weather[0].main;
        const icon = getWeatherIcon(mainWeather);
        const dateObj = new Date(date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

        html += `
            <div class="forecast-card glass-card">
                <h4>${dayName}</h4>
                <i class="${icon}"></i>
                <p class="temp">${avgTemp}°C</p>
                <p class="condition">${mainWeather}</p>
            </div>
        `;

        dayCount++;
    }

    container.innerHTML = html;
}

// Get appropriate weather icon
function getWeatherIcon(weatherMain) {
    const iconMap = {
        'Clear': 'fas fa-sun',
        'Clouds': 'fas fa-cloud',
        'Rain': 'fas fa-cloud-rain',
        'Drizzle': 'fas fa-cloud-rain',
        'Thunderstorm': 'fas fa-bolt',
        'Snow': 'fas fa-snowflake',
        'Mist': 'fas fa-smog',
        'Smoke': 'fas fa-smog',
        'Haze': 'fas fa-smog',
        'Dust': 'fas fa-smog',
        'Fog': 'fas fa-smog',
        'Sand': 'fas fa-smog',
        'Ash': 'fas fa-smog',
        'Squall': 'fas fa-wind',
        'Tornado': 'fas fa-tornado'
    };

    return iconMap[weatherMain] || 'fas fa-cloud';
}

// Search functionality
document.getElementById('searchBtn')?.addEventListener('click', function() {
    const input = document.getElementById('cityInput');
    if (input.value.trim()) {
        getWeatherByCity(input.value.trim());
        input.value = '';
    }
});

// Allow Enter key to search
document.getElementById('cityInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

// Location button
document.getElementById('locationBtn')?.addEventListener('click', getWeatherByLocation);

// Temperature toggle
document.getElementById('tempToggle')?.addEventListener('change', function() {
    isCelsius = this.checked;
    // Refresh with new unit
    getWeatherByCity(currentCity);
});

// Load weather on page load
window.addEventListener('load', function() {
    getWeatherByLocation();
});

// ==================== ANIMATIONS ====================

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .forecast-card, .detail-card').forEach(el => {
    observer.observe(el);
});

// Particle effect on interactions
function createParticles(x, y) {
    const particleCount = 5;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #FF6B6B, #FFD93D);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 1;
        `;
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        let life = 1;

        const animate = () => {
            x += vx;
            y += vy;
            life -= 0.02;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;

            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }
}

// Add click particles to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
    });
});

// Console message
console.log('%c⛅ Weather Dashboard', 'color: #FFD93D; font-size: 20px; font-weight: bold;');
console.log('%cPowered by OpenWeatherMap API', 'color: #FF6B6B; font-size: 12px;');
