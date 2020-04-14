import React, {Component} from 'react';
import {connect } from 'react-redux'
import * as actions from '../../store/actions'
import cl from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import HoverButton from '../../components/UI/HoverButton/HoverButton';
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

  onChangeLanguage = (lang) => {
    this.props.onToggleLang(lang);
  }

  render() {
    let classes, menu
    if (this.props.isAuthenticated && this.props.user){
      classes = [cl.PContent]
      menu = (
        <>
          <PToolbar
            showMenu={this.sideDrawerOpenHandler}
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            user={this.props.user}
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
        <div className={cl.LanguageSelector}>
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
