import React, {Component} from 'react';

class Popout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.toggleIsOpen = this.toggleIsOpen.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.state.isOpen && !this.popout.contains(event.target)) {
            this.setState({
                isOpen: false
            });
        } else {

        }
    }

    toggleIsOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const {isOpen} = this.state;
        const {className, children} = this.props;
        const icon = React.cloneElement(children[0], {
            onClick: this.toggleIsOpen
        });
        return (
            <div
                ref={(ele) => this.popout = ele}
                className={`${className} popout`}
            >
                {icon}
                {isOpen ? children[1] : null}

            </div>
        )
    }
}

export default Popout;