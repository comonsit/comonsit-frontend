import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import cl from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
// import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
//import DashToolbar from '../../components/Navigation/DashToolbar/DashToolbar';

class Layout extends Component {

  // state = {
  //   showSideDrawer: false
  // }
  //
  // sideDrawerOpenHandler = () => {
  //   this.setState((prevState) => {
  //     return {showSideDrawer: !prevState.showSideDrawer};
  //   });
  // }
  //
  // sideDrawerClosedHandler = () => {
  //   this.setState({showSideDrawer: false});
  // }

  render() {
    const isAuthenticated = true  // TODO: implement check if logged in
    let classes, menu
    if (isAuthenticated){
      classes = []
      menu = (
        <>
          <Toolbar/>
        </>
        )
    } else {
      classes = []
      menu = (
        <>
        </>
      )
    }

    return (
      <>
        {menu}
        <main className={classes.join(' ')}>
            {this.props.children}
        </main>
      </>
    )
  }
}

export default withRouter(Layout)
