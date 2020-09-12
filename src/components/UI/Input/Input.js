import React from 'react'
import { FormattedMessage } from 'react-intl';
import classes from './Input.module.scss'
import Button from '../Button/Button'
import Alert from './Alert'


const input = (props) => {
    let label = null
    let inputElement = null
    let support = null
    let button = null
    const containerClasses = [classes.Input]
    const inputClasses = [classes.InputElement]
    const labelClasses = [classes.Label]
    let validationError = null

    if (props.focused) { inputClasses.push(classes.InputElementFocused)
    }
    if (props.labelLong) { labelClasses.push(classes.LabelLong) }
    if (props.label) {
      label = (
        <div className={labelClasses.join(' ')}>
          <label>{props.label}</label>
        </div>
      )
    }


    if (props.hide) {
      containerClasses.push(classes.HideMe)
    }

    if (props.invalid && props.shouldValidate && props.touched) {
      inputClasses.push(classes.Invalid)
      // TODO:  aquí habría que tunear a partir del state, similar al AlertMessage
      validationError = (<p className={classes.InvalidMessage}>&#60;&#8209;&#8209;</p>)
    } else if (props.alertMessage) {
      validationError = (<><div className={classes.AlertMessage}><Alert/>{props.alertMessage}</div></>)
    }

    switch (props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                 className={inputClasses.join(' ')}
                 {...props.elementConfig}
                 value={props.value}
                 disabled={props.disabled}
                 onBlur={props.supportActions ? props.supportActions.loseFocus : null}
                 onChange={props.changed} />
            break
        case ( 'checkbox' ):
            const labelCheckbox = (props.labelCheckbox) ? (
                <label for="r1"><FormattedMessage id={props.value ? props.labelCheckbox.checked : props.labelCheckbox.unChecked}/></label>) : null
            inputElement = (
              <div className={classes.elCheckboxCont}>
                <input
                   className={classes.elCheckbox}
                   {...props.elementConfig}
                   checked={props.value}
                   disabled={props.disabled}
                   onChange={props.changed} />
                 {labelCheckbox}
               </div>
             )
            break
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                disabled={props.disabled}
                onChange={props.changed} />
            break
        case ( 'select' ):
            const blankOption = props.elementConfig.optionBlank ? (<option key={props.elementConfig.options.length+1} value={""}>--</option>) : null
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    disabled={props.disabled}
                    onChange={props.changed} >
                    {blankOption}
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>)
            break
        case ( 'select_mult' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    disabled={props.disabled}
                    onChange={props.changed}
                    multiple
                    >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} selected={props.value.includes(option.value)}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>)
            break
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props}
                value={props.value}
                onChange={props.changed}
                 />
    }

    if (props.supportData) {
      support = ( <div className={classes.SupportData}>
                    <p>{props.supportData}</p>
                </div>)
    }
    if (props.supportActions && props.supportActions.supportButton) {
      button = (<Button btnType="Short" clicked={props.supportActions.supportButton}><FormattedMessage id={props.supportActions.suppButtLabelID}/></Button>)
    }

    return (
      <>
        <div className={containerClasses.join(' ')}>
            {label}
            <div className={classes.inputBox}>
              {inputElement}
              {validationError}
            </div>
        </div>
        {support}
        {button}
      </>
    )
}

export default input
