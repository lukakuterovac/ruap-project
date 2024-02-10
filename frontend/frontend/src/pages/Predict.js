import axios from "axios";
import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import PredictDataForm from '../components/PredictDataForm';

function Predict(){

    return(
        <div>
            <Nav></Nav>
            <p>This is predict page. Data:</p>        
            <PredictDataForm></PredictDataForm>
        </div>
    );
}

export default Predict;