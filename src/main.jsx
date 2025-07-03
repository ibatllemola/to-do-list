import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToDoList from './js/component/todolist.jsx'

createRoot(document.getElementById('root')).render(
  <ToDoList />
)
