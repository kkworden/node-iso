import React from 'react';

export class Home extends React.Component
{
	handleClick() {
		alert('Hello!');
	}

	render() {
		return (
			<div>
				This entire page is a react component. The react-router uses app.react.js to determine how everything is rendered. To make more pages,
				simply make more components! And then specify a route in <span style={{"background": "#efefef", "fontFamily": "monospace"}}>app/shared/routes.react.js</span>!

				<br /><br />

				<button onClick={this.handleClick}>This is part of a React component</button>
			</div>
		);
	}
}
