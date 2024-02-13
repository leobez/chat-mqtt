# Chat MQTT

Site que disponibiliza uma interface para enviar e receber mensagens através de um broker MQTT.

Feito com: React.js, TypeScript, [MQTT.js](https://github.com/mqttjs)

Link para acessar o site (...)

<hr>

Métodos do módulo MQTT.js usados.

`connect`: Cria uma conexão entre o cliente e o broker;

`end`: Enecerra a conexão;

`subscribe`: Insecreve o cliente em um tópico;

`unsubscribe`: Desinsecreve o cliente de um tópico;

`publish`: Publica a mensagem no tópico;

`on`: Escuta por 'eventos' no cliente, como o `message`, que é ativado quando uma mensagem é enviada a um dos tópicos no qual o cliente está inscrito;
