import { useContext, useState } from "react"
import mqtt from 'mqtt'
import MessageContext from "../context/MessageContext"

const useConnectToBroker = () => {
    
    const {changeMessage} = useContext(MessageContext)

    const [loading, setLoading] = useState<boolean>(false)
    //const [message, setMessage] = useState<string>('')
    const [client, setClient] = useState<any>(null)

    const connect = async(protocol:string, server:string, port:number|null):Promise<void> => {

        // Validate parameters
        if (protocol.trim() === '') {
            changeMessage('Invalid protocol.')
            console.log('Invalid protocol.')
            return;
        }

        if (server.trim() === '') {
            changeMessage('Invalid server.')
            console.log('Invalid server.')
            return;
        }

        if (!port) {
            changeMessage('Invalid port.')
            console.log('Invalid port.')
            return;
        } 

        // Create connection string
        const connectionString = `${protocol}://${server}:${port}/mqtt`
        //const connectionString = `ws://broker.hivemq.com:8000/mqtt`

        if (client !== null) {
            changeMessage('Already connected.')
            console.log('Already connected.')
            return;
        }

        try {
            setLoading(true)
            let tempClient = await mqtt.connect(connectionString)
            setClient(tempClient)
            setLoading(false)
            changeMessage('Connected.')
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessage('Something went wrong.')
        }
    }

    const disconnect = async(client:any):Promise<void> => {

        if (!client) {
            console.log('Already disconnected.')
            changeMessage('Already disconnected.')
            return;
        }

        try {
            setLoading(true)
            await client.end()
            setClient(null)
            setLoading(false)
            changeMessage('Disconnected.')
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessage('Something went wrong.')
        }
    }

    return {
        loading, 
        connect,
        disconnect,
        client
    }
}

export default useConnectToBroker;