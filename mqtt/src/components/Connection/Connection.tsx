import { FormEvent, useEffect, useState } from 'react'
import styles from './Connection.module.css'
import useConnectToBroker from '../../hooks/useConnectToBroker'
import Client from '../Client/Client'

const Connection = () => {

    const {loading, connect, disconnect, client} = useConnectToBroker()

    /* STATES WITH BASE VALUES FOR TESTING - SET IT TO EMPTY LATER */
    const [protocol, setProtocol]   = useState<string>('ws')
    const [server, setServer]       = useState<string>('broker.hivemq.com')
    const [port, setPort]           = useState<number|null>(8000)

    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await connect(protocol, server, port)
    }

    const handleSubmitDisconnect = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await disconnect(client)
    }

    return (
        <div className={styles.connection}>
            
            {/* CONNECT FORM */}
            <form onSubmit={handleSubmit} className={styles.form}>

                <div>
                    <h1>
                        Connect to MQTT broker:
                    </h1>
                </div>

                <div>
                    <label htmlFor="protocol">Protocol:</label>
                    <input 
                    type="text" 
                    name='protocol'
                    onChange={(e) => setProtocol(e.target.value)}
                    value={protocol}
                    placeholder='ws'
                    />
                </div>

                <div>
                    <label htmlFor="server">Server:</label>
                    <input 
                    type="text" 
                    name='server'
                    onChange={(e) => setServer(e.target.value)}
                    value={server}
                    placeholder='broker.hivemq.com'
                    />
                </div>

                <div>
                    <label htmlFor="port">Port:</label>
                    <input 
                    type="text" 
                    name='port'
                    onChange={(e) => setPort(Number(e.target.value))}
                    value={port?.toString()}
                    placeholder='8000'
                    />
                </div>

                <div className={styles.full_url}>
                    <h2>Your connection string looks like:</h2>
                    <div>
                        {protocol.length===0 ? (<h2>protocol</h2>) : (<h2>{protocol}</h2>)}
                        <h2>://</h2>
                        {server.length===0 ? (<h2>server</h2>) : (<h2>{server}</h2>)}
                        <h2>:</h2>
                        {!port ? (<h2>port</h2>) : (<h2>{port}</h2>)}
                        <h2>/mqtt</h2>
                    </div>
                </div>

                <input type="submit" value='Connect'/>
                
            </form>

            {/* DISCONNECT FORM */}
            <form onSubmit={handleSubmitDisconnect}>
                <input type="submit" value='Disconnect' />
            </form>

            {/* STATES FROM CONNECTION */}
            { loading && <div><p>Connecting to server...</p></div> }

            { client && <Client client={client}></Client> }

        </div>
    )
}

export default Connection