import { useState } from "react"
import mqtt from 'mqtt'

const useConnectToBroker = () => {
    
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [client, setClient] = useState<any>(null)

    const connect = async(protocol:string, server:string, port:number|null):Promise<void> => {

        // Validate parameters
        if (server.trim() === '') {
            setMessage('Invalid server.')
            console.log('Invalid server.')
            return;
        }

        if (protocol.trim() === '') {
            setMessage('Invalid protocol.')
            console.log('Invalid protocol.')
            return;
        }

        if (!port) {
            setMessage('Invalid port.')
            console.log('Invalid port.')
            return;
        } 

        // Create connection string
        const connectionString = `${protocol}://${server}:${port}/mqtt`
        //const connectionString = `ws://broker.hivemq.com:8000/mqtt`

        if (client !== null) {
            console.log('Already connected.')
            setMessage('Already connected.')
            return;
        }

        try {
            setLoading(true)
            let tempClient = await mqtt.connect(connectionString)
            setClient(tempClient)
            setLoading(false)
            setMessage('Connected.')
        } catch (error) {
            setLoading(false)
            console.log(error)
            setMessage('Something went wrong.')
        }
    }

    const disconnect = async(client:any):Promise<void> => {

        if (!client) {
            console.log('Already disconnected.')
            setMessage('Already disconnected.')
            return;
        }

        try {
            setLoading(true)
            await client.end()
            setClient(null)
            setLoading(false)
            setMessage('Disconnected.')
        } catch (error) {
            setLoading(false)
            console.log(error)
            setMessage('Something went wrong.')
        }
    }

    return {
        loading, 
        message,
        connect,
        disconnect,
        client
    }
}

export default useConnectToBroker;