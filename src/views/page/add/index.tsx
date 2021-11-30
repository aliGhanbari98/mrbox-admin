import {FC, useEffect, useState} from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CForm,
  CInput,
  CFormGroup,
  CLabel
} from '@coreui/react'
import {Button, CustomTabs, RichText} from 'src/components'
import {useSelector} from "react-redux";
import { useParams } from 'react-router'
import {useHistory} from 'react-router-dom';
import {getSinglePagesReq, updateSinglePagesReq} from "../../../queries/pages";

const AddPage: FC = () => {
  const { page_id } = useParams();
  const langs = useSelector(state => state['main'].langs);
  const [pagesData, setPagesData] = useState({});
  const history = useHistory();
  const isUpdating = page_id !== 'new'

  useEffect(() => {
    if (Object.keys(langs).length) {
      if(isUpdating){
        getData();
      }else{
        const newPagesData = {};
        Object.keys(langs).forEach(item => {
          newPagesData[langs[item].code] = {
            lang_name: langs[item].name,
            dir: langs[item].direction,
            title: '',
            subtitle: '',
            content: ''
          }
        });
        setPagesData(newPagesData);
      }
    }
  }, [langs]);

  const getData = () => {
    getSinglePagesReq(page_id).then(response => {
      const newPagesData = {};
      Object.keys(langs).forEach(item => {
        newPagesData[langs[item].code] = {
          lang_name: langs[item].name,
          dir: langs[item].direction,
          title: response.title[langs[item].code],
          subtitle: response.subtitle[langs[item].code],
          content: response.content[langs[item].code]
        }
      });
      setPagesData(newPagesData);
    })
  }

  const submit = () => {
    const Payload = {
      title: {},
      subtitle: {},
      content: {}
    };
    Object.keys(pagesData).forEach(item => {
      Payload.title[item] = pagesData[item].title;
      Payload.subtitle[item] = pagesData[item].subtitle;
      Payload.content[item] = pagesData[item].content;
    });
    updateSinglePagesReq({
      page_ids: [page_id],
      ...Payload
    }).then(() => {
      history.push('/pages');
    })
  }

  const onChange = ({key, value, lang}) => {
    const newPageData = {...pagesData};
    newPageData[lang][key] = value;
    setPagesData(newPageData);
  }

  return (
    <>
      <CRow className="center">
        <CCol lg="12">
          <CCard>
            <CCardHeader>Information</CCardHeader>
            <CCardBody>
              <CForm>
                <CustomTabs
                  data={Object.keys(pagesData).map(item => ({
                    title: pagesData[item].lang_name,
                    content: (
                      <div style={{direction: pagesData[item].dir, textAlign: pagesData[item].dir === 'ltr' ? 'left' : 'right'}}>
                        <CFormGroup>
                          <CLabel htmlFor="title">Title</CLabel>
                          <CInput type='text' id='title' value={pagesData[item].title} onChange={({target}) => onChange({key: 'title', value: target['value'], lang: item})}/>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="subtitle">Subtitle</CLabel>
                          <CInput type='text' id='subtitle' value={pagesData[item].subtitle} onChange={({target}) => onChange({key: 'subtitle', value: target['value'], lang: item})}/>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel>Content</CLabel>
                          {/*// @ts-ignore*/}
                          <RichText initial={pagesData[item].content} onChange={(value) => onChange({key: 'content', value, lang: item})}/>
                        </CFormGroup>
                      </div>
                    )
                  }))}/>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <Button text="Submit" onClick={submit} />
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AddPage
