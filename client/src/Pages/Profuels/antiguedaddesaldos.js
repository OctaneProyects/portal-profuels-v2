import React, { useEffect, useState } from 'react'
import UsrModel from '../../Models/UsrCredentials'
import { NavBar, HorizonNavBar } from '../../Components/NavBar';
import { NormalTable } from '../../Components/Table';
import AssessmentIcon from '@material-ui/icons/Assessment';
import axios from 'axios'

const Antiguedaddesaldos = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        consultaAntiguedaad();
    }, [])

    const consultaAntiguedaad = async () => {

        try {
            const { data } = await axios.post('/GetAntiguedad/', {});
            const dataFormat = data.data.map((e)=>{

                var rObj = {
                    'Estación':e['Estación'],
                    'Al dia':formatter.format(e['Al dia'])
                };
                return rObj;

                // return formatter.format(e['Al dia']);
            })
            setData(data.data);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <React.Fragment>
            <NavBar
                text={UsrModel.userName.toUpperCase()}
            />
            <HorizonNavBar
            />
            <main>
                <div style={{ height: '100%', backgroundColor: 'white', margin: '0 3% 1% 3%', padding: '1% 3% 1% 3%' }}>
                    <div className='row'>
                        <div className='col-md-11'>
                            <label className="titulo-seccion-form boldText">Antigüedad de saldos</label>
                        </div>
                        <div className='col-md-1' style={{ textAlign: 'right' }}>
                            <AssessmentIcon color='primary' fontSize='large'>
                            </AssessmentIcon>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-12'>
                            <NormalTable data={data} opc={false} title='Antiguedad de saldos'></NormalTable>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export default Antiguedaddesaldos
