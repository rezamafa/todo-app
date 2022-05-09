import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';

class App extends Component{
  render(): React.ReactNode {
    return(
      <div className="App">
       <h1>REACT NATIVE APP</h1>
      </div>
    );
  }
}

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render( <App /> );

