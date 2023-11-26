
var contatos = [];
var flag = 0;
var propostas = [];
var qtdpropostas;
var detalhes;

//----------------------------------------------------------------------------------------------------------------------------------------------------------
            /*CARREGAR BANCO DE DADOS SALVO NO LOCALSTORAGE*/
    

document.addEventListener('DOMContentLoaded', function () {
    var contatosSalvos = localStorage.getItem('contatos');
    var propostasSalvas = localStorage.getItem('propostas');

    if (contatosSalvos) {
        contatos = JSON.parse(contatosSalvos);
        renderContatos();
    }

    if (propostasSalvas) {
        propostas = JSON.parse(propostasSalvas);
        renderPropostas();
    }

    // Renderizar os contatos na tela
    function renderContatos() {
        var lista = document.getElementById("lista");

        contatos.forEach(function (contato) {
            var contatoNaLista = document.createElement("li");
            contatoNaLista.setAttribute('id', `contato${contatos.indexOf(contato) + 1}`);
            var nomeDoContato = document.createTextNode(contato.nome);
            contatoNaLista.appendChild(nomeDoContato);

            var detalhes = document.createElement('div');
            detalhes.classList.add("info");
            detalhes.setAttribute('id', `detalhe${contatos.indexOf(contato) + 1}`);
            detalhes.style.display = 'none';
            detalhes.innerHTML = `<p>Nome: ${contato.nome}</p> <p>Endereço: ${contato.endereco}</p> <p>Telefone: ${contato.telefone}</p> <p>E-mail: ${contato.email}</p> <button id="btneditar">Editar Contato</button> <button id="btnexcluir${contato.numero}">Excluir Contato</button> <button id="btnproposta${contato.numero}">Nova Proposta</button> <button id="btnmostrar">Propostas</button>`;

            lista.appendChild(contatoNaLista);
            contatoNaLista.parentNode.insertBefore(detalhes, contatoNaLista.nextSibling);
        });
    }

    // Renderizar as propostas
    function renderPropostas() {
        for (let i = 1; i <= contatos.length; i++) {
            var detalhes = document.getElementById(`detalhe${i}`);
            var textoProposta = document.createElement("table");
            textoProposta.innerHTML = `<tr> <th>Num</th> <th>Data</th> <th>Valor</th> <th>Status</th></tr>`;
            
            propostas.forEach(function (proposta) {
                if (proposta.nomeContato === contatos[i - 1].nome) {
                    textoProposta.innerHTML += `<tr> <td>${proposta.num}</td> <td>${proposta.data}</td> <td>${proposta.valor}</td> <td>${proposta.status}</td> <td><button id="excluir${proposta.num}">Excluir</button></td> </tr>`;
                }
            });
    
            detalhes.appendChild(textoProposta);
        }
    }
    

});

   
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('click', function(e){
    const el = e.target;

    //Cria novo Contato
    if(el.classList.contains('criarcontato')){ 

        var nome = prompt('Digte o nome');
        var endereco = prompt('Digite o endereco');
        var telefone = prompt('Digite o telefone');
        var email = prompt("Digite o email");


        //Verifica se não há campos vazios
        if(nome === "" || endereco === "" || telefone === "" || email === ""){
            alert('Valor invalido. Por favor, insira um valor valido')
        }
        else {
            //salva em um objeto
            var novoContato = {
                numero: contatos.length + 1,
                nome: nome,
                endereco: endereco,
                telefone: telefone,
                email: email 
            }
            //Salva o objeto no vetor contatos
            contatos.push(novoContato);

            //LocalStorage
            salvarLocalStorage();
            
            var contatoNaLista = document.createElement("li");  
            contatoNaLista.setAttribute('id', `contato${contatos.length}`) //Adicionar um id para poder utilizar depois 
            var nomeDoContato = document.createTextNode(novoContato.nome);
            contatoNaLista.appendChild(nomeDoContato);
            
            detalhes = document.createElement('div');
            detalhes.classList.add("info");
            detalhes.setAttribute('id', `detalhe${contatos.length}`);
            detalhes.style.display = 'none';
            detalhes.innerHTML = `<p>Nome: ${novoContato.nome}</p> <p>Endereço: ${novoContato.endereco}</p> <p>Telefone: ${novoContato.telefone}</p> <p>E-mail: ${novoContato.email}</p> <button id="btneditar">Editar Contato</button> <button id="btnexcluir${novoContato.numero}">Excluir Contato</button> <button id="btnproposta${novoContato.numero}">Nova Proposta</button> <button id="btnmostrar">Propostas</button>`;

            document.getElementById("lista").appendChild(contatoNaLista); //Adiciona o cliente à lista
            contatoNaLista.parentNode.insertBefore(detalhes, contatoNaLista.nextSibling); //Adiciona os detalhes após o novo cliente

            renderContatos();
        }
        

    }

   function encontrarPropostasPorNome(nomeContato) {
    var propostasAssociadas = [];
    for (var j = 0; j < propostas.length; j++) {
        if (propostas[j].nomeContato === nomeContato) {
            propostasAssociadas.push(propostas[j]);
        }
    }
    return propostasAssociadas;
   }

   for(let i = 1; i <= contatos.length; i++) {

        //Adicionar Proposta
        if (el.getAttribute('id') === `btnproposta${i}`) {
            detalhes = document.getElementById(`detalhe${i}`); 
            qtdpropostas = propostas.length;

            var nomeContato = contatos[i - 1].nome

            var novaProposta = {
                nomeContato: nomeContato,
                num: propostas.length + 1,
                data: prompt("Digite a data de hoje"),
                valor: prompt("Digite o valor da proposta"),
                status: 'ativa'
            }
            
            // LocalStorage
            if(novaProposta.data === '' || novaProposta.valor === '') {
                alert('Valor invalido. Por favor, insira um valor valido')
            } else{
                propostas.push(novaProposta);
                salvarLocalStorage();
                
    
                var novaLinha = document.createElement("p");
                novaLinha.innerHTML = `Num: ${novaProposta.num}; Data: ${novaProposta.data}; Valor: ${novaProposta.valor}; Status: ${novaProposta.status}`
                detalhes.appendChild(novaLinha);
    
                renderPropostas();
            }
        
        }

    if(el.getAttribute('id') === `btnexcluir${i}`) {
        var confirmar = prompt("Tem certeza que deseja excluir este contato?");
        if(confirmar && (confirmar.toLowerCase() === "sim" || confirmar.toLowerCase() === "s")) {
            
           var propostasAssociadas = encontrarPropostasPorNome(contatos[i - 1].nome);

            //Verifica se existem propostas para esse contato
            if(propostasAssociadas.length > 0) {
                //Remove as propostas
                propostasAssociadas.forEach(function (proposta) {
                    var indiceProposta = propostas.indexOf(proposta);
                    if(indiceProposta !== -1) {
                        propostas.splice(indiceProposta, 1);
                    }
                });
                salvarLocalStorage();
                console.log("Propostas removidas com sucesso");
            }

            // Remover o contato
            contatos.splice((i -1), 1);

            salvarLocalStorage();

            var contatoExcluido = document.getElementById(`contato${i}`);
            contatoExcluido.innerHTML = '';
            
            var detalheExcluido = document.getElementById(`detalhe${i}`);
            detalheExcluido.innerHTML = '';
        }
       }
   }

    /*  if(el.getAttribute('id') === "btnproposta") */


    //Ligar e Desligar exibição dos detalhes
    for(let i = 1; i <= contatos.length; i++) {             
        let detalheAtual = document.getElementById(`detalhe${i}`)

        if(el.getAttribute('id') === `contato${i}`){  
            if(flag === 0) {
                flag = 1;
                detalheAtual.style.display = "block";
            } else {
                flag = 0;
                detalheAtual.style.display = "none";
            }

        }
    }

    //Função do LocalStorage
    function salvarLocalStorage() {
        localStorage.setItem('contatos', JSON.stringify(contatos));
        localStorage.setItem('propostas', JSON.stringify(propostas));
    }
})


//Verificar se existe algo salvo

