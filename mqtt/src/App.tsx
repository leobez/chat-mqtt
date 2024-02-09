import './App.css'
import Connection from './components/Connection/Connection'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Information from './components/Information/Information'

function App() {

    return (
        <div className="App">

          <Header/>

          <main>
            <Information/>
            <Connection/>
          </main>

          <Footer/>
          
        </div>
    )

}

export default App
