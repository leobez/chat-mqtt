import './App.css'
import Connection from './components/Connection/Connection'
import Feedback from './components/Feedback/Feedback'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Information from './components/Information/Information'
import { FeedbackMessageProvider } from './context/FeedbackMessageContext'

function App() {

    return (
        <div className="App">
            <FeedbackMessageProvider>

                <Header/>

                <Feedback/>

                <main>
                    <Information/>
                    <Connection/>
                </main>

                {/* FOR TESTING PURPOSES */}
                <div style={{height: '1000px'}}></div>

                <Footer/>

            </FeedbackMessageProvider>
        </div>
    )

}

export default App
