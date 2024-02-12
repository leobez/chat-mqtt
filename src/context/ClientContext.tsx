import mqtt, { MqttClient} from "mqtt";
import { createContext, useState } from "react";

interface MqttContextProps {
    client: MqttClient | null,
    changeClient: (client:MqttClient|null) => void,
}

const ClientContext = createContext<MqttContextProps|undefined>(undefined)

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