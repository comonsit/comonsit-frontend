import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

import classes from './Tabs.module.scss'


class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTab: this.props.children[0].props.label,
    }

    if (this.props.onSelectTab) {
      this.props.onSelectTab(this.state.activeTab)
    }
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab })
    if (this.props.onSelectTab) {
      this.props.onSelectTab(tab)
    }
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className={classes.Tabs}>
        <ol className={classes.TabsList}>
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className={classes.TabsContent}>
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
