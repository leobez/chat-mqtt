import { FormEvent, useEffect, useState } from 'react'
import styles from './Connections.module.css'
import mqtt from 'mqtt'
import useConnectToBroker from '../../Hooks/useConnectToBroker'

/* 
    -> Client connects to server with: protocol://server:port

    -> After connecte, client is presented with a form to decide which topic he wants to subscribe to

    -> Client is subscribed to topic

    -> New windows is opened, with a chat to display and send messages
*/

const Connections = () => {

    const {loading, message, connect, client} = useConnectToBroker()

    useEffect(() => {
        console.log(client)
    }, [client])

    const [server, setServer] = useState<string>('')
    const [protocol, setProtocol] = useState<string>('')
    const [port, setPort] = useState<number|null>(null)
    const [connected, setConnected] = useState<boolean>(false)
    const [topic, setTopic] = useState<string>('')

    const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()

        // Validate states
        // (...)

        // Create connection string
        //const connectionString = `${protocol}://${server}:${port}`
        const connectionString = `ws://broker.hivemq.com:8000/mqtt`

        connect(connectionString)

    }

    const handleSubmit2 = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        console.log(topic)

        client.subscribe(topic, () => {
            console.log('cliente inscrito no topico: ', topic)
        })

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
                    <h1>Usuário conectado</h1>
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

        </div>
    )
}

export default Connections