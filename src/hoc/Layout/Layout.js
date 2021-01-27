import React, { Component } from 'react';
import { connect } from 'react-redux'

import classes from './Layout.module.scss';
import * as actions from '../../store/actions'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import HoverButton from '../../components/UI/HoverButton/HoverButton';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import PToolbar from '../../components/NavigationPanel/PToolbar/PToolbar';
import Loading from '../../containers/General/Loading/Loading';


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

  onChangeLanguage = lang => {
    this.props.onToggleLang(lang);
  }

  render() {
    let layoutClasses = []
    let menu
    if (this.props.isAuthenticated && this.props.user){
      layoutClasses = [classes.PContent]
      menu = (
        <>
          <PToolbar
            showMenu={this.sideDrawerOpenHandler}
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            user={this.props.user}
            closed={this.sideDrawerClosedHandler}
          />
        </>
      )
    } else {
      layoutClasses = [classes.Content]
      menu = (
        <>
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
          <Toolbar
            showMenu={this.sideDrawerOpenHandler}
            open={this.state.showSideDrawer}
          />
        </>
      )
    }


    if (
      this.props.initialLoading
      || this.props.authLoading
      || (this.props.isAuthenticated && !this.props.user && !this.props.role)
    ) {
      return <Loading />
    } else {
      return (
        <>
          {menu}
          <div className={classes.LanguageSelector}>
            <HoverButton
              title="language"
              items={['es', 'tz']}
              clicked={this.onChangeLanguage}
            />
          </div>
          <main className={layoutClasses.join(' ')}>
            {this.props.children}
          </main>
        </>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user,
    role: state.auth.role,
    authLoading: state.auth.loading,
    initialLoading: !state.auth.finishedAutoSignup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleLang: (lang) => dispatch(actions.onChangeLocale(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
