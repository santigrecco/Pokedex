import React,{ Component } from 'react';

export class HelloWorld extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {name} = this.props;
        return(
            <h1 className="hello-world">HELLO WORLD {name}</h1>
        )
    }
}