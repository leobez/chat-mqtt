import { FormEvent, useState } from 'react'
import styles from './Connection.module.css'
import useConnectToBroker from '../../hooks/useConnectToBroker'
import Client from '../Client/Client'

const Connection = () => {

    const {loading, connect, disconnect, client} = useConnectToBroker()
    const [connectionString, setConnectionString] = useState<string>('')

    const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        const tempConectionStringForTesting = 'ws://broker.hivemq.com:8000/mqtt'
        connect(connectionString)
        //connect(tempConectionStringForTesting)
    }

    const handleSubmitDisconnect = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await disconnect()
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
                    <label htmlFor="conString">Connection String: </label>
                    <input 
                    type="text" 
                    name='conString'
                    onChange={(e) => setConnectionString(e.target.value)}
                    value={connectionString}
                    placeholder='ws://broker.hivemq.com:8000/mqtt'
                    />
                </div>

                <div className={styles.examples}>
                    <h2>Example of connection strings:</h2>
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