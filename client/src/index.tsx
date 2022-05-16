import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout, Home, NoPage, About, Login} from './pages'

class App extends Component{
  render(): React.ReactNode {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
    );
  }
}

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render( <App /> );

