# tecweb-flapbird
Jogo FlapBird criado para a disciplina de Tecnologias Web do Curso de Engenharia de Computação da Universidade Federal do Ceará

## Descrição
Como resposta a esse Trabalho Prático você deverá postar seu código juntamente com um vídeo explicativo do código.

### Entrega
#### Entrega do código-fonte do projeto 
Você deverá gravar um vídeo entre 10 e 15 minutos explicando o código do  jogo  

Exemplos de ferramentas para gravação: ActivePresenter, câmera do celular e etc…  

No início do vídeo você deverá se apresentar (nome, matrícula e período que você está cursando) “filmando seu rosto”  

Demais partes do vídeo podem ser apenas apresentação da sua tela na qual você estará explicando o seu código
 - O vídeo poder ser postado no ClassRoom  ou no YouTube como não listado 
 - Não o arquivo do vídeo zipado 

#### Pontuação: 40 pontos  
 - 20 pontos relacionados à implementação 
 - 20 pontos relacionados à apresentação
 - Trabalhos sem vídeo não serão avaliados 
 
#### Requisitos tecnológicos (apenas):  
 - [X] JavaScript
 - [X] CSS
 - [X] HTML
 - [ ] AJAX (opcional)
 - [ ] jQuery (opcional)

## Requisitos

1) [X] **1)** Crie o formulário de configurações do jogo conforme o exemplo da Figura 1. Você poderá criar o estilo que quiser. O formulário poderá ficar na própria página do jogo ou em uma página inicial. As configurações escolhidas no início do jogo serão válidas para o jogo. Caso o usuário queira iniciar um novo jogo as configurações deverão ser escolhidas novamente.

2) [X] **2)** O usuário poderá escolher o cenário do jogo diurno (atual) ou noturno. Escolha a melhor forma para estilizar o cenário noturno. Como por exemplo, tela de fundo ficar cinza e os obstáculos modificados para cinza escuro.

3) [X] **3)** Abertura entre os canos: o usuário poderá escolher um intervalo desejado entre os canos dos obstáculos. Fácil a abertura entre os canos é configurada para ser fácil (maior intervalo entre os canos, média (atual intervalo entre os canos) ou difícil (menor abertura entre os canos).

4) [ ] **4)** Distância entre os canos: o usuário poderá escolher a distância entre os canos. Fácil a distância fica maior. Menor a distância é reduzida em relação ao fácil (atualmente como o jogo está). Difícil é a menor distância entre os canos.
 
5) [ ] **5)** Velocidade do jogo: o usuário poderá escolher a velocidade do jogo passando o parâmetro desejado. O parâmetro pode ser entre 1 e 10. Sendo 1 velocidade baixa (o mais lento) e 10 velocidade máxima. Não permitir valores de velocidade menor que 1 ou maior que 10.

6) [ ] **6)** Personagem: O usuário poderá escolher o personagem do jogo. Atualmente é um pássaro, mas você deverá dar pelo menos mais uma opção de personagem, pode ser outro pássaro, ou qualquer outro personagem.

7) [ ] **7)** Tipo de jogo. O jogo pode ser um treino onde o personagem não colide com os canos e real onde o personagem caso colida com os canos o jogo é terminado.

8) [ ] **8)** Velocidade do personagem: o usuário pode escolher a velocidade do personagem. A velocidade poderá ser baixa, média ou rápida. Atualmente o pássaro está configurado para uma velocidade média (8 para subir e -5 para descer).

9) [ ] **9)** No final do jogo o nome e pontuação do jogador devem ser informados. Dica: Você poderá mostrar essa informação por meio do “alert” ou imprimir na tela por meio do innerHTML.

10) [ ] **10)** Pontuação: O usuário deverá escolher quanto valerá cada ponto no jogo: poderá ser 1, 10 ou 100. Atualmente, cada ponto conquistado vale uma unidade.

11) [ ] **11)** Colocar itens de pontos adicionais para o pássaro pegar durante o jogo.
   - [ ] **a)** Cada item dever aumentar a potuação em 10 pontos
   - [ ] **b)** Os itens podem ser imagens de frutas ou qualquer outro item segundo a
temática do seu jogo.

12) [ ] **12)** Colocar itens especiais para o pássaro pegar durante o jogo
   - [ ] **a)** Um item especial faz o pássaro poder passar nos canos sem ter uma colisão
   - [ ] **b)** O item especial permite a ação, descrita anteriormente, ao pássaro no périodo de
X tempo.   
     Obs: o tempo deverá ser decrementado.
