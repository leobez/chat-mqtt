import './App.css'
import Page404 from './components/404/Page404'
import About from './components/About/About'
import Connection from './components/Connection/Connection'
import Feedback from './components/Feedback/Feedback'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { ClientContextProvider } from './context/ClientContext'
import { FeedbackContextProvider } from './context/FeedbackContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

    return (
        <div className='flex flex-col gap-[2px] m-[2px]'>
            <FeedbackContextProvider>
                <ClientContextProvider>

                    <header className='h-20 border border-black'>
                        <Header/>
                    </header>

                    <BrowserRouter basename='/chat-mqtt'>

                        <div className='border border-black'>
                            <Navbar/>
                        </div>

                        <main className='border border-black'>
                            <Routes>
                                <Route path='*' element={<Page404/>}></Route>
                                <Route path='/' element={<Connection/>}></Route>
                                <Route path='/about' element={<About/>}></Route>
                            </Routes>
                        </main>
                        
                    </BrowserRouter>
                    
                    <footer className='h-20 border border-black'>
                        <Footer/>
                    </footer>
            
                </ClientContextProvider>
            </FeedbackContextProvider>
        </div>
    )

}

export default App
