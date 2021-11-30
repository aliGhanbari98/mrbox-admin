// modules
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
// components
import { CRow, CCol, CCard, CCardHeader, CCardBody, CForm } from '@coreui/react'
import {
  MultiLangInput,
  FormField,
  TextField,
  MultiSelect,
  Button,
  EditablePhoto,
  Gallery,
  ProductDetails,
  Select,
} from 'src/components'
// queries
import {
  addProductReq,
  getSingleProduct,
  updateProductsReq,
} from 'src/queries/products'
import { getCategoriesReq } from 'src/queries/categories'
import { getOnlyVendorsReq } from 'src/queries/vendors'
// helpers
import {
  convertToSelectOption,
  convertArrayToObject,
  pickDataByLanguage,
} from 'src/helpers/functions'
import { successAlert } from 'src/helpers/alerts'
// styles
import options from 'src/constants/options'
import { getBrandsReq } from '../../../queries/brands'
import { InputGroup } from '../../../components'

interface Props {
  langs: Array<string>
}

const units_data = [
  {
    en: 'piece',
    ar: 'قطعة',
  },
  {
    en: 'number',
    ar: 'عدد',
  },
  {
    en: 'gram',
    ar: 'غرام',
  },
  {
    en: 'kilogram',
    ar: 'كيلوغرام',
  },
  {
    en: 'meter',
    ar: 'متر',
  },
  {
    en: 'centimeter',
    ar: 'سنتيمتر',
  },
  {
    en: 'liter',
    ar: 'لتر',
  },
  {
    en: 'milliliter',
    ar: 'مليلتر',
  },
  {
    en: 'copy',
    ar: 'نسخة',
  },
]

const AddProduct: FC<Props> = ({ langs }) => {
  const { updatingProductId } = useParams()
  const router = useHistory()

  const [title, setTitle] = useState({})
  const [subtitle, setSubtitle] = useState({})
  const [description, setDescription] = useState({})
  const [tags, setTags] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [categoryValue, setCategoryValue] = useState({})
  const [baseFileId, setBaseFileId] = useState('')
  const [includedCountries, setIncludedCountries] = useState([])
  const [excludedCountries, setExcludedCountries] = useState([])
  const [productCode, setProductCode] = useState([])
  const [details, setDetails] = useState([])
  const [warranty, setWarranty] = useState('')
  const [guarantee, setGuarantee] = useState('')
  const [isVatIncluded, setIsVatIncluded] = useState(false)
  const [vendorId, setVendorId] = useState('')
  const [vendor, setVendor] = useState({})
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [length, setLength] = useState('')
  const [weight, setWeight] = useState('')
  const [generalAttributes, setGeneralAttributes] = useState([])
  const [brand, setBrand] = useState('')
  const [brands, setBrands] = useState({})
  const [imagesState, setImages] = useState([])
  const [unit, setUnit] = useState({})

  const [categories, setCategories] = useState([
    { value: '', label: '', id: '' },
  ])
  const [vendors, setVendors] = useState([{}])

  const isUpdating = updatingProductId !== 'new'

  const getData = () => {
    getSingleProduct(updatingProductId).then(
      ({
        title,
        subtitle,
        tags,
        categories,
        image,
        brand,
        include_countries,
        exclude_countries,
        dimensions: { length, width, height },
        description,
        weight,
        product_code,
        warranty,
        guarantee,
        is_vat_included,
        details,
        files,
        vendor,
        unit,
        general_attributes,
      }) => {
        setTitle(title)
        setSubtitle(subtitle)
        setDescription(description)
        setBrand(brand.name)
        setProductCode(product_code)
        setWarranty(warranty)
        setGuarantee(guarantee)
        setTags(tags)
        setVendor({ label: vendor.title.EN, value: vendor.id })
        setIncludedCountries(include_countries)
        setExcludedCountries(exclude_countries)
        setUnit(unit)
        setWeight(weight)
        setWidth(width)
        setHeight(height)
        setLength(length)
        setIsVatIncluded(is_vat_included)
        setBaseFileId(image.thumbnail_url)
        setGeneralAttributes(general_attributes)
        setDetails(details)
        setImages(files)
        setCategoryValue(
          // categories.find(({ value }) => value === 'category_id') || {}
          {
            label: pickDataByLanguage(categories[0].title),
            value: categories[0].id,
          }
        )
      }
    )
  }

  const submit = (isDraft = false) => {
    const payload = {
      title,
      subtitle,
      tags,
      category_id: categoryId,
      base_file_id: baseFileId,
      brand,
      file_ids: isUpdating ? imagesState.map(({ id }) => id) : imagesState,
      include_countries: includedCountries,
      exclude_countries: excludedCountries,
      dimensions: {
        length,
        width,
        height,
      },
      description,
      weight,
      product_code: productCode,
      warranty,
      guarantee,
      is_vat_included: isVatIncluded,
      details,
      status: isDraft ? 'draft' : 'published',
      vendor_id: vendorId,
      unit,
      general_attributes: isUpdating
        ? generalAttributes
        : convertArrayToObject({
            data: generalAttributes,
            targetKey: 'key',
            targetValue: 'value',
          }),
    }

    const query = isUpdating
      ? updateProductsReq({ body: payload, id: updatingProductId })
      : addProductReq(payload)

    query.then(() => {
      successAlert(() => router.push('/products'))
    })
  }

  useEffect(() => {
    Promise.all([
      getCategoriesReq({ limit: 500 }).then(({ result }) =>
        setCategories(convertToSelectOption(result))
      ),
      getOnlyVendorsReq({ limit: 500 }).then(({ result }) => {
        setVendors(convertToSelectOption(result))
      }),
      getBrandsReq({ limit: 500 }).then(({ result }) => {
        setBrands(
          result.map((item) => ({ label: item.name, value: item.name }))
        )
      }),
    ])
    if (isUpdating) getData()
  }, [])

  return (
    <CRow>
      <CCol lg="12" className="mb-4">
        <Button
          text={isUpdating ? 'Update' : 'Save and publish'}
          className="pull-right"
          color="success"
          onClick={() => submit(false)}
        />
        {!isUpdating && (
          <Button
            text="Draft"
            className="pull-right mr-2"
            onClick={() => submit(true)}
          />
        )}
      </CCol>
      <CCol lg="8">
        <CCard>
          <CCardHeader>Information</CCardHeader>
          <CCardBody>
            <CForm>
              <MultiLangInput title="Title" data={title} setData={setTitle} />
              <MultiLangInput
                title="Subtitle"
                data={subtitle}
                setData={setSubtitle}
              />
              <MultiLangInput
                inputType="textArea"
                title="Description"
                data={description}
                setData={setDescription}
              />

              <MultiSelect
                isMulti={false}
                label="Brands"
                formText="Brands"
                options={brands}
                value={{ label: brand, value: brand }}
                onChange={({ value }) => setBrand(value)}
              />

              {/* {categoryId && (
                <MultiSelect
                  label="Sub Categories"
                  name="subCats"
                  isMulti={false}
                  options={categories}
                />
              )} */}
            </CForm>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>Product Photos</CCardHeader>
          <CCardBody>
            <CForm>
              <FormField label="Thumbnail Photo" isRow>
                <EditablePhoto
                  noMargin
                  src={baseFileId}
                  size="sm"
                  id="1"
                  onChange={({ id }) => setBaseFileId(id)}
                  onDelete={console.log}
                  onEdit={({ id }) => setBaseFileId(id)}
                />
              </FormField>
              <FormField label="Photos">
                <Gallery
                  setState={setImages}
                  isUpdating={isUpdating}
                  data={imagesState}
                />
              </FormField>
            </CForm>
          </CCardBody>
        </CCard>
        {/*<Attributes*/}
        {/*  items={*/}
        {/*    isUpdating*/}
        {/*      ? convertToAttributes(generalAttributes)*/}
        {/*      : generalAttributes*/}
        {/*  }*/}
        {/*  setState={setGeneralAttributes}*/}
        {/*  title="General Attributes"*/}
        {/*/>*/}
        <ProductDetails
          title="Product Attributes"
          items={details}
          setState={setDetails}
        />
      </CCol>
      <CCol lg="4">
        <CCard>
          <CCardHeader>Product Information</CCardHeader>
          <CCardBody>
            <CForm>
              <TextField
                label="Code"
                value={productCode}
                onChange={setProductCode}
              />
              <MultiSelect
                isMulti={false}
                options={vendors}
                label="Vendor"
                value={vendor}
                onChange={({ id, label }) => {
                  setVendor({ value: id, label })
                  setVendorId(id)
                }}
              />
              <MultiSelect
                label="Tags"
                name="tags"
                value={tags && convertToSelectOption(tags)}
                options={options.tags}
                onChange={setTags}
              />
              <MultiSelect
                label="Category"
                name="cats"
                options={categories}
                isMulti={false}
                value={categoryValue}
                onChange={({ id, label }) => {
                  setCategoryId(id)
                  setCategoryValue({ label, value: id })
                }}
              />
              <Select
                label="Product Unit"
                formText="Unit"
                options={units_data.map((item) => ({
                  label: item.en + ' / ' + item.ar,
                  value: item.en + '--|--' + item.ar,
                }))}
                onChange={({ target }) =>
                  setUnit({
                    'AR-AE': target.value.split('--|--')[1],
                    EN: target.value.split('--|--')[0],
                  })
                }
              />
            </CForm>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>Product Dimensions</CCardHeader>
          <CCardBody>
            <CForm>
              <InputGroup
                addon="Meter"
                label="Length"
                onChange={setLength}
                value={length}
                placeholder="In Meter: 0.1"
              />
              <InputGroup
                addon="Meter"
                label="Width"
                value={width}
                onChange={setWidth}
                placeholder="In Meter: 0.1"
              />
              <InputGroup
                addon="Meter"
                label="Height"
                value={height}
                onChange={setHeight}
                placeholder="In Meter: 0.1"
              />
              <InputGroup
                addon="Gram"
                label="Weight"
                value={weight}
                onChange={setWeight}
                placeholder="In Gram"
              />
            </CForm>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>Product Detail</CCardHeader>
          <CCardBody>
            <CForm>
              <MultiSelect
                label="Is Vat Included ?"
                name="vat_included"
                value={{
                  label: isVatIncluded ? 'Yes' : 'No',
                  value: isVatIncluded,
                }}
                options={options.boolean}
                onChange={({ value }) => setIsVatIncluded(value)}
                isMulti={false}
              />
              <TextField
                label="Warranty"
                value={warranty}
                onChange={setWarranty}
              />
              <TextField
                label="Guarantee"
                value={guarantee}
                onChange={setGuarantee}
              />
            </CForm>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>Product Availability</CCardHeader>
          <CCardBody>
            <CForm>
              <MultiSelect
                label="Included Countries"
                name="include_countries"
                value={
                  includedCountries && convertToSelectOption(includedCountries)
                }
                onChange={setIncludedCountries}
                options={options.countries}
              />
              <MultiSelect
                label="Excluded Countries"
                name="exclude_countries"
                value={
                  excludedCountries && convertToSelectOption(excludedCountries)
                }
                onChange={setExcludedCountries}
                options={options.countries}
              />
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddProduct
