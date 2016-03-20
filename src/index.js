import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// app
class App extends Component {
    render (){
        return  <div> Hello world </div>
    }
}

// render
ReactDOM.render(<App />, document.querySelector('.container'))
