import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Header from "../components/Header";
import Footer from "../components/Footer";


function App() {

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-between">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  )
}
export default App;