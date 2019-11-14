import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import cl from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import PToolbar from '../../components/NavigationPanel/PToolbar/PToolbar';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render() {
    const isAuthenticated = false  // TODO: implement check if logged in
    let classes, menu
    if (isAuthenticated){
      classes = [cl.Content]
      menu = (
        <>
          <SideDrawer
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
          <Toolbar
            showMenu={this.sideDrawerOpenHandler}/>
        </>
        )
    } else {
      classes = [cl.PContent]
      menu = (
        <PToolbar
          showMenu={this.sideDrawerOpenHandler}/>
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
