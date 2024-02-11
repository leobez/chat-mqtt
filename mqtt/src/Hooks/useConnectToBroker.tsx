import { useContext, useState } from "react"
import mqtt from 'mqtt'
import { MqttClient } from "mqtt"
import MessageContext from "../context/MessageContext"

const useConnectToBroker = () => {
    
    const {changeMessage} = useContext(MessageContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [client, setClient] = useState<MqttClient|null>(null)

    const connect = async(connectionString:string):Promise<void> => {

        if (connectionString.trim() === '') {
            changeMessage('Connection string empty.')
            console.log('Connection string empty.')
            return;
        }

        if (client !== null) {
            changeMessage('Already connected.')
            console.log('Already connected.')
            return;
        }

        try {
            setLoading(true)

            const mqttClient:MqttClient = mqtt.connect(connectionString)

            mqttClient.stream.on('error', async(err) => {
                if (err.message === 'WebSocket error') { 
                    changeMessage('Connection failed.')
                } else {
                    changeMessage('Something went wrong.')
                }
                await mqttClient.endAsync()
                setClient(null)
                setLoading(false)
            })

            mqttClient.stream.on('connect', () => {
                setClient(mqttClient)
                setLoading(false)
                changeMessage('Connected.')
            })  
            
        } catch (error:any) {
            setLoading(false)
            console.log(error)

            if (error.message === 'Missing protocol') {
                changeMessage('Connection string is missing protocol.')
            } else {
                changeMessage('Something went wrong.')
            }
        }
    }

    const disconnect = async(client:MqttClient|null):Promise<void> => {

        if (!client) {
            console.log('Already disconnected.')
            changeMessage('Already disconnected.')
            return;
        }

        try {
            setLoading(true)
            await client.endAsync()
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