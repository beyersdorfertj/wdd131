document.querySelector("#currentyear").innerHTML = new Date().getFullYear();
document.querySelector("#lastModified").innerHTML = "Last Modification: " + document.lastModified;

function calculateWindChill(temperature, windSpeed) {
    return 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
}

let temperature = 15;
let windSpeed = 5;

document.querySelector("#temperature").innerText = `${temperature}°C`;
document.querySelector("#windSpeed").innerText = `${windSpeed} km/h`;
let windchill = temperature <= 10 && windSpeed > 4.8 ? calculateWindChill(temperature, windSpeed) : "N/A";

document.querySelector("#windChill").innerText = windchill;
