import Router from 'react-router';

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="faq" handler={Faq} />
		<DefaultRoute handler={Home} />
	</Route>
);

export default routes;
