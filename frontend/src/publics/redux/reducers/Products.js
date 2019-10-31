const initState = {
    products:[],
    totalRows: 0,
    limit: 0,
    page: 0,
    totalPage: 0,
    errMessage:'',
    message:'',
    isLoading:false,
    isRejected:false,
    isFulfilled:false,
    isRedirected:false
  }
  const product = (state = initState, action)=>{
    switch(action.type){
      case 'GET_PRODUCTS_PENDING':
      case 'ADD_PRODUCT_PENDING':
      case 'GET_PRODUCT_BY_ID_PENDING':
      case 'UPDATE_PRODUCT_PENDING':
      case 'DELETE_PRODUCT_PENDING':
        return{
          ...state,
          //total:0,
          isLoading:true,
          isRejected:false,
          isFulfilled:false,
          isRedirected: false
        }
      case 'GET_PRODUCTS_REJECTED':
      case 'ADD_PRODUCT_REJECTED':
      case 'GET_PRODUCT_BY_ID_REJECTED':
      case 'UPDATE_PRODUCT_REJECTED':
        return{
          ...state,
          isLoading:false,
          isRejected:true,
          errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message
        }
        case 'GET_PRODUCT_BY_ID_FULFILLED':
          return{
            ...state,
            products:action.payload.data.data[0],
            isLoading:false,
            isFulfilled:true,
          }
      case 'GET_PRODUCTS_FULFILLED':
        return{
          ...state,
          products:action.payload.data.data,
          totalRows: action.payload.data.totalRows,
          limit: action.payload.data.limit,
          page: action.payload.data.page,
          totalPage: action.payload.data.totalPage,
          isLoading:false,
          isFulfilled:true,
        }
      case 'ADD_PRODUCT_FULFILLED':
          state.products.unshift(action.payload.data.data)
          return{
              ...state,
              isLoading:false,
              isFulfilled:true
          }
        case 'DELETE_PRODUCT_REJECTED':
            return{
              ...state,
              isLoading:false,
              isRejected:true,
              errMessage:action.payload.response.data.message
            }
        case 'DELETE_PRODUCT_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                products: state.products.filter((product) => {
                    return product.id_product !== action.payload.data.data.id_product
                })
            }
        case 'UPDATE_PRODUCT_FULFILLED':
          return{
            ...state,
            isLoading: false,
            isFulfilled: true,
            isRedirected:true
          }
      default:
        return state
    }
  }
  export default product
