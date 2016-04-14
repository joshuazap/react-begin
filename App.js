/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';

// class App extends React.Component {
// 	render() {
// 		return (
// 			<div>
// 				<h1>React.js Elements</h1>
// 				<h3>This is a React.js class component which can have a state.</h3>
// 			</div>
// 		);
// 	}
// }

// class App extends React.Component {
// 	render() {
// 		return <div>Adjacent JSX elements...</div> <div>...must be wrapped in an enclosing tag.</div>
// 	}
// }

// class App extends React.Component {
// 	render() {
// 		return React.createElement('div', null, 'All JSX is transpiled into JavaScript. This is what happens under the hood when you use JSX.')
// 	}
// }

// const App = () => <div>This is a React.js "stateless" function component, which will not have state.</div>

class App extends React.Component {
	// React uses a constructor method to manage states - states are handled by the app while props are passed into the app
	constructor() {
		// super() gives context for `this` in the component
		super();
		this.state = {
			txt: 'this is the state text',
			cat: 0,
			red: 128,
			green: 128,
			blue: 128
		};
		// Bind this.update to save some time below
		this.update = this.update.bind(this);
	}
	// A custom method to manage the state
	update(){
		this.setState({
			cat: this.state.cat +1,
			red: ReactDOM.findDOMNode(this.refs.red.refs.itsOwnRef).value,
			green: ReactDOM.findDOMNode(this.refs.green.refs.itsOwnRef).value,
			blue: ReactDOM.findDOMNode(this.refs.blue.refs.itsOwnRef).value
		});
	}
	componentWillMount() {
		console.log('mount!')
	}
	render(){
		console.log('render!')
		// let txt = this.props.txt
		// return <h1>{txt}</h1>
		// return <h1>{this.state.txt}</h1>
		return (
			<div>
				<h1>A simple slider using React.js</h1>
				<hr />
				<h3><font color="red">Simple red</font></h3>
				<Slider ref="red" update={this.update} />
				<h4>{this.state.red}</h4>
				<br />
				<h3><font color="green">Simple green</font></h3>
				<Slider ref="green" update={this.update} />
				<h4>{this.state.green}</h4>
				<br />
				<h3><font color="blue">Simple blue</font></h3>
				<Slider ref="blue" update={this.update} />
				<h4>{this.state.blue}</h4>
				<hr />
				<h3>A button with nested component!</h3>
				<Button>I <Heart /> React</Button>
				<button class="btn" onClick={this.update}>{this.state.cat} times!</button>
				<Wrapper></Wrapper>
			</div>
		)
	}
	// After a component has been mounted to the DOM
	componentDidMount(){
		console.log('mounted!');
	}
	// When removing a component from the DOM
	componentWillUnmount(){
		console.log('unmount!');
	}
}

// Refs won't work with stateless components
// const Widget = (props) => {
// 	return (
// 		<div>
// 			<input type = "text" 
// 			onChange={props.update} />
// 			<h1>{props.txt}</h1>
// 		</div>
// 	);
// }

// This is an example using refs
class Slider extends React.Component {
	render(){
		return (
		<div>
			<input ref="itsOwnRef" type="range" 
			min="0" 
			max="255" 
			onChange={this.props.update} />
		</div>
		);
	}
}

class Button extends React.Component {
	render(){
		return <button className="btn btn-lg btn-primary">{this.props.children}</button>
	}
}

const Heart = () => <span className="glyphicon glyphicon-heart"></span>

class Wrapper extends React.Component {
	mount(){
		ReactDOM.render(<App />, document.getElementById('a'))
	}
	unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('a'))
	}
	render() {
		return(
			<div>
				<button onClick={this.mount.bind(this)}>Mount</button>
				<br />
				<button onClick={this.unmount.bind(this)}>Unmount</button>
				<br />
				<div id="a">W00t!</div>
				<hr />
			</div>
		)
	}
}

// React allows definition of the expected property types
App.propTypes = {
	txt: React.PropTypes.string,
	cat: React.PropTypes.number.isRequired
};

// React allows definition of default property types
App.defaultProps = {
	txt: 'This is the default text'
}

ReactDOM.render(
	<App cat={5} />,
	document.getElementById('app')
);

export default App
