var flag = 0;
var propostas = [];

//----------------------------------------------------------------------------------------------------------------------------------------------------------
/*CARREGAR BANCO DE DADOS SALVO NO LOCALSTORAGE*/

document.addEventListener("DOMContentLoaded", function () {
  var propostasSalvas = localStorage.getItem("propostas");

  if (propostasSalvas) {
    propostas = JSON.parse(propostasSalvas);
    carregarPropostas();
  }

  function carregarPropostas() {
    var tabelafechadas = document.getElementById('tfechadas');
    var tabelaativas = document.getElementById('tativas');
    var tabelaexpiradas = document.getElementById('texpiradas');

    propostas.forEach(function(proposta){
        if(proposta.status === 'Ativa'){
            tabelaativas.innerHTML += `<tr> <td>${proposta.num}</td> <td>${proposta.nomeContato}</td> <td>${proposta.data}</td> <td>${proposta.valor}</td> </tr>`
        }
        else if(proposta.status === 'Fechada'){
            tabelafechadas.innerHTML += `<tr> <td>${proposta.num}</td> <td>${proposta.nomeContato}</td> <td>${proposta.data}</td> <td>${proposta.valor}</td> </tr>`
        }
        else if(proposta.status === 'Expirada'){
            tabelaexpiradas.innerHTML += `<tr> <td>${proposta.num}</td> <td>${proposta.nomeContato}</td> <td>${proposta.data}</td> <td>${proposta.valor}</td> </tr>`
        }
    })
  }
})

document.addEventListener('click', function(e) {
    const el = e.target;
    
    if(el.classList.contains('b1')) {
        let tabela1 = this.getElementById("tfechadas")
        
        if(flag === 0) {
            tabela1.style.display = "block"; 
            flag = 1;
        } else if(flag === 1) {
            tabela1.style.display = "none";
            flag = 0;
        }
    }
    if(el.classList.contains('b2')){
        let tabela2 = this.getElementById("tativas");
        
        if(flag === 0) {
            tabela2.style.display = "block"; 
            flag = 1;
        } else {
            tabela2.style.display = "none";
            flag = 0;
        }
    }
    if(el.classList.contains('b3')){
        let tabela3 = this.getElementById("texpiradas");
        
        if(flag === 0) {
            tabela3.style.display = "block"; 
            flag = 1;
        } else {
            tabela3.style.display = "none";
            flag = 0;
        }
    }
})