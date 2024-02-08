import { useState } from "react"
import mqtt from 'mqtt'

const useConnectToBroker = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [client, setClient] = useState<any>(null)

    const connect = async(connectionString:string):Promise<void> => {

        if (client!==null) {
            console.log('Usuário já conectado.')
            setMessage('')
            return;
        }

        try {
            setLoading(true)
            let tempClient = await mqtt.connect(connectionString)
            setClient(tempClient)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            setMessage('Algo deu errado.')
        }
    }

    return {
        loading, 
        message,
        connect,
        client
    }
}

export default useConnectToBroker;