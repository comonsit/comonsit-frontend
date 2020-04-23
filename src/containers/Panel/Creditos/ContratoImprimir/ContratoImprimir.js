import React, { Component } from 'react'
import ReactToPrint from "react-to-print";
import { Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'

import ContratoImprCont from './ContratoImprCont'
import Input from '../../../../components/UI/Input/Input';
import Title from '../../../../components/UI/Title/Title';
import classes from './ContratoImprimir.module.css'
import buttonClasses from '../../../../components/UI/Button/Button.module.css';
import * as actions from '../../../../store/actions'

class ContratoImprimir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      gerente: 'Alejandro Rodríguez Márquez'
    }
  }

  componentWillUnmount() {
    this.props.unSelContrato()
  }

  render () {
    // TODO: implement finish printing
    const updatedRedirect = (this.state.finished) ? <Redirect to="/creditos"/> : null
    // TODO: fetch GERENTES

    return (
      <>
        <Title
          titleName="contratoPrint.title"/>
        <div className={classes.SupportText}>
          <FormattedMessage id="contratoPrint.supportText"/>
        </div>
        <div className={classes.Inputs}>
          <Input
            label={<><FormattedMessage id="contratoPrint.gerente"/>*</>}
            elementType={'select'}
            elementConfig={{
              options: [
                {value: 'Alejandro Rodríguez Márquez', displayValue: 'Alejandro Rodríguez'},
                {value: '', displayValue: 'Vacío'}
              ]
            }}
            value={this.state.gerente}
            shouldValidate={{required: true}}
            touched={true}
            changed={(event) => this.setState({gerente: event.target.value})}
            />
        </div>
        <div className={classes.PrintButton}>
            <ReactToPrint
              trigger={() => <button className={buttonClasses.Button} btnType="Success"><FormattedMessage id="contratoPrint.imprimir"/></button>}
              content={() => this.componentRef}
            />
        </div>
        <div className={classes.SupportText}>
          <FormattedMessage id="contratoPrint.vistaPrevia"/>
        </div>
        <div className={classes.PreviewContainer}>
        <ContratoImprCont
          ref={el => (this.componentRef = el)}
          selCon={this.props.selContrato}
          selGerente={this.state.gerente}
        />
        </div>
        {updatedRedirect}
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      selContrato: state.creditos.selectedContrato,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      unSelContrato: () => dispatch(actions.unSelectContrato())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContratoImprimir)
