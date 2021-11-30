import {CRow, CCol, CCard, CCardBody, CCardHeader, CButton } from "@coreui/react";
import {useEffect, useState, useCallback} from "react";
import {getConfigsReq, updateConfigsReq} from "../../queries/configs";

let configId = '';
const ProjectConfigs = (props) => {
  const [configs, setConfigs] = useState({});
  const editedConfigs = {...configs};

  const getConfigs = () => {
    getConfigsReq({}).then(({id, create_datetime, ...conf}) => {
      configId = id;
      setConfigs(conf);
    });
  }

  useEffect(() => {
    getConfigs();
  }, [props]);

  const onChange = (index, value) => {
    editedConfigs[index] = value;
    setConfigs(editedConfigs);
  }

  const renderTypes = (type, index) => {
    switch (type){
      case 'number':{
        return <input onChange={({target}) => onChange(index, Number(target.value))} className='form-control' type='number' value={editedConfigs[index]}/>
      }
      case 'boolean':{
        return <input onChange={({target}) => onChange(index, target.checked)} type='checkbox' checked={editedConfigs[index]}/>
      }
      default: return <input onChange={({target}) => onChange(index, target.value)} className='form-control' type='text' value={editedConfigs[index]}/>
    }
  }

  const onUpdate = () => {
    const NeedChange = ['shipping_fee', 'shipping_guarantee', 'express_shipping_cost', 'pickup_from_vendor_cost']
    Object.keys(editedConfigs).forEach(item => {
      if(NeedChange.indexOf(item) !== -1){
        editedConfigs[item] = {
          DIRHAMS: editedConfigs[item]
        }
      }
    });
    updateConfigsReq({
      config_id: configId,
      data: editedConfigs
    }).then(() => {
      getConfigs();
      alert('Success'); /*TODO: change to sweet alert*/
    })
  };

  return (
    <CRow>
       <CCol md={12}>
         <CCard>
           <CCardHeader>Configs</CCardHeader>
           <CCardBody>
             <table className='table table-striped table-hover'>
               <tbody>
               {
                 Object.keys(configs).map((item, index) => {
                   return (
                     <tr key={index}>
                       <td style={{textTransform: 'capitalize'}} width={250}>{item.replaceAll('_', ' ')}</td>
                       <td>
                         {renderTypes(typeof configs[item], item)}
                       </td>
                       <td width={100}>
                         <CButton color='info' block onClick={onUpdate.bind(this, item)}>
                           Update
                         </CButton>
                       </td>
                     </tr>
                   )
                 })
               }
               </tbody>
             </table>
           </CCardBody>
         </CCard>
       </CCol>
    </CRow>
  )
}

export default ProjectConfigs;
