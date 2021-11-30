import {CCard, CCardBody, CCardHeader, CButton, CInput, CBadge} from "@coreui/react";
import CreatableSelect from 'react-select/creatable';
import {useEffect, useState} from "react";

const MultipleItemWithDefaultValue = ({title, data, onChange}) => {
  const [items, setItems] = useState([...data]);

  useEffect(() => {
    onChange(items)
  }, [items])

  const addNewRow = () => {
    setItems([
      ...items,
      {
        name: '',
        predefined: false,
        default_value: []
      }
    ])
  };

  const onChangeItem = (type, index, data) => {
    const newItems = [...items];
    switch (type){
      case 'item_name': {
        newItems[index]['name'] = data;
        setItems(newItems);
        break;
      }
      case 'default_value': {
        newItems[index]['default_value'] = data.map(item => item.value);
        setItems(newItems);
        break;
      }
      case 'is_mandatory': {
        newItems[index]['is_mandatory'] = data;
        setItems(newItems);
        break;
      }
      case 'delete': {
        newItems.splice(index, 1);
        setItems(newItems);
        break;
      }
      default: console.log(type, index, data);
    }
  }

  return (
    <CCard>
      <CCardHeader>{title} <CBadge color='primary'>{items.length}</CBadge></CCardHeader>
      <CCardBody>

        <div className="table-responsive">
          <table className='table table-stripped table-bordered'>
            <thead>
              <tr>
                <th>Item name</th>
                <th>Default value</th>
                <th>Is Mandatory</th>
                <th>Actions</th>
              </tr>
            </thead>
            {
              items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td><CInput onChange={({target}) => onChangeItem('item_name', index, target['value'])} disabled={item['predefined']} value={item.name}/></td>
                    <td>
                      <CreatableSelect
                        isMulti
                        isDisabled={item['predefined']}
                        placeholder='Default Value'
                        value={item['default_value'].map(item => ({value: item, label: item}))}
                        onChange={data => onChangeItem('default_value', index,data)}
                      />
                    </td>
                    <td>
                      <CInput onChange={({target}) => onChangeItem('is_mandatory', index, target['checked'])} type='checkbox' checked={item['predefined'] ? item['predefined'] : item['is_mandatory'] } disabled={item['predefined']}/>
                    </td>
                    <td>
                      <CButton color='danger' onClick={onChangeItem.bind(this,'delete', index, null)}>Delete</CButton>
                    </td>
                  </tr>
                )
              })
            }
            <tr>
              <td colSpan={3}>
                <CButton color='success' className='d-block w-100' size='sm' onClick={addNewRow}>Add new item</CButton>
              </td>
            </tr>
          </table>
        </div>

        <div className="table-responsive">
          <table className='table table-stripped table-bordered'>

          </table>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default MultipleItemWithDefaultValue;
