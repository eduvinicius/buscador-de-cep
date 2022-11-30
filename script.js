let form = document.getElementById("form");

const handleSubmit = (e) => {
    e.preventDefault()

    let cep = document.getElementById("input").value;
    
    try {
        let url = `https://cep.awesomeapi.com.br/json/${cep}`
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 400 || data.status === 404) {
                errorMessage(data)
                addressInformation();
                resetForm()
            } else {
                addressInformation(data);
                errorMessage()
                resetForm()
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

const addressInformation = (data) => {
    let address = document.querySelector(".address");
    let district = document.querySelector(".district");
    let city = document.querySelector(".city");
    let state = document.querySelector(".state");
    let cep = document.querySelector(".cep");

    if (data) {
        address.innerHTML = `Endereço: ${data.address}`;
        district.innerHTML = `Bairro: ${data.district}`;
        city.innerHTML = `Cidade: ${data.city}`;
        state.innerHTML = `Estado: ${data.state}`;
        cep.innerHTML = `CEP: ${data.cep}`;
    } else {
        address.innerHTML = ``;
        district.innerHTML = ``;
        city.innerHTML = ``;
        state.innerHTML = ``;
        cep.innerHTML = ``;
    }

};

const errorMessage = (message) => {
    let error = document.querySelector(".error-message");

    message ? error.innerHTML = message.message : error.innerHTML = ""
}

const resetForm = () => {
    let form = document.getElementById("form").reset();
}

form.addEventListener('submit', handleSubmit)