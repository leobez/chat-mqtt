import { FormEvent, useEffect, useState } from 'react'
import styles from './Connections.module.css'
import useConnectToBroker from '../../Hooks/useConnectToBroker'
import useSubscribeToTopic from '../../Hooks/useSubscribeToTopic'
import usePublishToTopic from '../../Hooks/usePublishToTopic'

/* 
    -> Client connects to server with: protocol://server:port

    -> After connecte, client is presented with a form to decide which topic he wants to subscribe to

    -> Client is subscribed to topic

    -> New windows is opened, with a chat to display and send messages
*/

class Message {

    topic
    content

    constructor(topic:string, content:string) {
        this.topic = topic
        this.content = content
    }

}

const Connections = () => {

    const {loading, message:connMessage, connect, client} = useConnectToBroker()
    const {loading:subLoading, message:subMessage, subscribe} = useSubscribeToTopic()
    const {loading:pubLoading, message:pubMessage, publish} = usePublishToTopic()

    const [server, setServer] = useState<string>('')
    const [protocol, setProtocol] = useState<string>('')
    const [port, setPort] = useState<number|null>(null)
    const [topic, setTopic] = useState<string>('')
    const [subscribedTopics, setSubscribedTopics] = useState<string[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [chatMessage, setChatMessage] = useState<string>('')
    const [chosenTopic, setChosenTopic] = useState<string>('')

    useEffect(() => {
        if (!client) return;
        console.log(client)
        client.on('message', (topic:string, content:any) => {
            const message = new Message(topic, content.toString())
            console.log(message)
            setMessages((prev) => [...prev, message])
        })
    }, [client])

    const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()

        // Create connection string
        //const connectionString = `${protocol}://${server}:${port}`
        const connectionString = `ws://broker.hivemq.com:8000/mqtt`

        connect(connectionString)
    }

    const handleSubmit2 = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()

        if (subscribedTopics.includes(topic)) {
            console.log('Tópico já inscrito.')
            return;
        }

        console.log(topic)
        subscribe(topic, client)
        setSubscribedTopics((prev) => [...prev, topic])
    }

    const handleSubmit3 = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        console.log('ENVIANDO MENSAGEM: ', chatMessage, ' PARA O TOPICO: ', chosenTopic)
        publish(client, chosenTopic, chatMessage)
    }

    return (
        <div>
            
            <form onSubmit={handleSubmit} className={styles.form}>

                <div>
                    <label htmlFor="protocol">Protocol:</label>
                    <input 
                    type="text" 
                    name='protocol'
                    onChange={(e) => setProtocol(e.target.value)}
                    value={protocol}
                    />
                </div>

                <div>
                    <label htmlFor="server">Server:</label>
                    <input 
                    type="text" 
                    name='server'
                    onChange={(e) => setServer(e.target.value)}
                    value={server}
                    />
                </div>

                <div>
                    <label htmlFor="port">Port:</label>
                    <input 
                    type="text" 
                    name='port'
                    onChange={(e) => setPort(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value='Conectar'/>

            </form>

            {client && 
                <div>
                    <h1>Usuário "{client.options.clientId}" conectado.</h1>
                    <form onSubmit={handleSubmit2} className={styles.form}>
                        <div>
                            <label htmlFor="topic">Tópico:</label>
                            <input 
                                type="text"
                                name='topic'
                                onChange={(e) => setTopic(e.target.value)}
                                value={topic}
                            />

                            <input type="submit" value='conectar ao tópico' />
                        </div>

                    </form>
                </div>
            }

            {subscribedTopics.length>0 && 
                <div>
                    <h1>Usuário "{client.options.clientId}" escutando topicos: </h1>
                    {subscribedTopics.map((topic, index) => (
                        <div key={index}>
                            <p>{topic}</p>
                        </div>
                    ))}

                    <div>
                        {/* MESSAGES FROM TOPICS */}
                        {messages && messages.map((msg:Message, index) => (
                            <p key={index}>
                                <span>{msg.topic}:/{msg.content}</span>
                            </p>
                        ))}
                    </div>
                    
                    <form onSubmit={handleSubmit3}>
                        <div>
                            <label htmlFor="chatmessage">Mensagem:</label>
                            <input 
                                type="text" 
                                name='chatmessage'
                                onChange={(e) => setChatMessage(e.target.value)}
                                value={chatMessage}
                            />
                        </div>
                        
                        <div>
                            {subscribedTopics.map((topic, index) => (
                                <div key={index}>
                                    <input 
                                    type="radio" 
                                    name='chosenTopic' 
                                    value={topic}
                                    checked={chosenTopic === topic}
                                    onChange={(e)=>setChosenTopic(e.target.value)}/>
                                    <label htmlFor={topic}>{topic}</label>
                                </div>
                            ))}
                        </div>

                        <input type="submit" value='enviar' />

                    </form>

                </div>
            }

        </div>
    )
}

export default Connections