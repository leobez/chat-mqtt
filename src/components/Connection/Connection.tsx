// Hooks
import { FormEvent, useContext, useState } from 'react'
import useConnectToBroker from '../../hooks/useConnectToBroker'

// Context
import ClientContext from '../../context/ClientContext'
import { MQTTClientContextType } from '../../@types/mqtt'

// Components
import Client from '../Client/Client'
import FormButton from './FormButton'

const Connection = () => {

    // Context
    const {client} = useContext(ClientContext) as MQTTClientContextType

    // Connect hook
    const {connect, connectLoading, disconnect, disconnectLoading} = useConnectToBroker()

    // Component states
    const [connectionString, setConnectionString] = useState<string>('')
    
    const handleConnect = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        const tempConectionStringForTesting = 'ws://broker.hivemq.com:8000/mqtt'
        //connect(connectionString)
        connect(tempConectionStringForTesting)
    }

    const handleDisconnect = async():Promise<void> => {
        await disconnect()
    }

    const fillConnect = (e:any):void => {
        setConnectionString(e.target.innerText)
    }

    return (
        <div className='grid-cols-2'>
            <div className='grid px-1 gap-1'>

                {/* CONNECT FORM */}
                <form onSubmit={handleConnect} className='grid border-x-2 border-slate-900'>

                    <div className='text-xl py-4 px-2 bg-slate-200 text-slate-900 text-center'>
                        <p>
                            Connect to an MQTT broker
                        </p>
                    </div>

                    <div className='grid grid-rows-2 py-4 px-2 bg-slate-500 border-y-2 border-slate-900 text-slate-100'>
                        <label 
                        htmlFor="conString" 
                        className='text-lg'>
                            Enter the broker URL:
                        </label>

                        <input 
                        type="text" 
                        name='conString'
                        onChange={(e) => setConnectionString(e.target.value)}
                        value={connectionString}
                        className='border-2 border-black text-lg p-1 text-black'
                        />
                        
                    </div>

                    <div className='py-4 px-2 bg-slate-200'>
                        <p className='text-lg text-slate-900'>Example of broker URLs:</p>
                        <ul className='grid gap-1'>
                            <li className='item-list text-slate-900' onClick={fillConnect}>
                                ws://broker.hivemq.com:8884/mqtt
                            </li>
                            <li className='item-list text-slate-900' onClick={fillConnect}>
                                ws://test.mosquitto.org:8081
                            </li>
                        </ul>
                    </div>

                    <div className='grid grid-cols-2'>
                        
                        {/* CONNECT BUTTONS */}
                        <div>
                            {connectLoading && <FormButton value='C'></FormButton>}
                            {disconnectLoading && <FormButton value='D'></FormButton>}
                            {!connectLoading  && !disconnectLoading && <FormButton value='K'></FormButton>}
                        </div>

                        {/* DISCONNECT BUTTONS */}
                        <div>
                            {connectLoading     && <button disabled className='form-button' onClick={handleDisconnect}>Connecting...</button>}
                            {disconnectLoading  && <button disabled className='form-button' onClick={handleDisconnect}>Disconnecting...</button>}
                            {!connectLoading    && !disconnectLoading && <button disabled className='form-button' onClick={handleDisconnect}> Disconnect</button>}
                        </div>
                        
                    </div>

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