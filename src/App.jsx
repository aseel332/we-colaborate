import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'  
import Signup from './pages/Signup'
import Project from './pages/Project'
import './App.css'
import JoinProject from './pages/JoinProject'
import Branch from './pages/Branch'
import TaskView from './pages/TaskView'

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" 
        element={
          localStorage.getItem("token") ? <Navigate to="/home" replace/> : <Navigate to="/login" replace/>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />  
        <Route path="/project/:id"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />

        <Route path="/join-project" element={
          <ProtectedRoute>
          <JoinProject />
          </ProtectedRoute>
        } />
      
        <Route path="/project/:id/branch/:branchId" element={
          <ProtectedRoute>
             <Branch />
          </ProtectedRoute>
        } />
        <Route path="/project/:id/branch/:branchId/task/:taskId" element={
          <ProtectedRoute>
            <TaskView />
          </ProtectedRoute>
        } />
        
      </Routes>
    </Router> 
  )
}

export default App
