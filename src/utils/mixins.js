import {formatPrice} from '@/utils/function'

// 定义一个混入对象
const filters = {
    filters:{
        formatPrice(price){
          return formatPrice(price)
        }
    },
}
export {
    filters
}