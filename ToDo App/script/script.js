//Variaveis
const tarefa = document.getElementById("tarefa");
const lista = document.getElementById("list");
const msgDeErro = document.querySelector("#err");

//criação da array de objetos que recebera a lista dentro aplicação
var listaNoStorage = {};

//função que inicializa, perguntando se existe item no localStorage
function iniciarLista() {
  if (localStorage.getItem("listaTarefas")) {
    //pega a lista que esta alocada no localStorage
    listaNoStorage = JSON.parse(localStorage.getItem("listaTarefas"));

    //quantifica o tamanho da lista no objeto
    for (let i = 0; i < Object.keys(listaNoStorage).length; i++) {
      //salva a chave da vez a partir do indice do for
      var key = Object.keys(listaNoStorage)[i];
      //chama a função com o nome da chave do objeto como argumento
      adicionarNaLista(key);
    }
  }
}

iniciarLista();

//função que inicializa, quando o botão Adicionar for acionado
function adicionarTarefa() {
  //verifica se o campo de texto esta vazio
  if (tarefa.value != "") {
    //chama uma função que faz a primeira letra da tarefa ficar maiuscula
    var tarefaMaiuscula = letraMaiuscula(tarefa.value);

    //variavel para as terefas repetidas
    var tarefaRepetida = false;
    for (let i = 0; i < Object.keys(listaNoStorage).length; i++) {
      //verifica se há tarefas repetidas e seta a variavel como true se houver
      if (Object.keys(listaNoStorage)[i] == tarefaMaiuscula) {
        tarefaRepetida = true;
      }
    }
    //verifica se há tarefas repetidas e mostra a mensagem de erro se houver
    if (tarefaRepetida) {
      //aumenta a opacidade da mensagem de erro
      msgDeErro.style.opacity = 1;

      //adiciona o texto da mensagem de erro
      msgDeErro.innerText = "Essa tarefa já esta na lista...";

      setTimeout(() => {
        //diminui a opacidade da mensagem de erro depois de 3 segundos
        msgDeErro.style.opacity = 0;
      }, 3000);
    } else {
      //cria array de objetos e seu subObjeto
      listaNoStorage[tarefaMaiuscula] = { check: false };

      //chama a função com o nome da tarefa como argumento
      adicionarNaLista(tarefaMaiuscula);

      //limpa o campo de texto
      tarefa.value = "";
      //mantém o foco no campo de texto
      tarefa.focus();
    }
  } else {
    //aumenta a opacidade da mensagem de erro
    msgDeErro.style.opacity = 1;

    //adiciona o texto da mensagem de erro
    msgDeErro.innerText = "Insira corretamente uma tarefa...";

    setTimeout(() => {
      //diminui a opacidade da mensagem de erro depois de 3 segundos
      msgDeErro.style.opacity = 0;
    }, 3000);
  }
}

//função que adiciona a tarefa na lista
function adicionarNaLista(tarefa) {
  //variaveis que recebem elementos
  var li = document.createElement("li");
  var checkbox = document.createElement("input");
  var deleteBtn = document.createElement("span");
  var paragrafo = document.createElement("p");

  //salvando no localStorage a array de objetos lista de tarefas
  localStorage.setItem("listaTarefas", JSON.stringify(listaNoStorage));

  //seta o tipo checkbox para o input
  checkbox.setAttribute("type", "checkbox");
  //e adiciona um id ao input
  checkbox.id = "checked";
  //confere se a tarefa esta feita(checked)
  if (listaNoStorage[tarefa].check == true) {
    //seta o o checkbox como ativo
    checkbox.setAttribute("checked", "checked");
    //adiciona uma classe que taxa o conteudo
    paragrafo.classList.add("taxar");
  }

  //adiciona um evento que averigua o checkbox a cada mudança
  checkbox.addEventListener("change", () => {
    //verifica se o checkbox esta ativado ou não
    if (checkbox.checked) {
      //adiciona uma classe que taxa o conteudo
      paragrafo.classList.add("taxar");
      //seta o checkbox como ativo
      checkbox.setAttribute("checked", "checked");
      //muda o subObjeto check
      listaNoStorage[tarefa].check = true;
      //atualiza o localStorage com as novas informçoes da array de objetos
      localStorage.setItem("listaTarefas", JSON.stringify(listaNoStorage));
    } else {
      //remove uma classe que taxa o conteudo
      paragrafo.classList.remove("taxar");
      //retira o checkbox como ativo
      checkbox.setAttribute("checked", "");
      //muda o subObjeto check
      listaNoStorage[tarefa].check = false;
      //atualiza o localStorage com as novas informçoes da array de objetos
      localStorage.setItem("listaTarefas", JSON.stringify(listaNoStorage));
    }
  });

  //coloca a tarefa na variavel do paragrafo
  paragrafo.innerText = tarefa;
  //adiciona um X na variavel de delete
  deleteBtn.innerHTML = "&times";

  //adiciona um evento que remove o elemento da lista;
  deleteBtn.addEventListener("click", () => {
    //pergunta para o usuario
    if (confirm("Você deseja mesmo apagar essa tarefa?")) {
      //remove linha da tarefa
      li.remove();
      //deleta a tarefa da array de objetos
      delete listaNoStorage[tarefa];
      //atualiza o localStorage com as novas informçoes da array de objetos
      localStorage.setItem("listaTarefas", JSON.stringify(listaNoStorage));
    }
  });

  //adiciona os elementos no elemento linha
  li.appendChild(checkbox);
  li.appendChild(paragrafo);
  li.appendChild(deleteBtn);

  //adiciona o elemento linha na lista;
  lista.appendChild(li);
}

//função que faz a primeira letra da tarefa maiuscula
function letraMaiuscula(tarefa) {
  //a variavel recebe a primeira letra em maiusculo e
  //juntada com o resto da palavra, mas que falta a primeira letra
  const maiuscula = tarefa.charAt(0).toUpperCase() + tarefa.slice(1);
  //retorna a função
  return maiuscula;
}

//Abaixo é sobre o click do Enter para adicionar tarefas na lista

//adiciona um evento que só é adicionado quando o foco esta no campo de texto;
tarefa.addEventListener("focus", () => {
  //adiciona um evento para o click do Enter no teclado
  tarefa.addEventListener("keyup", (e) => {
    //verifica se o botão do teclado clickado é o Enter
    if (e.key === "Enter") {
      //chama a função de criação de tarefa
      adicionarTarefa();
    }
  });
});

//Abaixo é sobre a alternancia do modo escuro e modo claro

//variaveis
const btnMode = document.getElementById("btnMode");
const mode = document.getElementById("mode");

//verifica se existe no localStorage
if (localStorage.getItem("prefferedMode")) {
  //verifica se é light que esta no localStorage
  if (localStorage.prefferedMode == "light") {
    //remove as classes do modo dark e coloca do modo light
    mode.classList.remove("ballDark");
    mode.classList.add("ballLight");
    document.body.classList.remove("DarkMode");

    //verifica se é dark que esta no localStorage
  } else if (localStorage.prefferedMode == "dark") {
    //remove as classes do modo light e coloca do modo dark
    mode.classList.remove("ballLight");
    mode.classList.add("ballDark");
    document.body.classList.add("DarkMode");
  } else {
    //se não tiver nada setado, o padrão vai ser light
    localStorage.setItem("prefferedMode", "light");
  }
}

//adiciona o evento de click no botão de alternar o modo
btnMode.addEventListener("click", () => {
  //chama a função de animação do botão
  btnAnimation();
});

//função que faz a animação e a mudança do modo dark pro light e visse-versa
function btnAnimation() {
  //verifica o modo que esta atualmente
  if (localStorage.prefferedMode == "light") {
    //remove as classes do modo light e coloca do modo dark
    mode.classList.remove("ballLight");
    mode.classList.add("ballDark");
    document.body.classList.add("DarkMode");
    //seta o modo dark ao localStorage
    localStorage.prefferedMode = "dark";
  } else {
    //remove as classes do modo dark e coloca do modo light
    mode.classList.remove("ballDark");
    mode.classList.add("ballLight");
    document.body.classList.remove("DarkMode");
    //seta o modo light ao localStorage
    localStorage.prefferedMode = "light";
  }
}
