var cep = document.querySelector("#cep");
var card = document.querySelector(".cardCep");
var cardError = document.querySelector(".card__erro");
var obj = {};

const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

cep.addEventListener('keypress', (e) => {
    const key = e.key;
    if (key === "Enter") {
        request();
    }
});

function request() {
    card.innerHTML = ''
    cardError.style.display = 'none'
    let search = cep.value.replace("-", "");

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then(res => {
            res.json()

                .then(conteudo => {
                    obj = conteudo
                    if (obj.erro != true) {
                        cartao = `
                   <div class="card">
                       <div class="title">
                           <h1>${obj.localidade}</h1>  
                       </div>
                       <div class="info-card">
                           <span class="bairro"><i class="fas fa-map-marker-alt"></i> ${obj.bairro}</span>
                           <span class="logradouro"><i class="fas fa-road"></i> ${obj.logradouro}</span>
                           <span class="uf"><i class="fas fa-globe-americas"></i> ${obj.uf}</span>
                       </div>
                       <div class="info-card2">
                           <span class="ddd"><i class="fas fa-phone"></i> ${obj.ddd}</span>
                           <span class="moradores"><i class="fas fa-user-friends"></i> ${obj.ibge}</span>
                           <span class="cep"><i class="fas fa-map-marked-alt"></i> ${obj.cep}</span>
                       </div>
                   </div>
                   `
                        card.insertAdjacentHTML("beforeend", cartao)
                    }else{
                        erro(search);
                    }
                })

        })
        .catch(e => {
            console.log(e)
            erro(search);
        })

}

const erro = (e) =>{
    let span = document.createElement('span');
    span.innerText = `Ops, não encontramos essa localização ${e} \n`
    cardError.appendChild(span);
    cardError.style.display = 'block';
}



