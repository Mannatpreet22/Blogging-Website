import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignUpPage } from './pages/SignUp'
import { SignInPage } from './pages/SignIn'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/signin' element={<SignInPage />}></Route>
          <Route path='/blog/:id' element={<Blog />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path='/publish' element={<Publish />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
