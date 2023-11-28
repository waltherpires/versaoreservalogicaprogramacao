var contatos = [];
var flag = 0;
var propostas = [];
var qtdpropostas;
var detalhes;

var dataAtual = new Date();

var anoAtual = dataAtual.getFullYear();
var mesAtual = dataAtual.getMonth() + 1;
var diaAtual = dataAtual.getDate();

//----------------------------------------------------------------------------------------------------------------------------------------------------------
/*CARREGAR BANCO DE DADOS SALVO NO LOCALSTORAGE*/

document.addEventListener("DOMContentLoaded", function () {
  var contatosSalvos = localStorage.getItem("contatos");
  var propostasSalvas = localStorage.getItem("propostas");

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
      contatoNaLista.setAttribute(
        "id",
        `contato${contatos.indexOf(contato) + 1}`
      );
      var nomeDoContato = document.createTextNode(contato.nome);
      contatoNaLista.appendChild(nomeDoContato);

      var detalhes = document.createElement("div");
      detalhes.classList.add("info");
      detalhes.setAttribute("id", `detalhe${contatos.indexOf(contato) + 1}`);
      detalhes.style.display = "none";
      detalhes.innerHTML = `<p>Nome: ${contato.nome}</p> <p>Endereço: ${contato.endereco}</p> <p>Telefone: ${contato.telefone}</p> <p>E-mail: ${contato.email}</p> <button id="btneditar${contato.numero}">Editar Contato</button> <button id="btnexcluir${contato.numero}">Excluir Contato</button> <button id="btnproposta${contato.numero}">Nova Proposta</button>`;

      lista.appendChild(contatoNaLista);
      contatoNaLista.parentNode.insertBefore(
        detalhes,
        contatoNaLista.nextSibling
      );
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
          [dia, mes, ano] = proposta.data.split("/");
          dia = Number(dia);
          mes = Number(mes);
          ano = Number(ano);

          //Verificar status da proposta
          if (anoAtual > ano) {
            proposta.status = "Expirada";
          } else if (mesAtual > mes) {
            proposta.status = "Expirada";
          } else if (diaAtual > dia + 6) {
            proposta.status = "Expirada";
          } 
            
          textoProposta.innerHTML += `<tr> <td>${proposta.num}</td> <td>${proposta.data}</td> <td>R$ ${proposta.valor}</td> <td>${proposta.status}</td> <td><button id="btnfechar${proposta.num}">Fechar</button></td> </tr>`;
        }
      });

      detalhes.appendChild(textoProposta);
    }
  }
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("click", function (e) {
  const el = e.target;

  //Cria novo Contato
  if (el.classList.contains("criarcontato")) {
    var nome = prompt("Digte o nome");
    var endereco = prompt("Digite o endereco");
    var telefone = prompt("Digite o telefone");
    var email = prompt("Digite o email");

    if (
      nome === ("" || null) ||
      endereco === ("" || null) ||
      telefone === ("" || null) ||
      email === ("" || null)
    ) {
      alert("Valor invalido. Por favor, insira um valor valido");
    } else {
      var novoContato = {
        numero: contatos.length + 1,
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        email: email,
      };
      //Salva o objeto no vetor contatos
      contatos.push(novoContato);

      //LocalStorage
      salvarLocalStorage();

      var contatoNaLista = document.createElement("li");
      contatoNaLista.setAttribute("id", `contato${contatos.length}`); //Adicionar um id para poder utilizar depois
      var nomeDoContato = document.createTextNode(novoContato.nome);
      contatoNaLista.appendChild(nomeDoContato);

      detalhes = document.createElement("div");
      detalhes.classList.add("info");
      detalhes.setAttribute("id", `detalhe${contatos.length}`);
      detalhes.style.display = "none";
      detalhes.innerHTML = `<p>Nome: ${novoContato.nome}</p> <p>Endereço: ${novoContato.endereco}</p> <p>Telefone: ${novoContato.telefone}</p> <p>E-mail: ${novoContato.email}</p> <button id="btneditar">Editar Contato</button> <button id="btnexcluir${novoContato.numero}">Excluir Contato</button> <button id="btnproposta${novoContato.numero}">Nova Proposta</button>`;

      document.getElementById("lista").appendChild(contatoNaLista); //Adiciona o cliente à lista
      contatoNaLista.parentNode.insertBefore(
        detalhes,
        contatoNaLista.nextSibling
      ); //Adiciona os detalhes após o novo cliente
      renderContatos();
    }
  }

  function encontrarPropostasPorNome(nomeContato) {
    var propostasAssociadas = [];
    for (let j = 0; j < propostas.length; j++) {
      if (propostas[j].nomeContato === nomeContato) {
        propostasAssociadas.push(propostas[j]);
      }
    }
    return propostasAssociadas;
  }

  for (let i = 0; i < propostas.length; i++) {
    if (el.getAttribute("id") === `btnfechar${i + 1}`) {
      if (propostas[i].status !== "Ativa") {
        continue;
      } else {
        let confirmar = prompt("Deseja fechar esta proposta?");
        if (
          confirmar &&
          (confirmar.toLowerCase() === "s" || confirmar.toLowerCase() === "sim")
        ) {
          propostas[i].status = "Fechada";
          salvarLocalStorage();
        }
      }
    }
  }

  for (let i = 0; i < contatos.length; i++) {
    //Botao de Editar Contato
    if (el.getAttribute("id") === `btneditar${i + 1}`) {
      // Editar Nome
      let editarNome = prompt("Deseja editar o nome do contato?");
      if (
        editarNome &&
        (editarNome.toLowerCase() === "sim" || editarNome.toLowerCase() === "s")
      ) {
        var nome = prompt("Digte o nome");
        if (nome === ("" || null)) {
          alert("Digite um valor válido");
        } else {
          contatos[i].nome = nome;
        }
      }

      //Editar endereco
      let editarEndereco = prompt("Deseja editar o endereco do contato?");
      if (
        editarEndereco &&
        (editarEndereco.toLowerCase() === "sim" ||
          editarEndereco.toLowerCase() === "s")
      ) {
        var endereco = prompt("Digite o endereco");
        if (endereco === ("" || null)) {
          alert("Digite um valor válido");
        } else {
          contatos[i].endereco = endereco;
        }
      }

      //Editar telefone
      let editarTelefone = prompt("Deseja editar o telefone do contato?");
      if (
        editarTelefone &&
        (editarTelefone.toLowerCase() === "sim" ||
          editarTelefone.toLowerCase() === "s")
      ) {
        var telefone = prompt("Digite o telefone");
        if (telefone === ("" || null)) {
          alert("Digite um valor válido");
        } else {
          contatos[i].telefone = telefone;
        }
      }

      //Editar email
      let editarEmail = prompt("Deseja editar o email do contato?");
      if (
        editarEmail &&
        (editarEmail.toLowerCase() === "sim" ||
          editarEmail.toLowerCase() === "s")
      ) {
        var email = prompt("Digite o email");
        if (email === ("" || null)) {
          alert("Digite um valor válido");
        } else {
          contatos[i].email = email;
        }
      }
      salvarLocalStorage();
    }

    //botão de adicionar Proposta
    if (el.getAttribute("id") === `btnproposta${i + 1}`) {
      detalhes = document.getElementById(`detalhe${i + 1}`);
      qtdpropostas = propostas.length;

      var nomeContato = contatos[i].nome;
      var data = prompt("Digite a data da proposta");
      var valor = prompt("Digite o valor da proposta");

      if (data === ("" || null) || valor === ("" || null)) {
        alert("Valor invalido. Por favor, insira um valor valido");
      } else {
        var novaProposta = {
          nomeContato: nomeContato,
          num: propostas.length + 1,
          data: data,
          valor: valor,
          status: "Ativa",
        };
        propostas.push(novaProposta);
        // LocalStorage
        salvarLocalStorage();

        var novaLinha = document.createElement("p");
        novaLinha.innerHTML = `Num: ${novaProposta.num}; Data: ${novaProposta.data}; Valor: ${novaProposta.valor}; Status: ${novaProposta.status}`;
        detalhes.appendChild(novaLinha);

        renderPropostas();
      }
    }

    //Botão de excluir contato
    if (el.getAttribute("id") === `btnexcluir${i + 1}`) {
      var confirmar = prompt("Tem certeza que deseja excluir este contato?");
      if (
        confirmar &&
        (confirmar.toLowerCase() === "sim" || confirmar.toLowerCase() === "s")
      ) {
        var propostasAssociadas = encontrarPropostasPorNome(contatos[i].nome);

        //Verifica se existem propostas para esse contato
        if (propostasAssociadas.length > 0) {
          //Remove as propostas
          propostasAssociadas.forEach(function (proposta) {
            var indiceProposta = propostas.indexOf(proposta);
            if (indiceProposta !== -1) {
              propostas.splice(indiceProposta, 1);
            }
          });
          salvarLocalStorage();
        }

        // Remover o contato
        contatos.splice(i, 1);
        corrigirNumero(i);
        salvarLocalStorage();
      }
    }

    //Ligar e Desligar exibição dos detalhes
    let detalheAtual = document.getElementById(`detalhe${i + 1}`);

    if (el.getAttribute("id") === `contato${i + 1}`) {
      if (flag === 0) {
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
    localStorage.setItem("contatos", JSON.stringify(contatos));
    localStorage.setItem("propostas", JSON.stringify(propostas));
  }
});

//Corrigir problema que ocorre ao excluir contato
function corrigirNumero(contatoExcluido) {
  for (let i = contatoExcluido; i < contatos.length; i++) {
    contatos[i].numero = i + 1;
  }
}
