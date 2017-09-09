import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navbar from '../components/NavbarMenu';
import {auth} from '../actions';
function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onAuth: auth
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);