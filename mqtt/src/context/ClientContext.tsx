import mqtt, { MqttClient } from "mqtt";
import { createContext, useState } from "react";

/* ? cant do it without any, so leave it for now */
const ClientContext = createContext({
    client: (mqtt.connect('') || null) as any,
    changeClient: (client:MqttClient|null) => {}
})

export const ClientContextProvider = ({children}:any) => {

    const [client, setClient] = useState<MqttClient|null>(null)

    const changeClient = (client:MqttClient|null) => {
        setClient(client)
    }

    return (
        <ClientContext.Provider value={{client, changeClient}}>
            {children}
        </ClientContext.Provider>        
    )

}

export default ClientContext