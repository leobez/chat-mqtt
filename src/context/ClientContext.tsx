import { MqttClient } from "mqtt";
import { ReactNode, createContext, useState } from "react";
import { MQTTClientContextType } from "../@types/mqtt";

export const ClientContext = createContext<MQTTClientContextType|null>(null)

type Props = {
    children: ReactNode
}

export const ClientContextProvider = ({children}:Props) => {

    const [client, setClient] = useState<MqttClient|null>(null)

    const updateClient = (client: MqttClient|null):void => {
        setClient(client)
    }

    return (
        <ClientContext.Provider value={{client, updateClient}}>
            {children}
        </ClientContext.Provider>        
    )

}

export default ClientContext