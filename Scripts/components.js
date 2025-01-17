const createLogin = (domElement) => {
    let formData;
    let bindingElement = domElement;
    let isLogged = false;
    return {
        render: () => {
            template = ``;
            formData.map((element) => {
                template += `<div class="d-flex justify-content-center align-items-center">`;
                template += `<input id="input-login-${element[1]}" type="${element[0]}" placeholder="${element[1]}"`;
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
        }
    }
}

const createModTable = (header,domElement) => {
    let tableHeader;
    let bindingElement = domElement;
    let tableData;
    return {

        render: () => {
            template = `<div class="row" >`;
            tableData.map((element,index) => {
                template += `<div class="col-10 d-flex flex-column" style="padding-right: 0%;">`;
                template += `<input type="text" id="modTable-element-${index}" placeholder="${element}">`;
                template += `</div>`;
                template += `<div class="col-1 d-flex flex-column" style="padding-left: 0%; padding-right: 0%;">`;
                template += `<button id="button-modifica-${index}" type="button">Mod</button>`;
                template += `</div>`;        
            })

            template += `</div>`;

        },
        setData: (newData) => {
            tableData = newData;
        },
        addLocation: (location) => {
            tableData.push(location);
        }
    }
}

const createNavigator = (bindingElement) => {
    const pages = Array.from(bindingElement.querySelectorAll(".page"));
    
    const render = () => {
       const url = new URL(document.location.href);
       const pageName = url.hash.replace("#", "");
       const selected = pages.filter((page) => page.id === pageName)[0] || pages[0];
 
       hide(pages);
       show(selected);
    }
    window.addEventListener('popstate', render); 
    render();   
 }