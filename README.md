# Angular Arduino PLC

**`Projeto em andamento!`**

Este projeto foi proposto para representar uma central de automação de ar-condicionado de uma sala de aula. A aplicação acessa duas APIs, onde é possível salvar as informações necessária para identificar o ar-condicionado e o ambiente de sua alocação, bem como interação com o servidor Arduino.

 A primeira, [Arduino PLC backend](https://github.com/ricardo14231/Arduino-PLC-back-end) é responsável por persistir as informações que identificam a localização do ar-condicionado (pavilhão, sala) e dados de seu status atual (ligado, desligado, temperatura, etc.).   
 A segunda recebe os dados do sensor de temperatura e presença do servidor Arduino e envia dados para acionar o led emissor de infravermelho para acionar o ar-condicionado com a função selecionada na aplicação.

OBS: o servidor Arduino está representado pelo json-server, para fins de desenvolvimento.

![mainScreen](https://github.com/ricardo14231/blob/master/mainScreen.jpg)   
![menuScreen](https://github.com/ricardo14231/blob/master/menuScreen.jpg)  

## Pré-requisitos para executar o projeto:

* Node: 14.10.
* NPM: 6.14.
* Angular: 10.

## Para executar a aplicação:

* Rodar o servidor [Arduino PLC backend](https://github.com/ricardo14231/Arduino-PLC-back-end)   

* Execute: `npm start`.   
* Acesse `http://localhost:4200/`.

## Autor:

Ricardo Farias.

https://www.linkedin.com/in/ricardo-farias-04069359/

## Licença:

`MIT`
