import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    let label = null
    let inputElement = null;
    const containerClasses = [classes.Input]
    const inputClasses = [classes.InputElement]
    const labelClasses = [classes.Label]
    let validationError = null

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
        // aquí habría que tunear a partir del state
        validationError = (<p className={classes.InvalidMessage}>&#60;&#8209;&#8209;</p>)
    }

    switch (props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                 className={inputClasses.join(' ')}
                 {...props.elementConfig}
                 value={props.value}
                 disabled={props.disabled}
                 onChange={props.changed} />
            break
        case ( 'checkbox' ):
            inputElement = <input
                 className={inputClasses.join(' ')}
                 {...props.elementConfig}
                value={props.value}
                 checked={props.value}
                 disabled={props.disabled}
                 onChange={props.changed} />
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
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    disabled={props.disabled}
                    onChange={props.changed} >
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
                onChange={props.changed} />
    }


    return (
        <div className={containerClasses.join(' ')}>
            {label}
            {inputElement}
            {validationError}
        </div>
    )
}

export default input
