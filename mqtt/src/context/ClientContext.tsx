import mqtt, { MqttClient } from "mqtt";
import { createContext, useState } from "react";

const ClientContext = createContext({
    client: null,
    changeClient: (client:MqttClient) => {}
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