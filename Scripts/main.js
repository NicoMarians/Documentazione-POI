import { createLogin,createModTable,createNavigator,createTable, createMap } from "./components.js";
import { download,upload,hide,show, validateLogin } from "./functions.js";

const bottoniHome = document.getElementsByClassName("bottoneHome");
const bottoniAmministrazione = document.getElementsByClassName("bottoneAmministrazione");
const buttonInviaLogin = document.getElementById("button-login-invia")

const url = new URL(document.location.href);
document.location.href = url.origin + "#home";

//data = [{nome:nomeLuogo,coords:[lat,lon],"descrizione:descrizioneLuogo",immagine:img1]}]

let data;

createNavigator();

fetch("./conf.json").then(r => r.json()).then((confData) => {

    const cacheToken = confData.cacheToken;

    //upload([{nome:"nomeLuogo",coords:[10,10],descrizione:"descrizioneLuogo",immagine:"img1"}],cacheToken).then(console.log);
    //upload([],cacheToken).then(console.log);

    //const pubSub = createPubSub();

    const login = createLogin(document.getElementById("login-form"));
    login.setData(confData.loginFormData);
    login.render()

    const modTable = createModTable(document.getElementById("amministrazione-tabella"));

    const table = createTable(document.getElementById("home-table"));
    table.configHeader(confData.tableHeaderData);

    const map = createMap();

    download(cacheToken).then((newData) => {
        map.setPlaces(newData);
        map.render()

        modTable.setData(newData)
        modTable.render();

        table.setData(newData)
        table.render();

        data = newData;
    })

/////////////////////////////////////////////////////////////////////

    document.getElementById("invia-modifica").onclick = () => {
        let nome = document.getElementById("input-nome-modifica").value;
        let descrizione = document.getElementById("input-descrizione-modifica").value;
        let foto = document.getElementById("input-foto-modifica").value
        let lat = document.getElementById("input-lat-modifica").value
        let lon = document.getElementById("input-lon-modifica").value
        
        fetch("./conf.json").then(r => r.json()).then((confData) => {
    
            download(confData.cacheToken).then((newData) => {
                let newObject = {nome:nome,coords:[lat,lon],descrizione:descrizione,immagine:foto};
                data = newData;
                data.push(newObject);
                upload(data,confData.cacheToken).then(console.log);
                table.setData(data);
                map.setPlaces(data);
                modTable.setData(data);
                modTable.render();
                table.render();
                map.render()
            });
        });
    
    }

});

