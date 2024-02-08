import './App.css'
import Connections from './components/Connections/Connections'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Information from './components/Information/Information'

function App() {

    return (
        <div className="App">

          <Header/>

          <main>
            <Information/>
            <Connections/>
          </main>

          <Footer/>
          
        </div>
    )

}

export default App
