/**
 * Configuration
 */
class Config {
    constructor(
        nome = "Jogador",
        cenario = "diurno",
        dificuldade = "medio",
        velocidadeJogo = 5,
        personagem = "bird",
        tipo = "real",
        velocidadePersonagem = 5,
        pontuacao = 1
    ) {
        this.nome = nome
        this.cenario = cenario
        this.dificuldade = dificuldade
        this.velocidadeJogo = velocidadeJogo
        this.personagem = personagem
        this.tipo = tipo
        this.velocidadePersonagem = velocidadePersonagem

        if (pontuacao >= 1 && pontuacao <= 10) {
            this.pontuacao = Number(pontuacao)
        }

        if (pontuacao < 1) {
            this.pontuacao = 1
        }

        if (pontuacao > 10) {
            this.pontuacao = 10
        }
    }

    aberturaBarras() {
        let abertura;

        switch (this.dificuldade) {

            case "facil":
                abertura = 300;
                break;

            case "dificil":
                abertura = 160;
                break;

            case "medio":

            default:
                abertura = 200;
                break;
        }

        return abertura;
    }

    espacoBarras() {
        let espaco;

        switch (this.dificuldade) {

            case "facil":
                espaco = 500;
                break;

            case "dificil":
                espaco = 300;
                break;

            case "medio":

            default:
                espaco = 400;
                break;
        }

        return espaco;
    }

    deslocamentoBarras() {
        let deslocamentoPadrao = 3

        if (this.velocidadeJogo >= 1 && this.velocidadeJogo <= 10) {
            return this.velocidadeJogo
        }

        return deslocamentoPadrao
    }

    personagemImgSrc() {
        let src = "img/";

        switch (this.personagem) {

            case "mary":
                src += "mary.png"
                break;

            case "bird":

            default:
                src += "passaro.png"
                break;
        }

        return src
    }

    personagemSpeed(type) {
        let speedUp, speedDown;

        switch (this.velocidadePersonagem) {

            case "baixa":
                speedUp = 6
                speedDown = -3
                break;

            case "rapida":
                speedUp = 10
                speedDown = -8
                break;

            case "media":

            default:
                speedUp = 8
                speedDown = -5
                break;
        }

        if (type == "up") {
            return speedUp
        }

        if (type == "down") {
            return speedDown
        }

        return 0
    }

    personagemSpeedUp() {
        return this.personagemSpeed("up")
    }

    personagemSpeedDown() {
        return this.personagemSpeed("down")
    }

    isJogo(type) {
        return this.tipo === type
    }

    isJogoTreino() {
        return this.isJogo('treino');
    }

    isJogoReal() {
        return this.isJogo('real');
    }
}

function setTheme(theme) {
    let gameScreen = document.getElementById('game-screen');

    gameScreen.classList.add("bg-" + theme)
}

function clearGame() {
    let gameScreen = document.getElementById('game-screen');
    gameScreen.innerHTML = '';
}

var config = new Config;

const btnPlay = document.getElementById('play');

btnPlay.addEventListener('click', function (element) {
    element.preventDefault()

    let nome = document.getElementById('nome').value
    let cenario = document.querySelector('input[name=cenario]:checked').value
    let dificuldade = document.querySelector('input[name=dificuldade]:checked').value
    let velocidadeJogo = document.getElementById('velocidade').value
    let personagem = document.getElementById('personagem').value
    let tipo = document.querySelector('input[name=tipo]:checked').value
    let velocidadePersonagem = document.querySelector('input[name=velocidade-personagem]:checked').value
    let pontuacao = document.querySelector('input[name=pontuacao]:checked').value

    config.nome = nome ? nome : config.nome
    config.cenario = cenario
    config.dificuldade = dificuldade
    config.velocidadeJogo = velocidadeJogo
    config.personagem = personagem
    config.tipo = tipo
    config.velocidadePersonagem = velocidadePersonagem
    config.pontuacao = pontuacao

    setTheme(config.cenario);

    closeConfig()

    clearGame()
    
    new FlappyBird().start()
})

function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function Barreira(reversa = false) {
    this.elemento = novoElemento('div', 'barreira')
    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`

}

/* const b= new Barreira(false)
b.setAltura(500)
document.querySelector('[wm-flappy]').appendChild(b.elemento) */



function ParDeBarreiras(altura, abertura, popsicaoNaTela) {
    this.elemento = novoElemento('div', 'par-de-barreiras')
    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)


    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = popsicaoNaTela => this.elemento.style.left = `${popsicaoNaTela}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(popsicaoNaTela)
}

/* const b= new ParDeBarreiras(500,300,1000)
document.querySelector('[wm-flappy]').appendChild(b.elemento)  */

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = config.deslocamentoBarras()
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio &&
                par.getX() < meio
            if (cruzouMeio) {
                notificarPonto()
            }
        })
    }
}

/* const barreiras = new Barreiras(700, 400, 200, 400)
const areaDoJogo = document.querySelector('[wm-flappy]')

barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 

setInterval(() => {
    barreiras.animar()
},20)  */


function Passaro(alturaJogo) {
    let voando = false

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = config.personagemImgSrc()

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? config.personagemSpeedUp() : config.personagemSpeedDown())
        const alturaMaxima = alturaJogo - this.elemento.clientWidth

        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }
    this.setY(alturaJogo / 2)
}

/* const barreiras = new Barreiras(700, 400, 200, 400)
const passaro = new Passaro(700)

const areaDoJogo = document.querySelector('[wm-flappy]')

areaDoJogo.appendChild(passaro.elemento)
barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 

setInterval(() => {
      barreiras.animar()
      passaro.animar() 
},20) */


function Progresso() {

    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
}

/*  const barreiras = new Barreiras(700, 400, 200, 400)
const passaro = new Passaro(700)

const areaDoJogo = document.querySelector('[wm-flappy]')

areaDoJogo.appendChild(passaro.elemento)
barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento))  */


function estaoSobrepostos(elementoA, elementoB) {

    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(passaro, barreiras) {

    if (config.isJogoTreino()) {
        return false
    }

    let colidiu = false

    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior) ||
                estaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu

}

function FlappyBird() {
    let pontos = 0
    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth

    const progresso = new Progresso()
    const barreiras = new Barreiras(
        altura,
        largura,
        config.aberturaBarras(),
        config.espacoBarras(),
        () => {
            pontos = Number(pontos) + Number(config.pontuacao)
            progresso.atualizarPontos(pontos)
        }
    )

    const passaro = new Passaro(altura)

    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(passaro.elemento)
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

    this.start = () => {
        const temporizador = setInterval(() => {
            barreiras.animar()
            passaro.animar()

            if (colidiu(passaro, barreiras)) {
                clearInterval(temporizador)
                alert(`${config.nome} conseguiu ${pontos} ponto(s)`)
            }
        }, 20)
    }
}