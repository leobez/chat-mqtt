import { FormEvent, useState } from 'react'
import styles from './Connection.module.css'
import useConnectToBroker from '../../hooks/useConnectToBroker'
import Client from '../Client/Client'

const Connection = () => {

    const {loading, connect, disconnect, client} = useConnectToBroker()
    const [connectionString, setConnectionString] = useState<string>('')

    const handleConnect = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        const tempConectionStringForTesting = 'ws://broker.hivemq.com:8000/mqtt'
        //connect(connectionString)
        connect(tempConectionStringForTesting)
    }

    const handleDisconnect = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await disconnect()
    }

    return (
        <div className={styles.connectioncontainer}>

            <div className={styles.connection}>

                {/* CONNECT FORM */}
                <form onSubmit={handleConnect} className={styles.form}>

                <div>
                    <h1>
                        Connect to an MQTT broker:
                    </h1>
                </div>

                <div>
                    <label htmlFor="conString">Enter the broker URL:</label>
                    <input 
                    type="text" 
                    name='conString'
                    onChange={(e) => setConnectionString(e.target.value)}
                    value={connectionString}
                    />
                </div>

                <div className={styles.examples}>
                    <h2>Example of broker URLs:</h2>
                    <ul>
                        <li>ws://broker.hivemq.com:8000/mqtt</li>
                        <li>ws://test.mosquitto.org:8080</li>
                    </ul>
                </div>

                {loading ? (
                    <input type="submit" value='Connecting...' disabled/>
                ) : (
                    <input type="submit" value='Connect'/>
                )}  

                </form>
                
                {/* DISCONNECT FORM */}
                <form onSubmit={handleDisconnect}>
                    <input type="submit" value='Disconnect' />
                </form>

            </div>

            {/* STATES FROM CONNECTION */}
            <div className={styles.clientcontainer}>
                {loading && !client && <div><p>Connecting to server...</p></div>}
                {loading && client && <div><p>Disconnecting from server...</p></div>}
                {client && <Client client={client}></Client>} 
            </div>

        </div>
    )
}

export default Connection