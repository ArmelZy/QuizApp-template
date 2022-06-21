import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Header from "./layout/header/header";
import Home from "./modules/home/home";
import {Quiz} from "./modules/quiz/quiz";
import Administration from "./modules/administration/administration";
import Footer from "./layout/footer/footer";

export const App = () => {
    return (
        <BrowserRouter>
            <div className="grid justify-content-center">
                <div className="col-8">
                    <Header/>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/quiz' element={<Quiz />} />
                        <Route path='/admin' element={<Administration />} />
                    </Routes>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
