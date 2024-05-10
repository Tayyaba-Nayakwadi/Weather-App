const API_KEY = `82684900084e6fce9630e0a3e884df8f`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather1 = document.querySelector("#weather1");
const weather2 = document.querySelector("#weather2");
const weather3 = document.querySelector("#sunrise_sunset");

const days=['sunday' , 'Monday' , 'Tuesday','Wednesday', 'Thursday' , 'Friday', 'Saturday' ] ;
const months= ['Jan', 'Feb' ,'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
 



setInterval(myFun, 1000);

function myFun(){
const time= new Date();
const date= String(time.getDate()).padStart(2, '0');
const hour= time.getHours();
const minute=String(time.getMinutes()).padStart(2, '0');

const ampm= hour >=12 ? 'PM' : 'AM' ;
const month= time.getMonth();
const day= time.getDay();
const hours12= hour >= 13 ? hour % 12: hour ;

 document.getElementById("timeid").innerHTML= hours12 + ':' + minute +`<span id="am-pm">${ampm}</span>`;
 document.getElementById("dateid").innerHTML= days[day] +' , '+ date+'  ' + months[month];
}



//const API=`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;
//const Img_url=`https://openweathermap.org/img/wn/${data.weather[0]}@2x.png`;
const getWeather = async (city) => {
    
    weather1.innerHTML =`<h3>Loading....</h3>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);

    const data = await response.json();
    return showWeather(data);
}

const showWeather = (data) => {
    
if(data.cod=="404"){
    weather1.innerHTML =`<h3>City Not Found</h3>`
    weather2.innerHTML =``
    weather3.innerHTML =``
    return;
}
    weather1.innerHTML = `
            <div class="weather_image">
              <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather_image">
            </div>
             <div class="weather_temp">${Math.round(data.main.temp)
             }°C</div>
             <p> ${data.weather[0].main}</p>
               
`
weather2.innerHTML=`
     <div class="weather-item" id="weather-item">
            <div>humidity</div>
            <div style="color: black;">${data.main.humidity}%</div>
     </div>
     <div class="weather-item" id="weather-item">
            <div>Pressure</div>
            <div style="color: black;">${data.main.pressure}mbar</div>
     </div>
     <div class="weather-item" id="weather-item">
            <div>Wind Speed</div>
            <div style="color: black;">${Math.round((data.wind.speed)*3.6) +"km/hr"}</div>
    </div>
`
weather3.innerHTML= ` 
            <div class="sunrise">
                    <div style="font-weight:600" >sunrise</div>
                    <div style="color: black;">${(new Date((data.sys.sunrise)*1000)).getHours()+":"+(String((new Date((data.sys.sunrise)*1000)).getMinutes()).padStart(2, '0'))+" am"}</div>
              </div>
            <div class="sunset">
                    <div style="font-weight:600">sunset</div>
                    <div style="color: black;">${(new Date((data.sys.sunrise)*1000)).getHours()+":"+(String((new Date((data.sys.sunset)*1000)).getMinutes()).padStart(2, '0'))+" pm"}</div>
             </div>`
}

document.getElementById("click").addEventListener(
    "click",
    function (event) {
        getWeather(search.value)// normally form will reload after submit so 
        event.preventDefault(); // this stop the reload

    }
)


