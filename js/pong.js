//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

//variáveis da linha central
let tamLinha = 15;
let round = 2;
let espaçamento = 26;
let xLinha = 290;
let yLinha0 = espaçamento * 1;
let yLinha1 = espaçamento * 2;
let yLinha2 = espaçamento * 3;
let yLinha3 = espaçamento * 4;
let yLinha4 = espaçamento * 5;
let yLinha5 = espaçamento * 6;
let yLinha6 = espaçamento * 7;
let yLinha7 = espaçamento * 8;
let yLinha8 = espaçamento * 9;
let yLinha9 = espaçamento * 10;
let yLinha10 = espaçamento * 11;
let yLinha11 = espaçamento * 12;
let yLinha12 = espaçamento * 13;
let yLinha13 = espaçamento * 14;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 155;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 155;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

// variáveis de som
let trilha;
let ponto;
let raquetada;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraLinha();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete2();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa()
}

function mostraLinha(){
  square(xLinha, yLinha0, tamLinha, round);
  square(xLinha, yLinha1, tamLinha, round);
  square(xLinha, yLinha2, tamLinha, round);
  square(xLinha, yLinha3, tamLinha, round);
  square(xLinha, yLinha4, tamLinha, round);
  square(xLinha, yLinha5, tamLinha, round);
  square(xLinha, yLinha6, tamLinha, round);
  square(xLinha, yLinha7, tamLinha, round);
  square(xLinha, yLinha8, tamLinha, round);
  square(xLinha, yLinha9, tamLinha, round);
  square(xLinha, yLinha10, tamLinha, round);
  square(xLinha, yLinha11, tamLinha, round);
  square(xLinha, yLinha12, tamLinha, round);
  square(xLinha, yLinha13, tamLinha, round);
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
  if (yRaquete > 400) {
    yRaquete = 1
  }
  if (yRaquete < -10){
    yRaquete = 399
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    yRaquete += 10;
  }
}

/*função não utilizada, substituída pela da biblioteca p5.collide2d
function verificaColisaoRaquete2() { 
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
  }
} */

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura, xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
    calculaChanceDeErrar();
  }
}

/*function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento + 30 + chanceDeErrar;
  yRaqueteOponente += velocidadeYOponente;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar(){
  if (pontosDoOponente > meusPontos + 1){
    chanceDeErrar = random (-54, 50)
  }
  else {
    chanceDeErrar = 0
  }
}
*/

function movimentaRaqueteOponente(){
  yRaqueteOponente = yBolinha + raqueteAltura/4 - chanceDeErrar;
}

function calculaChanceDeErrar(){
  chanceDeErrar = Math.round(Math.random()*140);
}

function incluiPlacar(){
  textStyle(BOLD);
  textAlign (CENTER);
  fill (color(0, 255, 0))
  textSize (45);
  text(meusPontos, 240, 45);
  text(pontosDoOponente, 350, 45);
}

function marcaPonto(){
  if (xBolinha > 585){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 15){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
      xBolinha = 23
    }
    if (xBolinha + raio > 600){
      xBolinha = 583
    }
}