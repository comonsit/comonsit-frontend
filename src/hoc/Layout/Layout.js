import React, { Component } from 'react';
import { connect } from 'react-redux'

import classes from './Layout.module.scss';
import * as actions from '../../store/actions'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import HoverButton from '../../components/UI/HoverButton/HoverButton';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import PToolbar from '../../components/NavigationPanel/PToolbar/PToolbar';


class Layout extends Component {
  state = {
    showSideDrawer: false,
    auth: this.props.isAuthenticated,
    usr: this.props.user
  }

  componentDidUpdate(prevProps) {
    if(this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.setState({auth: this.props.isAuthenticated})
    }
    if(this.props.user !== prevProps.user) {
      this.setState({usr: this.props.user})
    }
  }

  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  onChangeLanguage = lang => {
    this.props.onToggleLang(lang);
  }

  render() {
    let layoutClasses, menu
    if (this.state.auth && this.state.usr){
      layoutClasses = [classes.PContent]
      menu = (
        <>
          <PToolbar
            showMenu={this.sideDrawerOpenHandler}
            isAuth={this.state.auth}
            open={this.state.showSideDrawer}
            user={this.state.usr}
            closed={this.sideDrawerClosedHandler}/>
        </>
      )
    } else {
      layoutClasses = [classes.Content]
      menu = (
        <>
          <SideDrawer
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
        <main className={layoutClasses.join(' ')}>
          {this.props.children}
        </main>
        <div className={classes.LanguageSelector}>
          <HoverButton title="language" items={['es', 'tz']} clicked={this.onChangeLanguage}/>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.generalData.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleLang: (lang) => dispatch(actions.onChangeLocale(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
