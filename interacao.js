/*                      Variáveis GLOBAiS de controle                                  */

var id = 0;//Esse "id" irá ajudar a identificar cada fase de pergunta-respostas
var selected = null;//essa variável irá ajudar a identificar foi resposta foi selecionada
var unicaVez = true;//Essa variável vai nos ajudar selecionar apenas uma resposta a cada fase
var somar = 0;//Variável que acumula os pontos ganhos a cada resposta certa
var decremenento = null;//variável que vai receber o decremento do contador
var unica = false;

/*-------------------------------------------------------------------------------------*/

// (01)PRIMEIRO PASSO- Abstrair os elementos do arquivo html
const meter = document.getElementById('meter');//o contador ou cronômetro
const ask = document.getElementById('ask');//constante que vai armazaenar a pergunta
const opt1 = document.getElementById('opt1');//constante que vai armazenar a resposta 1
const opt2 = document.getElementById('opt2');//constante que vai armazenar a resposta 2
const opt3 = document.getElementById('opt3');//constante que vai armazenar a resposta 3
const opt4 = document.getElementById('opt4');//constante que vai armazenar a resposta 4
const pts = document.getElementById('pts');//constante que vai armazenar os pontos
const next = document.getElementById('next');//constante que vai armazenar os pontos


// (02)SEGUNDO PASSO- Criar um array que vai armazenar objetos. Estes objectos em suas 
// propruedades vão abergar as perguntas e respostas.

const Questions = [// Um array para armazenar os objetos de pergunta-respostas
    {//objeto na posição 0 do array
        id: 0,//reflete a sua posição no array que lhe contém
        q: '3 + 7 ?',//propriedade do objecto que contém a pergunta
        a: [//Essa propriedade contém um array com objetos contendo as opções e correcções
            { op1: '20', correct: false },//opção e correcção(falsa) 
            { op2: '10', correct: true },//opção e correcção(verdeira)
            { op3: '8', correct: false },//opção e correcção(falsa)
            { op4: '-5', correct: false }//opção e correcção(falsa)
        ]
    },
    {//objeto na posição 1 do array
        id: 1,//reflete a sua posição no array que lhe contém
        q: 'Qual é o simbolo químico da água',//propriedade do objecto que contém a pergunta
        a: [//Essa propriedade contém um array com objetos contendo as opções e correcções
            { op1: 'H3O', correct: false },//opção e correcção(falsa)
            { op2: 'H1O', correct: false },//opção e correcção(falsa)
            { op3: 'HO2', correct: false },//opção e correcção(falsa)
            { op4: 'H2O', correct: true }//opção e correcção(verdeira)
        ]
    },
    {//objeto na posição 2 do array
        id: 2,//reflete a sua posição no array que lhe contém
        q: '-562+231',//propriedade do objecto que contém a pergunta
        a: [//Essa propriedade contém um array com objetos contendo as opções e correcções
            { op1: '-331', correct: true },//opção e correcção(verdeira)
            { op2: '331', correct: false },//opção e correcção(falsa)
            { op3: '-323', correct: false },//opção e correcção(falsa)
            { op4: '-332', correct: false }//opção e correcção(falsa)
        ]
    },
    {//objeto na posição 3 do array
        id: 3,//reflete a sua posição no array que lhe contém
        q: '2x+5=-3',//propriedade do objecto que contém a pergunta
        a: [//Essa propriedade contém um array com objetos contendo as opções e correcções
            { op1: '4', correct: false },//opção e correcção(falsa)
            { op2: '-4', correct: true },//opção e correcção(verdeira)
            { op3: '8/2', correct: false },//opção e correcção(falsa)
            { op4: '3', correct: false }//opção e correcção(falsa)
        ]
    }
]


// (03)TERCEIRO PASSO- Criar a função que dará início ao jogo

function start() {//Função que dará início ao jogo
    if (unica) return;
    /*(01)*/ document.querySelector('.container header button').style.display = 'none';// Logo que a funcão começa
    //o botão "começar o jogo" vai desaparecer porque colocamos um estilo display como none

    /*(02)*/ document.querySelector('.container header span').style.display = 'block'// Após o botão "começar o jogo"
    //desaparecer, o "contador" vai aparecer devido o estilo display como block.


    /* (08)OITAVO PASSO*/
    tempo = setInterval(() => {//a cadad um segundo vai repetir o que estiver dentro  dessa funcao
        var aux = document.getElementById('meter').innerHTML;//obtendo o valor(90) nele contido
        decremenento = Number(aux) - 1;//subtraindo o valor que se encontra no espaco do contador
        if (decremenento == -1) {// se o decremento for igual a -1, no espaco do contador vai "timeOver"
            document.getElementById("meter").innerHTML = "TimeOver";
            off();//aqui parámos o setInterval
        } else {//Se não, vai apresentar o valor do incremento
            document.getElementById("meter").innerHTML = decremenento;
        }
    }, 1000);//todos esses procedimento no setInterval durante um segundo

    send(3);//aqui ainda na função start ativamos a funcao send com o número de id que representa a posicao do array Questions
    id++;// add +1 a cada fase
    unica = true//O botão 'unica' já foi ativado, quer dizer que já não pode ser ativado a função start
    unicaVez = false;//desativamos a possivilidade de poder selecionar uma resposta

    resetColor();//função para restaurar as cores dos espeços das respostas 
}


/*(09)NONO PASSO- Criar as funções off e resetColor*/

function off() {// funcao que pára o setInterval
    clearInterval(tempo);
}

function resetColor() {//funcao que restaura as cores
    opt1.style.backgroundColor = 'blue';
    opt2.style.backgroundColor = 'blue';
    opt3.style.backgroundColor = 'blue';
    opt4.style.backgroundColor = 'blue';
}


/*------------------------------------------------------------------------------------------------ */




// (04)QUARTO PASSO- Aqui vamos criar a função que enviar as perguntas e respostas no html( nosso jogador)

function send(id) {//Lembra que cada objeto que contém a perguntas e repostas tem uma propriedade chamada "id" que tem um número correspondente a sua localixação no Array que lhe contém

/*(01)*/ ask.innerHTML = Questions[id].q; // Vamos enviar a pergunta na constante com o espaço da pergunta;

    /*(02)  Vamos enviar as respostas do array nas constantes com o espaço das respostas*/
    opt1.innerHTML = Questions[id].a[0].op1;
    opt2.innerHTML = Questions[id].a[1].op2;
    opt3.innerHTML = Questions[id].a[2].op3;
    opt4.innerHTML = Questions[id].a[3].op4;

    /*(03)  Passando o valor lógico ou a correcção*/
    opt1.value = Questions[id].a[0].correct;
    opt2.value = Questions[id].a[1].correct;
    opt3.value = Questions[id].a[2].correct;
    opt4.value = Questions[id].a[3].correct;
}


// (05)QUINTO PASSO- EVENTOS QUE OCORRERAM A CLICAR EM UMA RESPOSTA

opt1.addEventListener('click', () => {//Se a opção for clicada...
    if (unicaVez) return;//se já clicado alguma resposta, então não procede.
    selected = opt1.value; //O selected vai pegar valor lógico (verdadeira ou falsa)
    validar(opt1);//como parâmetro vamos utilizar o próprio espaço da resposta
});
opt2.addEventListener('click', () => {//Se a opção for clicada...
    if (unicaVez) return;//se já clicado alguma resposta, então não procede.
    selected = opt2.value; //O selected vai pegar valor lógico (verdadeira ou falsa)
    validar(opt2);//como parâmetro vamos utilizar o próprio espaço da resposta
});
opt3.addEventListener('click', () => {//Se a opção for clicada...
    if (unicaVez) return;//se já clicado alguma resposta, então não procede.
    selected = opt3.value;//O selected vai pegar valor lógico (verdadeira ou falsa)
    validar(opt3);//como parâmetro vamos utilizar o próprio espaço da resposta
});
opt4.addEventListener('click', () => {//Se a opção for clicada...
    if (unicaVez) return;//se já clicado alguma resposta, então não procede.
    selected = opt4.value; //O selected vai pegar valor lógico (verdadeira ou falsa)
    validar(opt4);//como parâmetro vamos utilizar o próprio espaço da resposta
});

/*--------------------------------------------------------------------------------------*/


// (06) SEXTO PASSO- Vamos criar a função que vai validar a resposta

function validar(opt) {
    if (selected == 'true') {//Se estiver certa. a resposta
        somar += 100;//somar 100pts
        pts.innerHTML = somar;//exibir no espaço de pontos acumulados
        opt.style.background = 'green';//pintar o espço da resposta com a cor verde 
    } else {//se a respota estiver ou ter uma correcção errada
        opt.style.background = 'red';//pintar o espço da resposta com a cor vermelha
    }
    off();//logo ao validar a resposta, tamvém parámos o cronômetro
    unicaVez = true;//Aqui ativamos a unicaVez de modo a não ser possível repetir a validação de uma outra resposta
    unica = false;//Aqui ativamos a unica de modo a permitir chamar a proxima fase

}


// (07) SÉTIMO PASSO- Após a validação podemos chamar a nova fase de perguntas 
next.addEventListener('click', () => {

    if (!unicaVez) return;//so poss chamar a proxima fase se a unicaVez ja foi ativada
    if (id < 4) {// 4 é o nosso número de perguntas,mas tu podes aumentar  ainda mais
        meter.innerHTML = '90';//recomeçar o cronômetro
        start(id);//Chamar a função start
    } else {//caso não haja mais perguntas
        resetColor();
        meter.innerHTML = 'Fim do jogo!'//No cronÔmetro ao invés de mandar um número, enviamos uma mensagem
        ask.innerHTML = 'Agrademos a tua participação caro jogador!'//mandar uma sms no espaço da pergunta
        //no espaço de respostas ficará vazio
        opt1.innerHTML = "";
        opt2.innerHTML = "";
        opt3.innerHTML = "";
        opt4.innerHTML = "";
    }
})


/*-------------------------------------------------------------------------------------------------------- */