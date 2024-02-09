import './App.css'
import Connection from './components/Connection/Connection'
import Feedback from './components/Feedback/Feedback'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Information from './components/Information/Information'
import { MessageProvider } from './context/MessageContext'

function App() {

    return (
        <div className="App">
            <MessageProvider>

                <Header/>

                <Feedback/>

                <main>
                    <Information/>
                    <Connection/>
                </main>

                <Footer/>

            </MessageProvider>
        </div>
    )

}

export default App
