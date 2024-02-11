import { useContext, useState } from "react"
import mqtt from 'mqtt'
import { MqttClient } from "mqtt"
import MessageContext from "../context/MessageContext"
import MessageAndStatus from "../classes/MessageAndStatus"

const useConnectToBroker = () => {
    
    const {changeMessageAndStatus} = useContext(MessageContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [client, setClient] = useState<MqttClient|null>(null)

    const connect = async(connectionString:string):Promise<void> => {

        if (connectionString.trim() === '') {
            changeMessageAndStatus(new MessageAndStatus('Connection string empty.', 'bad'))
            console.log('Connection string empty.')
            return;
        }

        if (client !== null) {
            changeMessageAndStatus(new MessageAndStatus('Already connected.', 'bad'))
            console.log('Already connected.')
            return;
        }

        try {
            setLoading(true)
            const mqttClient:MqttClient = mqtt.connect(connectionString)
            mqttClient.stream.on('error', async(err) => {
                if (err.message === 'WebSocket error') { 
                    changeMessageAndStatus(new MessageAndStatus('Connection failed.', 'bad'))
                } else {
                    changeMessageAndStatus(new MessageAndStatus('Something went wrong.', 'bad'))
                }
                await mqttClient.endAsync()
                setClient(null)
                setLoading(false)
            })

            mqttClient.stream.on('connect', () => {
                setClient(mqttClient)
                setLoading(false)
                changeMessageAndStatus(new MessageAndStatus('Connected.', 'good'))
            })  
            
        } catch (error:any) {
            setLoading(false)
            console.log(error)

            if (error.message === 'Missing protocol') {
                changeMessageAndStatus(new MessageAndStatus('Connection string is missing protocol.', 'bad'))
            } else {
                changeMessageAndStatus(new MessageAndStatus('Something went wrong.', 'bad'))
            }
        }
    }

    const disconnect = async(client:MqttClient|null):Promise<void> => {

        if (!client) {
            console.log('Already disconnected.')
            changeMessageAndStatus(new MessageAndStatus('Already disconnected.', 'bad'))
            return;
        }

        try {
            setLoading(true)
            await client.endAsync()
            setClient(null)
            setLoading(false)
            changeMessageAndStatus(new MessageAndStatus('Disconnected.', 'good'))
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessageAndStatus(new MessageAndStatus('Something went wrong.', 'bad'))
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