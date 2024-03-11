import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserHome from './views/user/UserHome.jsx'
import UserCreate from './views/user/UserCreate.jsx'
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" >
          <Route index element={<UserHome />} />
          <Route path={`create`} element={<UserCreate />} />
        </Route>
      </Routes>

    </Router>
  )
}

export default App
