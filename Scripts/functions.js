const create_table = () => {
    let binding_element;
    let table_header; 
    return{
        bind_element: (new_element) => {
            binding_element = new_element;
        },
        config_header: (new_element) => {
            table_header = new_element;
        },
        render: () => {
            let line = "<table class=table>";
            line += table_data.map((place) => {
                return `<tr><td>${place.nome}</td><td>${place.luogo}</td></tr>`;
            }).join("");
            line += "</table>";
            binding_element.innerHTML = line; 
        
        }
    }
}