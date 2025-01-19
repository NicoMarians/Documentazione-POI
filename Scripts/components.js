import {hide,show } from "./functions.js";

export const createLogin = (domElement) => {
    let formData;
    let bindingElement = domElement;
    let isLogged = false;
    return {
        render: () => {
            template = ``;
            formData.map((element) => {
                template += `<div class="d-flex justify-content-center align-items-center">`;
                template += `<input id="input-login-${element[0]}" type="${element[1]}" placeholder="${element[1]}"`;
                template += `</div>`;
            });
            template += `<div class="d-flex justify-content-center">`;
            template += `<button type="button" id="button-login-invia" >Invia</button>`;
            template += `</div>`;

            bindingElement.innerHTML = template;
        },
        setData: (newData) => {
            formData = newData;
        },
        authLogin: () => {
            isLogged = true;
        },
        checkLogin: () => {
            return isLogged;
        }
    }
}

export const createModTable = (domElement) => {
    let bindingElement = domElement;
    let tableData;
    return {

        render: () => {
            template = `<div class="row" >`;
            tableData.map((element,index) => {
                template += `<div class="col-10 d-flex flex-column" style="padding-right: 0%;">`;
                template += `<input type="text" id="modTable-element-${index}" placeholder="${element}" readonly>`;
                template += `</div>`;
                template += `<div class="col-1 d-flex flex-column" style="padding-left: 0%; padding-right: 0%;">`;
                template += `<button id="button-modifica-${index}" type="button">Mod</button>`;
                template += `</div>`;  
                template += `<div class="col-1 d-flex flex-column" style="padding-left: 0%;">`;
                template += `<button type="button" style="background-color: red;">X</button>`;
                template += `</div>`;
            })
            template += `</div>`;

            bindingElement.innerHTML = template;

        },
        setData: (newData) => {
            tableData = newData;
        },
        addLocation: (location) => {
            tableData.push(location);
        }
    }
}

export const createNavigator = () => {
    const pages = Array.from(document.querySelectorAll(".page"));
    return{
        render : (newPage) => {
        const url = new URL(document.location.href);
        const pageName = url.hash.replace("#", `#${newPage}`);
        const selected = pages.filter((page) => page.id === pageName)[0] || pages[0];
    
        hide(pages);
        show(selected);
        }
    } 
 }

export const createTable = (domElement) => {
    let bindingElement = domElement;
    let tableHeader;
    let tableData;
    return{
        configHeader: (newElement) => {
            tableHeader = newElement;
        },
        render: () => {

            console.log(tableData)
            let line = "<table class=table> <tr>";
            line += tableHeader.map((element) => {
                return `<td> ${element} </td>`
            })
            line += `</tr>`
            line += tableData.map((element) => {
                return `<tr>` + element.map((e) => `<td>${e}</td>`).join("") + `</tr>`}).join("");
            line += "</table>";
            console.log(line);
            bindingElement.innerHTML = line; 
        
        },
        setData: (newData) => {
            tableData = newData;
        }
    }
}

export const createMap = () => {
    let places;
    return {
        render: () => {
            let zoom = 12;
            let maxZoom = 19;
            let map = L.map('home-mappa').setView(places[0].coords, zoom);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: maxZoom,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            places.forEach((place) => {
            const marker = L.marker(place.coords).addTo(map);
            marker.bindPopup(`<b>${place.name}</b>`);
            });
        },
        setPlaces: (newPlaces) => {
            places = newPlaces;
        }
    }
}