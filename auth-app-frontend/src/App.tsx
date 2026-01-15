
import './App.css'
import { Button } from './components/ui/button';
import { Calendar } from './components/ui/calendar';
function App() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">hello Fronted</h1>
      <Button variant={'destructive'}>Click Me</Button>
      <Calendar />
    </div>
  )
}

export default App
