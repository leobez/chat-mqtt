import img from '../../assets/mqtt-example.png'

const About = () => {
    return (
        <div>
            
            <div>
                <img src={img} alt="mqtt-example" />
                <h2>
                    <a href="https://nitin-sharma.medium.com/getting-started-with-mqtt-part-1-a3c365e3a488" target='_blank'>Font</a>
                </h2>
            </div>

            <div>

                <h1>Olá,</h1>

                <p>
                    Este é um projeto simples de um chat que utiliza do protocolo MQTT para o envio e recebimento de mensagens.
                </p>

                <hr />

                <p>
                    O protocolo MQTT funciona com base no padrão Publish/subscribe, em que o usuário deve se inscrever em tópicos para poder receber e enviar mensagens.
                </p>

                <hr />

                <p>
                    Para usar: 
                    <ul>
                        <li>Se conecte a um broker MQTT;</li>
                        <li>Se inscreva em tópicos;</li>
                        <li>Receba mensagem através desses tópicos;</li>
                        <li>Clique no tópico que deseja usar;</li>
                        <li>Envie mensagens para o tópico selecionado;</li>
                    </ul>
                </p>

            </div>    

        </div>
    )
}

export default About