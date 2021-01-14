import React, {Component} from 'react';
import styled from 'styled-components';
import Unsplash, {toJson} from 'unsplash-js';
import './Searcher.css';

const unsplash = new Unsplash({
    accessKey:'UE8mvlx_kxyz0FC7DWfOD9lJTdT6qUdG0PicnuM_rqc',
})

class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldempty: true,
            results: [],
        };
    }

    clickTag = (e) => {
        let tag = e.target.innerText;
        this.setState({value: tag});

        unsplash.search
        .photos(tag)
        .then(toJson)
        .then((JSON) => {
            this.setState({results: JSON.results})
            this.props.setStatus(true)
            this.props.setData(JSON.results)
            this.setState({fieldempty: true})
        })
        .catch(error => console.log(error));

        console.log(e)
    }

    render() {
        return (
            <div className="box">
                    <button className="sugg" data-name="purple" onClick={this.clickTag}>
                            Purple
                    </button>
                    <button className="sugg" data-name="yellow" onClick={this.clickTag}>
                            Yellow
                    </button>
                    <button className="sugg" onClick={this.clickTag}>
                            Green
                    </button>
                    <button className="sugg" onClick={this.clickTag}>
                            Red
                    </button>
                </div>
        )
    }
}

export default Tags;