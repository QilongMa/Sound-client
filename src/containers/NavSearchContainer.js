import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavSearch from '../components/NavSearch';
import {searchTracks} from '../actions/searchActions';

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            searchTracks:searchTracks
        }, dispatch
    )
}

export default connect(null, mapDispatchToProps)(NavSearch);