import React, {Component} from 'react';
import styled from 'styled-components';
import Unsplash, {toJson} from 'unsplash-js';
import './Searcher.css';
import Tags from './Tags';
import {
    HashRouter as Router,
    Redirect
  } from "react-router-dom";
const unsplash = new Unsplash({
    accessKey:'UE8mvlx_kxyz0FC7DWfOD9lJTdT6qUdG0PicnuM_rqc',
})



const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
margin: 50px auto;
`;

const Field = styled.input`
flex-basis: 60%;
margin: 0;
position: relative;
padding: 15px 15px;
border: 1px solid #ddd;
border-radius: 20px;
color: #000;

&:focus {
    outline: none;
}
`;

const SuggList = styled.ul`
background-color: #fff;
border: 0.5px solid #aaa;
list-style: none;
margin: 0;
padding: 0;
position: relative;
`;

const Sug = styled.li`
padding: 10px;
margin: 0;


&:hover {
    cursor: pointer;
    background-color: #ddd;
}
`;


class Searcher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            results: [],
            suggestions: [],
            fieldempty: true
        };

        this.searchPhoto = this.searchPhoto.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    searchPhoto = async (e) => {
        if(e){
            e.preventDefault();
        }
        
        unsplash.search
        .photos(this.state.value)
        .then(toJson)
        .then((JSON) => {
            this.setState({results: JSON.results})
            this.props.updateStatus(true)
            this.props.updateData(JSON.results)
            console.log(JSON.results)
            this.setState({fieldempty: true})
        })
        .catch(error => console.log(error));
 
    }

    clickSuggestion = (e) => {
        let query = e.target.dataset.query;
        console.log(query);
        this.setState({value: query});
        this.searchPhoto();
        this.setState({fieldempty: true})
    }

    getPhoto = () => {
        unsplash.search
        .photos(this.state.value)
        .then(toJson)
        .then((JSON) => {
            this.setState({results: JSON.results}) 
            JSON.results.map((res) => {
                res.tags.map((tag) => {
                    
                    this.setState(prevState => {
                        return ({
                            suggestions: prevState.suggestions.concat(tag.title) 
                        })
                    })
                })
            });
            
            this.filtrSuggestions();
        })
    }          

    handleInputChange = () => {
        this.setSuggestions();
        this.setState({
            value: this.search.value
          }, () => {
              if (this.state.value && this.state.value.length >= 3) {
                  this.getPhoto();
              } else if (!this.state.value) return
          })
    }

    filtrSuggestions = () => {

        this.setState((state) => {
            let suggestionList = state.suggestions.filter((sug) => {
                return(sug.includes(this.search.value));
            });

            let newSuggestionList = suggestionList.filter((item, pos) => {
                return suggestionList.indexOf(item) === pos;
            })
            
                return({
                    suggestions: newSuggestionList
            })
        })
    }

    setSuggestions = () => {
        
        if(this.search.value === "" && this.state.suggestions.length === 0) {
            this.setState({fieldempty: true})

        } else if(this.search.value === "" && this.state.suggestions.length !== 0) {

            this.setState({fieldempty: true})
            this.setState({suggestions: []})
            

        } else if (this.search.value !== "") {

            this.setState({fieldempty: false})
        }
    }



    render() {
        let sugg = this.state.suggestions.length;
        let empty = this.state.fieldempty;

        return (
            <>
                <Form onSubmit={this.searchPhoto}>

                    <Field 
                    type='text' 
                    defaultValue={this.state.value} 
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    placeholder='Search free high-resolution photos'></Field>

                {(!empty && sugg!==0) && 
                    <SuggList>{this.state.suggestions.map((sug) => (
                        <Sug 
                        onClick={this.clickSuggestion} 
                        data-query={sug}>{sug}
                        </Sug>)   
                    )}
                    </SuggList>}

                {(!empty && sugg === 0) && <SuggList>
                    <Sug>No suggestions</Sug>
                    </SuggList>}

                </Form>

                <Tags setData={this.props.updateData} setStatus = {this.props.updateStatus}/>

                {this.props.searchStatus &&
                    <Redirect to={{
                        pathname: '/results',
                        state: { results: this.state.results }
                    }}/>
                }
            </>
        )
    }
}

export default Searcher;
