import {download,upload,hide,show,validateLogin } from "./functions.js";

export const createLogin = (domElement) => {
    let formData;
    let bindingElement = domElement;
    let isLogged = false;
    return {
        render: () => {
            let template = ``;
            formData.map((element) => {
                template += `<div class="d-flex justify-content-center align-items-center">`;
                template += `<input id="input-login-${element[0]}" type="${element[1]}" placeholder="${element[0]}">`;
                template += `</div>`;
            });
            template += `<div class="d-flex justify-content-center">`;
            template += `<button type="button" id="button-login-invia" >Invia</button>`;
            template += `</div>`;

            bindingElement.innerHTML = template;

            document.getElementById("button-login-invia").onclick = () => {
                fetch("./conf.json").then(r => r.json()).then((confData) => {
                    let loginData = [];
                    confData.loginFormData.forEach((element) => {
                        loginData.push(document.getElementById(`input-login-${element[0]}`).value);
                    });
                    validateLogin(loginData[0],loginData[1],confData.cacheToken).then((result) => {
                        if (result){
                            isLogged = true; 
                            console.log("OK");
                            hide([document.getElementById("aLogin")]);
                            show(document.getElementById("aAdmin"));

                            const url = new URL(document.location.href);
                            document.location.href = url.origin + "#amministrazione";
                        } else {
                            console.log("NO")
                        }       
                    });
                })
            }
        },
        setData: (newData) => {
            formData = newData;
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
            let template = `<div class="row" >`;
            try{
                tableData.forEach((element,index) => {
                    template += `<div class="col-10 d-flex flex-column" style="padding-right: 0%;">`;
                    template += `<input type="text" id="modTable-element-${index}" placeholder="${element.nome}" readonly>`;
                    template += `</div>`;
                    template += `<div class="col-1 d-flex flex-column" style="padding-left: 0%; padding-right: 0%;">`;
                    template += `<a href="#modifica" ><button id="button-modifica-${index}" type="button" class="buttonModifica" >Mod</button> </a>`;
                    template += `</div>`;  
                    template += `<div class="col-1 d-flex flex-column" style="padding-left: 0%;">`;
                    template += `<a href="#amministrazione" ><button id="button-elimina-${index}" type="button" style="background-color: red;">X</button> </a>`;
                    template += `</div>`;
                })
            }
            catch {
                console.log(error);
            }

            template += `<div class="col-10 d-flex flex-column" style="padding-right: 0%;">`;
            template += `Aggiungi Luogo`;
            template += `</div>`
            template += `<div class="col-1 d-flex flex-column" style="padding-left: 0%;">`;
            template += `<a href="#modifica" ><button id="button-aggiungi-modTable" type="button" style="background-color: green;">+</button> </a>`;
            template += `</div>`

            template += `</div>`;
            bindingElement.innerHTML = template;

            tableData.forEach((element,index) => {
                document.getElementById(`button-modifica-${index}`).onclick = () => {
                    let line = `<img src="${element.immagine}" alt="error">`
                    document.getElementById("modifica-foto").innerHTML = line;
                    document.getElementById("input-nome-modifica").value = element.nome;
                    document.getElementById("input-nome-modifica").readonly = "readonly";
                    document.getElementById("input-descrizione-modifica").value = element.descrizione;
                    document.getElementById("input-foto-modifica").value = element.immagine;
                    document.getElementById("input-lat-modifica").value = element.coords[0];
                    document.getElementById("input-lon-modifica").value = element.coords[1];
                }
                    
            });
            
            tableData.forEach((element,index) => {
                document.getElementById(`button-elimina-${index}`).onclick = () => {
                    console.log(tableData);
                    tableData.splice(index,1);
                    console.log(tableData);
                    fetch("./conf.json").then(r => r.json()).then((confData) => {
                        upload(tableData,confData.cacheToken).then(() => {
                            download(confData.cacheToken).then((newData) => {
                                tableData = newData;
                                console.log(tableData);
                                pubSub.publish("renderModTable");
                            })
                        });
                    })
                }      
            });

            document.getElementById("button-aggiungi-modTable").onlick = () => {
                console.log("A")
                document.getElementById("input-nome-modifica").value = "";
                document.getElementById("input-descrizione-modifica").value = "";
                document.getElementById("input-foto-modifica").value = "";
                document.getElementById("input-lat-modifica").value = "";
                document.getElementById("input-lon-modifica").value = "";
            }

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
    
    const render = () => {
       const url = new URL(document.location.href);
       const pageName = url.hash.replace("#", "");
       const selected = pages.filter((page) => page.id === (pageName))[0] || pages[0];
 
        if (selected.id == amministrazione){
            
        }

       hide(pages);
       show(selected);
    }
    window.addEventListener('popstate',render); 
    render();   
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

            let line ="";
            line +=  `<table class="table"> <tr>`;
            line += tableHeader.map((element) => {
                return `<td> ${element} </td>`;
            })
            line += `</tr>`
            line += tableData.map((element,index) => {
                return `<tr> <td> <a href="#descrizione" id="home-element-${index}"> ${element.nome} </a> </td><td>Lat: ${element.coords[0]},Lon: ${element.coords[1]}</td> </tr>`}).join("");
            line += `</table>`;
            bindingElement.innerHTML = line; 

            tableData.forEach((element,index) => {
                console.log(element);
                document.getElementById(`home-element-${index}`).onclick = () => {
                    document.getElementById("descrizione-foto").innerHTML = `<img src="${element.immagine}" alt="error">`;
                    document.getElementById("descrizione-descrizione").innerHTML = element.descrizione;
                }
            });
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
            let map = L.map('home-mappa').setView([51.5072,0.1276], zoom);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: maxZoom,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            places.forEach((place) => {
            const marker = L.marker(place.coords).addTo(map);
            marker.bindPopup(`<b>${place.nome}</b>`);
            });
        },
        setPlaces: (newPlaces) => {
            places = newPlaces;
        }
    }
}

export const createPubSub = () => {
    const dict = {};
    return {
        subscribe: (eventName, callback) => {
            if (!dict[eventName]) {
                dict[eventName] = [];
            }
            dict[eventName].push(callback);
        },
        publish: (eventName) => {
            dict[eventName].forEach((callback) => callback());
        }
    }
}

export const pubSub = createPubSub();

export const createdesc = (domElement) => {
    let bindingElement = domElement;
    let tableHeader;
    let tableData;
    return{
        configHeader: (newElement) => {
            tableHeader = newElement;
        },
        render: () => {

            let line = "<table class=table> <tr>";
            line += tableHeader.map((element) => {
                return `<td> ${element} </td>`
            })
            line += `</tr>`
            line += tableData.map((element) => {
                return `<tr> <td>${element.descrizione}</tr>`}).join("");
            line += "</table>";
            bindingElement.innerHTML = line; 
        },
        setData: (newData) => {
            tableData = newData;
        }
    }
}

export const createimg = (domElement) => {
    let bindingElement = domElement;
    let tableHeader;
    let tableData;
    return{
        configHeader: (newElement) => {
            tableHeader = newElement;
        },
        render: () => {

            let line = "<table class=table> <tr>";
            line += tableHeader.map((element) => {
                return `<td> ${element} </td>`
            })
            line += `</tr>`
            line += tableData.map((element) => {
                return `<tr> <td>${element.immagine}</tr>`}).join("");
            line += "</table>";
            bindingElement.innerHTML = line; 
        },
        setData: (newData) => {
            tableData = newData;
        }
    }
}