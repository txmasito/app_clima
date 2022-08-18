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
                
                //CHANGE ICON DESCRIPTION
                if(descMeteo.textContent == 'clear sky' && (parseInt(hour) >= 7 || parseInt(hour) <= 19)){
                    imageDesc.classList.add('clear-sky');
                } else if(descMeteo.textContent == 'clear sky' && (parseInt(hour) >= 19 || parseInt(hour) <= 6)){
                    imageDesc.classList.add('clear-sky-night');
                }
        
                if(descMeteo.textContent == 'few clouds' && (parseInt(hour) >= 7 || parseInt(hour) <= 19)){
                    imageDesc.classList.add('few-clouds');
                } else if(descMeteo.textContent == 'few clouds' && (parseInt(hour) >= 19 || parseInt(hour) <= 6)){
                    imageDesc.classList.add('few-clouds-night');
                }
        
                if(descMeteo.textContent == 'mist' && (parseInt(hour) >= 7 || parseInt(hour) <= 19)){
                    imageDesc.classList.add('mist');
                } else if(descMeteo.textContent == 'mist' && (parseInt(hour) >= 19 || parseInt(hour) <= 6)){
                    imageDesc.classList.add('mist-night');
                }
        
                if(descMeteo.textContent == 'rain' && (parseInt(hour) >= 7 || parseInt(hour) <= 19)){
                    imageDesc.classList.add('rain');
                } else if(descMeteo.textContent == 'rain' && (parseInt(hour) >= 19 || parseInt(hour) <= 6)){
                    imageDesc.classList.add('rain-night');
                }
        
                if(descMeteo.textContent == 'broken clouds'){
                    imageDesc.classList.add('broken-clouds');
                }else if(descMeteo.textContent == 'shower rain'){
                    imageDesc.classList.add('shower-rain');
                }else if(descMeteo.textContent == 'scattered clouds'){
                    imageDesc.classList.add('scattered-clouds');
                }else if(descMeteo.textContent == 'snow'){
                    imageDesc.classList.add('snow');
                }else if(descMeteo.textContent == 'thundertorm'){
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