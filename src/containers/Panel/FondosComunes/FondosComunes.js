/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Title from "../../../components/UI/Title/Title";
import Card from "../../../components/UI/Card/Card";
import CreditoList from "../Creditos/CreditoList/CreditoList";
import axios from "../../../store/axios-be.js";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import ContratoActions from "../Creditos/ContratoActions/ContratoActions";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Modal from "../../../components/UI/Modal/Modal";

const FondosComunes = (props) => {
  const [fondosComunes, setFondosComunes] = useState([]);
  const [showContrato, setShowContrato] = useState(false);
  const [pagos, setPagos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const authData = {
        headers: { Authorization: `Bearer ${props.token}` },
      };
      const result = await axios.get("/contratos/?fondocomun=1", authData);
      setFondosComunes(result.data);
    };
    fetchData();
    props.unSelContrato();
    return () => {
      setFondosComunes([]);
    };
  }, []);

  const onShowContrato = async (id) => {
    setShowContrato(true);
    const authData = { headers: { Authorization: `Bearer ${props.token}` } };
    // const selContrato = await axios.get(`/contratos/${id}.json?fondocomun=1`, authData)
    props.onFetchSelContrato(props.token, id, true);
    const selContratoPagos = await axios.get(
      "/contratos/" + id + "/pagos/?fondocomun=1",
      authData
    );
    setPagos(selContratoPagos.data);
  };

  const cancelSelected = () => {
    setShowContrato(false);
    props.unSelContrato();
  };

  return (
    <>
      <Title titleName="FondosComunes.title"></Title>
      <Modal show={showContrato} modalClosed={cancelSelected}>
        {props.selContrato?.id && pagos ? (
          <ContratoActions
            selContrato={props.selContrato}
            pagos={pagos}
            role={props.role}
          />
        ) : (
          <Spinner />
        )}
      </Modal>
      <Card table>
        <CreditoList
          data={fondosComunes}
          fondos_comunes={true}
          onClick={(row) => onShowContrato(row.values.id)}
        />
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    role: state.auth.role,
    selContrato: state.creditos.selectedContrato,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onInitFondosComunes: (token, all) => dispatch(actions.initFondosComunes(token, all)),
    onFetchSelContrato: (token, id, fc) =>
      dispatch(actions.fetchSelContrato(token, id, fc)),
    unSelContrato: () => dispatch(actions.unSelectContrato()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(FondosComunes, axios));
