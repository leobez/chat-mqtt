import './App.css'
import Page404 from './components/404/Page404'
import About from './components/About/About'
import Connection from './components/Connection/Connection'
import Feedback from './components/Feedback/Feedback'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { ClientContextProvider } from './context/ClientContext'
import { FeedbackMessageProvider } from './context/FeedbackMessageContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

    return (
        <div className="App">
            <FeedbackMessageProvider>
                <ClientContextProvider>

                    <Feedback/>

                    <header>
                        <Header/>
                    </header>

                    <main>
                        <BrowserRouter>

                            <Navbar/>

                            <Routes>
                                <Route path='/' element={<Connection/>}></Route>
                                <Route path='/about' element={<About/>}></Route>
                                <Route path='*' element={<Page404/>}></Route>
                            </Routes>

                        </BrowserRouter>
                    </main>

                    <footer>
                        <Footer/>
                    </footer>
            
                </ClientContextProvider>
            </FeedbackMessageProvider>
        </div>
    )

}

export default App
