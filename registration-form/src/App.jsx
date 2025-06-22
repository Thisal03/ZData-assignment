import { useState } from 'react'
import './App.css'
import { FormProvider } from './context/FormContext'
import RegistrationForm from './pages/RegistrationForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FormProvider>
      <div className="app-container">
        <RegistrationForm />
      </div>
    </FormProvider>
  )
}

export default App
