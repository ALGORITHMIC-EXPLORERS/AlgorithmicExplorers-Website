import { Routes, Route} from 'react-router-dom'
import Home from './pages/Homepage'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
