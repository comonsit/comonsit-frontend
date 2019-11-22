import React, {Component} from 'react';
import {connect } from 'react-redux'
import * as actions from '../../store/actions'
import {FormattedMessage} from 'react-intl';
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

  onChangeLanguage = (lang) => {
    this.props.onToggleLang(lang);
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
        <nav className={cl.LangDropdownNav}>
          <ul className={cl.LangDropdownList}>
           <li className={cl.LangDropdownListItem}>Idioma
            <ul className={cl.Dropdown}>
              <li><button type="button" onClick={() => this.onChangeLanguage('es')}>Español</button></li>
              <li><button type="button" onClick={() => this.onChangeLanguage('tz')}>Tseltal</button></li>
            </ul>
           </li>
         </ul>
        </nav>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleLang: (lang) => dispatch(actions.onChangeLocale(lang))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
