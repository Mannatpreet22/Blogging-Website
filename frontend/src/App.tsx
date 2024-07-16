import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignUpPage } from './pages/SignUp'
import { SignInPage } from './pages/SignIn'
import { Blog } from './pages/Blog'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/signin' element={<SignInPage />}></Route>
          <Route path='/blog' element={<Blog />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
