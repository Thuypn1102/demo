import { StackNavigator } from 'react-navigation';

import ProductList from '../screens/main/product_tab/ProductList'
import ProductDetail from '../screens/main/product_tab/ProductDetail'

const ProductTab = StackNavigator({
    ProductList: { screen: ProductList },
    ProductDetail: { screen: ProductDetail },
})
export default ProductTab;
