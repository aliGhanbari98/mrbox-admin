const tablesFields = {
  pages: ['title', 'status', 'type', 'actions'],
  customers: [
    'name',
    'mobile_number',
    'email',
    'country',
    'login_datetime',
    'is_enable',
    'actions',
  ],
  customerAddresses: [
    'country',
    'city',
    'state',
    'address',
    'postalCode',
    'contactNumber',
  ],
  ordersHisotry: ['date', 'total', 'totalPrice', 'status', 'view'],
  logs: ['dateTime', 'description'],
  wishList: ['thumbNail', 'name', 'addDate', 'view'],
  products: [
    'select',
    'image',
    'brand',
    // 'thumbnail',
    'title',
    'vendor',
    // 'QTY',
    'discount_percentage',
    'prices',
    'create_datetime',
    'update_datetime',
    'tags',
    'is_enable',
    'status',
    'actions',
  ],
  topProducts: ['thumbnail', 'name', 'price', 'view'],
  buyingCustomers: ['name', 'orderId', 'dateTime'],
  ratesAndReviews: ['dateTime', 'customerName', 'rate', 'review', 'actions'],
  vendors: [
    'select',
    'logo',
    'company_title',
    'title',
    'establish_date',
    'license_number',
    'status',
    'actions',
  ],
  vendorProducts: ['thumbnail', 'price', 'view'],
  activeCategories: ['title'],
  csvFields: ['cat_name', 'total_field', 'actions'],
  banners: [
    // 'select',
    // 'name',
    // 'thumbnail',
    // 'createdAt',
    // 'expiredAt',
    'title',
    'target',
    'number_of_clicks',
    'tags',
    // 'status',
    'actions',
  ],
  promotions: [
    'title',
    'start_datetime',
    'end_datetime',
    'target',
    'status',
    'discount',
    'actions',
  ],
  brandsEntity: ['title', 'actions'],
  reviews: ['product', 'user', 'review', 'posted_at', 'status', 'actions'],
  rates: ['product', 'user', 'rate', 'posted_at', 'status', 'actions'],
  promotionTarget: ['type', 'entities'],
  categories: ['title', 'parent', 'is_enable', 'actions'],
  orders: [
    'select',
    'date',
    'vendor',
    'customerName',
    'totalItems',
    'createTime',
    'totalPrice',
    'discount',
    'status',
    'actions',
  ],
  basket: ['totalPrice', 'discount', 'totalPaid', 'listOfProducts'],
  basketProducts: ['thumbnail', 'name', 'price'],
  coupons: [
    'code',
    'title',
    'max_quantity',
    'discount_percentage',
    'discount_amount',
    'start_datetime',
    'end_datetime',
    'total_used',
    'actions',
  ],
  giftCards: [
    'title',
    'credit',
    'is_used',
    'used_datetime',
    'used_by',
    'start_datetime',
    'end_datetime',
    'actions',
  ],
  attributes: ['key', 'value', 'delete', 'edit'],
  uneditableAttributse: ['key', 'value'],
  brands: [
    'attribute_key',
    'title',
    'values',
    'filter_type',
    'show_filter',
    'is_mandatory',
    'delete',
    'edit',
  ],
  singleCategoryAttributes: [
    'attribute_key',
    'title',
    'values',
    'filter_type',
    'show_filter',
    'is_mandatory',
  ],
  soldOutProducts: ['thumbnail', 'name', 'price', 'view'],
  dashboardOrders: [
    'date',
    'vendor',
    'customerName',
    'totalItems',
    'createTime',
    'totalPrice',
    'discount',
    'status',
  ],
  dashboardVendors: [
    'logo',
    'name',
    'listedDate',
    'lastLogin',
    'licenseExpiredAt',
    'status',
  ],
  drivers: [
    'name',
    'phoneNumber',
    'city',
    'createdAt',
    'currentLocation',
    'type',
    'status',
    'actions',
  ],
  addAddress: [
    'first_name',
    'last_name',
    'phone_number',
    'alternate_phone_number',
    'country_code',
    'city',
    'state',
    'address_line_1',
    'address_line_2',
    'postal_code',
    'edit',
    'delete',
  ],
  addressList: [
    'first_name',
    'last_name',
    'phone_number',
    'alternate_phone_number',
    'country_code',
    'city',
    'state',
    'address_line_1',
    'address_line_2',
    'postal_code',
  ],
  driverAddresses: [
    'country',
    'city',
    'state',
    'details',
    'postalCode',
    'contactNumber',
  ],
  admins: [
    'firstName',
    'lastName',
    'type',
    'gender',
    'phoneNumber',
    'address',
    'status',
  ],
  productDetails: ['stock_quantity', 'price', 'attributes', 'edit', 'delete'],
  uneditableProductDetails: ['stock_quantity', 'price', 'attributes'],
  groups: ['title', 'permissions', 'actions'],
  entities: ['code_name', 'description', 'rules', 'actions'],
  permissions: ['entity', 'rules', 'edit', 'delete'],
  groupPermissions: ['entity', 'rules', 'edit'],
  shippings: [
    'country_code',
    'min_weight',
    'max_weight',
    'amount',
    'max_dimension',
    'min_delivery_time',
    'max_delivery_time',
    'actions',
  ],
}

export default tablesFields
