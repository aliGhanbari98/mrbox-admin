import React from 'react'

// mine
const Customers = React.lazy(() => import('./views/customers'))
const Dashboard = React.lazy(() => import('./views/dashboard'))
const Admin = React.lazy(() => import('./views/admins'))
const AddAdmin = React.lazy(() => import('./views/admins/add'))
const Vendor = React.lazy(() => import('./views/vendors'))
const Driver = React.lazy(() => import('./views/drivers'))
const AddDriver = React.lazy(() => import('./views/drivers/add'))
const SingleDriver = React.lazy(() => import('./views/drivers/single'))
const SingleCustomer = React.lazy(() => import('./views/customers/single'))
const AddCustomer = React.lazy(() => import('./views/customers/add'))
const Products = React.lazy(() => import('./views/products'))
const SingleProduct = React.lazy(() => import('./views/products/single'))
const AddProduct = React.lazy(() => import('./views/products/add'))
const SingleVendor = React.lazy(() => import('./views/vendors/single'))
const AddVendor = React.lazy(() => import('./views/vendors/add'))
const Banners = React.lazy(() => import('./views/banners'))
const SingleBanner = React.lazy(() => import('./views/banners/single'))
const AddBanner = React.lazy(() => import('./views/banners/add'))
const Promotions = React.lazy(() => import('./views/promotions'))
const SinglePromotion = React.lazy(() => import('./views/promotions/single'))
const AddPromotion = React.lazy(() => import('./views/promotions/add'))
const Categories = React.lazy(() => import('./views/categories'))
const SingleCategory = React.lazy(() => import('./views/categories/single'))
const AddCategory = React.lazy(() => import('./views/categories/add'))
const Orders = React.lazy(() => import('./views/orders'))
const SingleOrder = React.lazy(() => import('./views/orders/single'))
const Coupons = React.lazy(() => import('./views/coupons'))
const AddCoupon = React.lazy(() => import('./views/coupons/add'))
const GiftCards = React.lazy(() => import('./views/giftCards'))
const AddGiftCard = React.lazy(() => import('./views/giftCards/add'))
const Entities = React.lazy(() => import('./views/entities'))
const AddEntity = React.lazy(() => import('./views/entities/add'))
const Groups = React.lazy(() => import('./views/groups'))
const AddGroup = React.lazy(() => import('./views/groups/add'))
const Shipping = React.lazy(() => import('./views/shipping'))
const AddShipping = React.lazy(() => import('./views/shipping/add'))
const Brands = React.lazy(() => import('./views/brands'))
const AddBrands = React.lazy(() => import('./views/brands/add'))
const ProjectConfigs = React.lazy(() => import('./views/configs'))
const Pages = React.lazy(() => import('./views/page'))
const AddPages = React.lazy(() => import('./views/page/add'))
const Files = React.lazy(() => import('./views/files'))
const Reviews = React.lazy(() => import('./views/reviews'))
const Rates = React.lazy(() => import('./views/rates'))
const CSVFields = React.lazy(() => import('./views/csv-fields'))
const AddCSVFields = React.lazy(() => import('./views/csv-fields/add'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // mine
  { path: '/customers', exact: true, name: 'Customers', component: Customers },
  { path: '/drivers', exact: true, name: 'Drivers', component: Driver },
  { path: '/vendors', exact: true, name: 'Vendors', component: Vendor },
  { path: '/admins', exact: true, name: 'Admins', component: Admin },
  { path: '/add-admin', exact: true, name: 'Admins', component: AddAdmin },
  {
    path: '/customer/:id',
    exact: true,
    name: 'Single Customer',
    component: SingleCustomer,
  },
  {
    path: '/add-customer/:updatingCustomerId',
    exact: true,
    name: 'Add Customer',
    component: AddCustomer,
  },
  {
    path: '/products',
    exact: true,
    name: 'Products',
    component: Products,
  },
  {
    path: '/product/:id',
    exact: true,
    name: 'Single Product',
    component: SingleProduct,
  },
  {
    path: '/vendor/:id',
    exact: true,
    name: 'Single Vendor',
    component: SingleVendor,
  },
  {
    path: '/add-vendor/:updatingVendorId',
    exact: true,
    name: 'Add Vendor',
    component: AddVendor,
  },
  {
    path: '/banners',
    exact: true,
    name: 'Banners',
    component: Banners,
  },
  {
    path: '/banner/:id',
    exact: true,
    name: 'Single Banner',
    component: SingleBanner,
  },
  {
    path: '/promotions',
    exact: true,
    name: 'Promotions',
    component: Promotions,
  },
  {
    path: '/promotion/:id',
    exact: true,
    name: 'Single Promotion',
    component: SinglePromotion,
  },
  {
    path: '/categories',
    exact: true,
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/category/:id',
    exact: true,
    name: 'Single Category',
    component: SingleCategory,
  },
  {
    path: '/orders',
    exact: true,
    name: 'Orders',
    component: Orders,
  },
  {
    path: '/order/:id',
    exact: true,
    name: 'Single Order',
    component: SingleOrder,
  },
  {
    path: '/coupons',
    exact: true,
    name: 'Coupons',
    component: Coupons,
  },
  {
    path: '/gift-cards',
    exact: true,
    name: 'Gift Cards',
    component: GiftCards,
  },
  {
    path: '/add-product/:updatingProductId',
    exact: true,
    name: 'Add Product',
    component: AddProduct,
  },
  {
    path: '/add-promotion/:updatingPromotionId',
    exact: true,
    name: 'Add Promotion',
    component: AddPromotion,
  },
  {
    path: '/add-category/:updatingCategoryId',
    exact: true,
    name: 'Add Category',
    component: AddCategory,
  },
  {
    path: '/add-banner/:updatingBannerId',
    exact: true,
    name: 'Add Banner',
    component: AddBanner,
  },
  {
    path: '/add-coupon/:updatingCouponId',
    exact: true,
    name: 'Add Coupon',
    component: AddCoupon,
  },
  {
    path: '/add-giftcard/:updatingGiftId',
    exact: true,
    name: 'Add Gift Card',
    component: AddGiftCard,
  },
  {
    path: '/add-driver',
    exact: true,
    name: 'Add Driver',
    component: AddDriver,
  },
  {
    path: '/driver/:id',
    exact: true,
    name: 'Single Driver',
    component: SingleDriver,
  },
  {
    path: '/entities',
    exact: true,
    name: 'Entities',
    component: Entities,
  },
  {
    path: '/add-entity/:updatingEntityId',
    exact: true,
    name: 'Add Entity',
    component: AddEntity,
  },
  {
    path: '/groups',
    exact: true,
    name: 'Groups',
    component: Groups,
  },
  {
    path: '/add-group/:updatingGroupId',
    exact: true,
    name: 'Add Group',
    component: AddGroup,
  },
  {
    path: '/shippings',
    exact: true,
    name: 'Shippings',
    component: Shipping,
  },
  {
    path: '/add-shipping/:updatingShippingId',
    exact: true,
    name: 'Add Shipping',
    component: AddShipping,
  },
  // {
  //   path: '/brand/new',
  //   exact: true,
  //   name: 'Add Brand',
  //   component: AddBrands,
  // },
  {
    path: '/brands',
    exact: true,
    name: 'Brands',
    component: Brands,
  },
  {
    path: '/add-brand/:brand_name',
    exact: true,
    name: 'Add Brand',
    component: AddBrands,
  },
  {
    path: '/configs',
    exact: true,
    name: 'Configs',
    component: ProjectConfigs,
  },
  {
    path: '/pages',
    exact: true,
    name: 'Pages',
    component: Pages,
  },
  {
    path: '/pages/:page_id',
    exact: true,
    name: 'Add Page',
    component: AddPages,
  },
  {
    path: '/files',
    exact: true,
    name: 'Files',
    component: Files,
  },
  {
    path: '/reviews',
    exact: true,
    name: 'Reviews',
    component: Reviews,
  },
  {
    path: '/rates',
    exact: true,
    name: 'Rates',
    component: Rates,
  },
  {
    path: '/csv-fields',
    exact: true,
    name: 'CSV Fields',
    component: CSVFields,
  },
  {
    path: '/csv-fields/:csv_id',
    exact: true,
    name: 'Add CSV Fields',
    component: AddCSVFields,
  },
]

export default routes
