import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, About, Contact, Projects } from './pages';
import Navbar from './components/Navbar.jsx';

const RootApp = () => {
    return (
        <main className='bg-slate-300/20'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route
                        path='/*'
                        element={
                            <>
                                <Routes>
                                    <Route path='/about' element={<About />} />
                                    <Route path='/projects' element={<Projects />} />
                                    <Route path='/contact' element={<Contact />} />
                                </Routes>
                            </>
                        }
                    />
                </Routes>
            </Router>
        </main>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<RootApp />);

export default RootApp;
