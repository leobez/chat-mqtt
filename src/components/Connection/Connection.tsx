// Hooks
import { FormEvent, useContext, useState } from 'react'
import useConnectToBroker from '../../hooks/useConnectToBroker'

// Context
import ClientContext from '../../context/ClientContext'
import { MQTTClientContextType } from '../../@types/mqtt'

// Components
import Client from '../Client/Client'

const Connection = () => {

    // Context
    const {client} = useContext(ClientContext) as MQTTClientContextType

    // Connect hook
    const {connect, connectLoading, disconnect, disconnectLoading} = useConnectToBroker()

    // Component states
    const [connectionString, setConnectionString] = useState<string>('')
    
    const handleConnect = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        //const tempConectionStringForTesting = 'ws://broker.hivemq.com:8000/mqtt'
        connect(connectionString)
        //connect(tempConectionStringForTesting)
    }

    const handleDisconnect = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await disconnect()
    }

    return (
        <div>

            <div>

                {/* CONNECT FORM */}
                <form onSubmit={handleConnect}>

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

                <div>
                    <h2>Example of broker URLs:</h2>
                    <ul>
                        <li>ws://broker.hivemq.com:8884/mqtt</li>
                        <li>ws://test.mosquitto.org:8081</li>
                    </ul>
                </div>

                {connectLoading     && <input type='submit' value='Connecting...' disabled/>}
                {disconnectLoading  && <input type='submit' value='Disconnecting...' disabled/>}
                {!connectLoading    && !disconnectLoading && <input type='submit' value='Connect'/>}

                </form>
                
                {/* DISCONNECT FORM */}
                <form onSubmit={handleDisconnect}>
                    {connectLoading     && <input type='submit' value='Connecting...' disabled/>}
                    {disconnectLoading  && <input type='submit' value='Disconnecting...' disabled/>}
                    {!connectLoading    && !disconnectLoading && <input type='submit' value='Disconnect'/>}
                </form>

            </div>

            {/* STATES FROM CONNECTION */}
            <div>
                {connectLoading && !client && <div><p>Connecting to server...</p></div>}
                {disconnectLoading && client && <div><p>Disconnecting from server...</p></div>}
                {client && <Client/>} 
            </div>

        </div>
    )
}

export default Connection