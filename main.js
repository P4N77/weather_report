const resultadopais = document.querySelector('.resultado');
const formulario = document.querySelector('.obtener_clima');
const ciudad = document.querySelector('#ciudad');


formulario.addEventListener('submit', (parametro) => {
    parametro.preventDefault();
    if (ciudad.value==="") {
        alert("no a ingresado una ciudad")
    }else
    buscarCiudadPais(ciudad.value);
})

function buscarCiudadPais(ciudad){
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiId}`;
    //http://api.openweathermap.org/data/2.5/weather?q=bogota&appid=41d1d7f5c2475b3a16167b30bc4f265c

    fetch(url)
        .then(datos => {
            return datos.json();
        })
        .then(datosJ => {
            if (datosJ.cod === '404') {
                alert("no se encontro la ciudad")
            } else {
                limpiar();
                mostrarClima(datosJ);
            }

        })
        .catch(error => {
            console.log(error);
        })
}

function mostrarClima(e){
    const {name, main:{temp}, weather:[arr],main:{humidity},weather:[icon]} = e;
    const degrees = kelvinToCentigrade(temp);
    let color= icon.value
    var cambiarcontenedor=document.getElementById("contenedor")

    const content = document.createElement('div');
    content.innerHTML = `
        <h2 class="clima">Clima en ${name}</h2>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2 class="clima">${degrees}°C</h2>
        <h2 class="humedad">Humedad: ${humidity}%</h2>

    `;

    resultadopais.appendChild(content);
}


function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function limpiar(){
    resultadopais.innerHTML = '';
}
