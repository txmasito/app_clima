const day = document.getElementById('day');
const numberDay = document.getElementById('number-day');
const month = document.getElementById('month');
const city = document.getElementById('city');
const country = document.getElementById('country');
const titleMeteo = document.getElementById('title-meteo');
const descMeteo = document.getElementById('desc-meteo');
const imageDesc = document.getElementById('image-desc');
const temp = document.getElementById('temp');
const dateTempMin = document.getElementById('date-temp-min');
const dateTempMax = document.getElementById('date-temp-max');
const humidity = document.getElementById('humedity');
const nubo = document.getElementById('nubo');
const speedWind = document.getElementById('speed-wind');
const degWind = document.getElementById('deg-wind');
let hour;

window.addEventListener('load', () => {
    let lat;
    let lon;
    const setDate = () => {
        const date = new Date();
        numberDay.textContent = date.toLocaleString('es', {day: 'numeric'});
        day.textContent = date.toLocaleString('es', {weekday: 'long'});
        month.textContent = date.toLocaleString('es', {month: 'short'});
        hour = date.toLocaleString('es', {hour: '2-digit'});
        
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f7a8dc9cdfc4dd02a840a090221edf30`;

            axios({
                method: 'get',
                url: api,
            }).then(res => {
                setDate();
                city.textContent = res.data.name;
                country.textContent = res.data.sys.country;
                titleMeteo.textContent = res.data.weather[0].main;
                descMeteo.textContent = res.data.weather[0].description;
                //CONVERT TEMP
                let tempConvert = Math.floor(res.data.main.temp).toString();
                let tempConvert2 = tempConvert.split('');
                let tempConvert3 = tempConvert2.splice(0,2);
                let tempConvert4 = tempConvert3.join('');
                temp.textContent = `${tempConvert4}°`;
                //CONVERT TEMP-MIN
                let tempConvertMin = Math.floor(res.data.main.temp_min).toString();
                let tempConvertMin2 = tempConvertMin.split('');
                let tempConvertMin3 = tempConvertMin2.splice(0,2);
                let tempConvertMin4 = tempConvertMin3.join('');
                dateTempMin.textContent = `${tempConvertMin4}°`;
                //CONVERT TEMP-MAX
                let tempConvertMax = Math.floor(res.data.main.temp_max).toString();
                let tempConvertMax2 = tempConvertMax.split('');
                let tempConvertMax3 = tempConvertMax2.splice(0,2);
                let tempConvertMax4 = tempConvertMax3.join('');
                dateTempMax.textContent = `${tempConvertMax4}°`;
                // HUMIDITY
                humidity.textContent = `${res.data.main.humidity}%`;
                //NUBOCITY
                nubo.textContent = `${res.data.clouds.all}%`;
                //WIND DATES
                speedWind.innerHTML = `${res.data.wind.speed}`;
                const span = document.createElement('span');
                span.textContent = 'm/s';
                span.classList.add('m-s');
                speedWind.appendChild(span);
                degWind.textContent = `${res.data.wind.deg}°`;
                
                //CHANGE ICON TITLE
                
                if(titleMeteo.textContent == 'Clear sky' && (parseInt(hour) >= 7 || parseInt(hour) <= 19)){
                    imageDesc.classList.add('clear-sky');
                }
                if(titleMeteo.textContent == 'Clear sky' && (parseInt(hour) >= 19 || parseInt(hour) <= 7)){
                    imageDesc.classList.add('clear-sky-night');
                    console.log('hola');
                }
        
                if(titleMeteo.textContent == 'Clouds' && (parseInt(hour) >= 7 || parseInt(hour) <= 19)){
                    imageDesc.classList.add('few-clouds');
                }
                if(titleMeteo.textContent == 'Clouds' && (parseInt(hour) >= 19 || parseInt(hour) <= 6)){
                    imageDesc.classList.add('few-clouds-night');
                }
        
                if((titleMeteo.textContent == 'Mist' || titleMeteo.textContent == 'Smoke' || titleMeteo.textContent == 'Haze' || titleMeteo.textContent == 'Dust' || titleMeteo.textContent == 'Fog' || titleMeteo.textContent == 'Sand' || titleMeteo.textContent == 'Ash' || titleMeteo.textContent == 'Squall' || titleMeteo.textContent == 'Tornado') && (parseInt(hour) >= 7 || parseInt(hour) <= 19)){
                    imageDesc.classList.add('mist');
                }
                if((titleMeteo.textContent == 'Mist' || titleMeteo.textContent == 'Smoke' || titleMeteo.textContent == 'Haze' || titleMeteo.textContent == 'Dust' || titleMeteo.textContent == 'Fog' || titleMeteo.textContent == 'Sand' || titleMeteo.textContent == 'Ash' || titleMeteo.textContent == 'Squall' || titleMeteo.textContent == 'Tornado') && (parseInt(hour) >= 19 || parseInt(hour) <= 6)){
                    imageDesc.classList.add('mist-night');
                }
        
                if(titleMeteo.textContent == 'Rain' && (parseInt(hour) >= 7 || parseInt(hour) <= 19)){
                    imageDesc.classList.add('rain');
                }
                if(titleMeteo.textContent == 'Rain' && (parseInt(hour) >= 19 || parseInt(hour) <= 6)){
                    imageDesc.classList.add('rain-night');
                }
        
                if(titleMeteo.textContent == 'Broken clouds'){
                    imageDesc.classList.add('broken-clouds');
                }
                if(titleMeteo.textContent == 'Drizzle'){
                    imageDesc.classList.add('shower-rain');
                }
                if(titleMeteo.textContent == 'Scattered clouds'){
                    imageDesc.classList.add('scattered-clouds');
                }
                if(titleMeteo.textContent == 'Snow'){
                    imageDesc.classList.add('snow');
                }
                if(titleMeteo.textContent == 'Thunderstorm'){
                    imageDesc.classList.add('thundertorm');
                }
                // NIGHT MODE
                if(parseInt(hour) >= 19 || parseInt(hour) <= 6){
                    document.querySelector('body').style = 'background-color: var(--color-blue-dark); color: var(--color-white)';
                    document.querySelector('.section-date').style = 'background-color: var(--color-blue-semi-dark);';
                    document.querySelector('.section-meteoro').style = 'background-color: var(--color-blue-semi-dark);';
                    document.querySelector('.section-temp').style = 'background-color: var(--color-blue-semi-dark);';
                    document.querySelector('.humedity').style = 'background-color: var(--color-blue-semi-dark);';
                    document.querySelector('.nubo').style = 'background-color: var(--color-blue-semi-dark);';
                    document.querySelector('.section-wind').style = 'background-color: var(--color-blue-semi-dark);';
                    document.querySelector('.icon-ubication').style = 'background-image: url("/assets/icons/location-night.svg");';
                }
            })
            .catch(err => console.log(err));
        })
    }
})