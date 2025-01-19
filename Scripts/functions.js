export function upload(valore,token) {
    console.log("Upload",valore)
    return new Promise((resolve,reject) => {
        try{
            fetch("https://ws.cipiaceinfo.it/cache/set", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    key: token,
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
  
  export function download(token) {
    return new Promise((resolve,reject) => {
        try{
            fetch("https://ws.cipiaceinfo.it/cache/get", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    key: token,
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

  export const validateLogin = (username,password,token) => {
    return new Promise((resolve, reject) => {
        fetch("http://ws.cipiaceinfo.it/credential/login", { 
        method: "POST",
        headers: {
            "content-type": "application/json",
            "key": token
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