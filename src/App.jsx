import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='flex min-h-screen'>
      <Sidebar/>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <MainPanel />
        <Footer/>
      </div>
    </div>
  )
}
