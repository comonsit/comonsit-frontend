import React, {Component} from 'react';
import {connect } from 'react-redux'
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
    let classes, menu
    if (this.props.isAuthenticated){
      classes = [cl.PContent]
      menu = (
        <>
          <PToolbar
            showMenu={this.sideDrawerOpenHandler}
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
        </>
      )
    } else {
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)
