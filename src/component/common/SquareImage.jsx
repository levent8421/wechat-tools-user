import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SquareImage.less';

class SquareImage extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    };
    static defaultProps = {
        src: '',
        alt: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            imageVisible: false,
        };
    }

    onRef(ele) {
        if (!ele) {
            return;
        }
        const parent = ele.parentElement;
        const {width, height} = window.getComputedStyle(parent);
        const size = width.localeCompare(height) > 0 ? height : width;
        if (ele.style.width === size) {
            return;
        }
        ele.style.width = size;
        ele.style.height = size;
        this.setState({imageVisible: true,});
    }

    renderImage() {
        const {imageVisible} = this.state;
        if (!imageVisible) {
            return;
        }
        const {src, alt} = this.props;
        return (<img src={src} alt={alt}/>);
    }

    render() {
        const _this = this;
        return (
            <div className="square-image" ref={ele => this.onRef(ele)}>
                {_this.renderImage()}
            </div>
        );
    }
}

export default SquareImage;