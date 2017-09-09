import React, {Component} from 'react';
import NavSearch from '../containers/NavSearchContainer';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {user} = this.props;
        return (
            <div className="nav">
                <div className="container clearfix">
                    <div className="nav-nav float-left">
                        <div className="nav-nav-item">
                            <a className="nav-nav-item-link active" href="/" title="">Sound Client</a>
                        </div>
                    </div>
                    <div className="nav-nav float-right">
                        <div className="nav-nav-item">
                            <div className="nav-search">
                                <i className="fa fa-search" aria-hidden="true"> </i>
                                <NavSearch/>
                            </div>

                        </div>
                        <div className="nav-nav-item">
                            <div className="nav-logo">
                                <i className="fa fa-user fa-2x sign-in" onClick={this.props.onAuth}
                                   aria-hidden="true"> </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}

export default Navbar;
