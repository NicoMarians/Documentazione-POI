export function upload(valore) {
    console.log("Upload",valore)
    return new Promise((resolve,reject) => {
        try{
            fetch("https://ws.cipiaceinfo.it/cache/set", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    key: '4095a663-3e69-4699-94e7-225f722690bc',
                },
                body: JSON.stringify({
                    key: 'progetto-POI',
                    value: valore,  
                }),
            }).then((response) => response.json())
            .then((data) => resolve(data.r));
        } catch {
            reject();
        }
    });
  }
  
  export function download() {
    return new Promise((resolve,reject) => {
        try{
            fetch("https://ws.cipiaceinfo.it/cache/get", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    key: '4095a663-3e69-4699-94e7-225f722690bc',
                },
                body: JSON.stringify({
                    key: 'progetto-POI',
                }),
            }).then((r) => r.json()).
            then((r) => resolve(r.result));
        } catch {
            reject()
        }
    });     
  }

  export const hide = (elements) => {
    elements.forEach((element) => {
        element.classList.add("hidden");
        element.classList.remove("visible");
    });
 }

  export const show = (element) => {
    element.classList.add("visible");
    element.classList.remove("hidden");
  }

  export const validateLogin = (username,password) => {
    return new Promise((resolve, reject) => {
        fetch("http://ws.cipiaceinfo.it/credential/login", { 
        method: "POST",
        headers: {
            "content-type": "application/json",
            "key": myToken
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
        })
        .then(r => r.json())
        .then(r => {
            resolve(r.result); 
        })
        .catch(reject);
    })
  }