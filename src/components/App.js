import React, {Component} from 'react';
import NavbarMenu from '../containers/NavbarContainer';
import Player from '../containers/PlayerContainer';

class App extends Component {

    render() {
        return(
            <div>
                <NavbarMenu />
                {this.props.children}
                <Player />
            </div>
        )
    }
}

export default App;


