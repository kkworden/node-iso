import React from 'react';

export class Home extends React.Component
{
	handleClick() {
		alert('Hello!');
	}

	render() {
		return (
			<button onClick={this.handleClick}>This is a React component</button>
		);
	}
}
