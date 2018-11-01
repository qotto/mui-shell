import React, {Component} from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import AndroidIcon from '@material-ui/icons/Android';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PetsIcon from '@material-ui/icons/Pets';
import StarRateIcon from '@material-ui/icons/StarRate';

import './style.css';

import MuiShell from '../../src'

const Home = () => <div>Home</div>;

const Page1 = () => <div>Page1</div>;

const Page2 = () => <div>Page2</div>;

const SubPage1 = () => <div>SubPage1</div>;

const SubPage2 = () => <div>SubPage2</div>;

const routes = {
  path: "",
  label: "Home",
  component: Home,
  menu: {
  	icon: <HomeIcon />,
    exact: true
  },
  children: [
    {
      path: "/page1",
      label: "Page 1",
      component: Page1,
	  menu: {
	  	icon: <AndroidIcon />
	  },
      children: [
        {
          path: "/subpage1",
          label: "Subpage 1",
          component: SubPage1,
		  menu: {
		  	icon: <FavoriteIcon />
		  }
        },
        {
          path: "/subpage2",
          label: "Subpage 2",
          component: SubPage2,
		  menu: {
		  	icon: <StarRateIcon />
		  }
        }
      ]
    },
    {
	  path: "/page2",
	  label: "Page 2",
	  component: Page2,
	  menu: {
	  	icon: <PetsIcon />
	  }
	}
  ]
};

class Demo extends Component {
  render() {
    return (
    	<BrowserRouter>
	      <MuiShell routes={routes} appTitle='Demo App' />
    	</BrowserRouter>
	);
  }
}

render(<Demo/>, document.querySelector('#demo'))
