import { createLogin,createModTable,createNavigator,createTable, createMap } from "./components.js";
import { download,upload,hide,show, validateLogin } from "./functions.js";

const navigationButtons = document.getElementsByClassName("navigationButton");
const buttonInviaLogin = document.getElementById("button-login-invia")

/*
upload({data:[["Nome A","Luogo A"],["Nome B", "Luogo B"]],places:[
    {
       name: "Piazza del Duomo",
       coords: [45.4639102, 9.1906426]
    },
    {
       name: "Darsena",
       coords: [45.4536286, 9.1755852]
    },
    {
       name: "Parco Lambro",
       coords: [45.4968296, 9.2505173]
    },
    {
       name: "Stazione Centrale",
       coords: [45.48760768, 9.2038215]
    }
 ]}).then(console.log);

 */

createNavigator();

fetch("./conf.json").then(r => r.json()).then((confData) => {

    const cacheToken = confData.cacheToken;

    const login = createLogin(document.getElementById("login-form"));
    login.setData(confData.loginFormData);

    const modTable = createModTable(document.getElementById("amministrazione-tabella"));

    const table = createTable(document.getElementById("home-table"));
    table.configHeader(confData.tableHeaderData);

    const map = createMap();

    download(cacheToken).then((newData) => {
        map.setPlaces(newData.places);
        map.render()

        modTable.setData(newData)
        table.setData(newData.data)
        table.render();
    })

    buttonInviaLogin.onclick = () => {
        fetch("./conf.json").then(r => r.json()).then((confData) => {
            let loginData = [];
            confData.loginFormData.forEach((element) => {
                loginData.push(document.getElementById(element[0]).value);
            });
            validateLogin(loginData[0],loginData[1]).then(authLogin,console.log)
        })
    }
})








