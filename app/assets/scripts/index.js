import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// app
class App extends Component {
    render (){
        return  (
            <div>
                <div> Hello teste 7 </div>
                <div> Hello teste 7 </div>
                <div> Hello teste 7 </div>
            </div>
        )
    }
}

// render
ReactDOM.render(<App />, document.querySelector('.container'))
