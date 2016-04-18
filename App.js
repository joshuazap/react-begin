/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(){
		super();
		this.state = { val: 0 };
		this.update = this.update.bind(this);
	}
	update() {
		this.setState({val: this.state.val +1 });
	}
	componentWillMount(){
		this.setState({multiplier: 2})
	}
	render(){
		console.log('rendering!')
		return (
			<button onClick={this.update}>
				{this.state.val * this.state.multiplier}
			</button>
		)
	}
	componentDidMount(){
		this.increment = setInterval(this.update,500);
	}
	componentWillUnmount(){
		clearInterval(this.increment)
	}
}

class Button extends React.Component {
	render(){
		return <button className="btn btn-lg btn-warning">{this.props.children}</button>
	}
}

class Wrapper extends React.Component {
	constructor(){
		super();
	}
	mount(){
		ReactDOM.render(<App />, document.getElementById('a'))
	}
	unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('a'))
	}
	render() {
		return (
			<div>
				<button onClick={this.mount.bind(this)}>Mount</button>
				<button onClick={this.unmount.bind(this)}>Unmount</button>
				<div id="a"></div>
			</div>
		)
	}
}
const Heart = () => <span className="glyphicon glyphicon-heart"></span>

ReactDOM.render(
	<Wrapper/>,
	document.getElementById('app')
);

export default Wrapper
