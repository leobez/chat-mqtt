import { useState } from "react"
import mqtt from 'mqtt'

const useConnectToBroker = () => {
    
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [client, setClient] = useState<any>(null)

    const connect = async(connectionString:string):Promise<void> => {

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