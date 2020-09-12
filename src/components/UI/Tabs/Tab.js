import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classes from './Tabs.module.scss'

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let tabClasses = [classes.TabListItem]

    if (activeTab === label) {
     tabClasses.push(classes.TabListItemActive)
    }

    return (
      <li
        className={tabClasses.join(' ')}
        onClick={onClick}
      >
        <FormattedMessage id={label}/>
      </li>
    );
  }
}

export default Tab;
