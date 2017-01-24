// inferno module
import Inferno from 'inferno';

// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// app components
import MyApp from './MyApp';
import SceneComponent from './scene/SceneComponent';

if (module.hot) {
    require('inferno-devtools');
}

const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
		<Route component={ MyApp }>
			<Route path="/" component={ SceneComponent } />
		</Route>
	</Router>
);

Inferno.render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

