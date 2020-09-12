import React from 'react'
import { FormattedMessage } from 'react-intl';
import classes from './HoverButton.module.scss'


const hoverButton = (props) => {

  const listItems = props.items.map(item =>
    (<li key={item}>
      <button type="button" onClick={() => props.clicked(item)}>
        <FormattedMessage id={props.title +'.'+ item}/>
      </button>
    </li>)
  )

  return (
    <>
      <nav className={classes.LangDropdownNav}>
        <ul className={classes.LangDropdownList}>
         <li className={classes.LangDropdownListItem}><FormattedMessage id={props.title}/> ▼
          <ul className={classes.Dropdown}>
            {listItems}
          </ul>
         </li>
       </ul>
      </nav>
    </>
  )
}

export default hoverButton
