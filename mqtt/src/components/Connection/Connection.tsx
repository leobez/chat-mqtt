import { FormEvent, useEffect, useState } from 'react'
import styles from './Connection.module.css'
import useConnectToBroker from '../../Hooks/useConnectToBroker'
import Client from '../Client/Client'

const Connection = () => {

    const {loading, message, connect, client} = useConnectToBroker()
    useEffect(() => {
        console.log('client: ', client)
    }, [client])

    const [protocol, setProtocol] = useState<string>('')
    const [server, setServer] = useState<string>('')
    const [port, setPort] = useState<number|null>(null)

    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()

        // Validate inputs
        /* if (server.trim() === '' || protocol.trim() === '') {
            console.log('Invalid server or protocol.')
            return;
        }

        if (!port) {
            console.log('Invalid port.')
            return;
        } */

        // Create connection string
        //const connectionString = `${protocol}://${server}:${port}/mqtt`
        const connectionString = `ws://broker.hivemq.com:8000/mqtt`

        await connect(connectionString)
    }


    return (
        <div>
            
            {/* CONNECT TO SERVER */}
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
                    value={port?.toString()}
                    />
                </div>

                <input type="submit" value='Conectar'/>

            </form>

            { loading && 
                <div>
                    <p>Connecting to server...</p>
                </div>    
            }

            { client && 
                <div>
                    <Client client={client}></Client>
                </div>
            }

            
            { message && 
                <div>
                    <p>{message}</p>
                </div>
            }

        </div>
    )
}

export default Connection