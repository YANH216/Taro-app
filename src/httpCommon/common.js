// 封装http请求
import { HttpRequest } from "./http";

const URL = {
  // 获取轮播图列表数据
  swiperList: '/api/public/v1/home/swiperdata',
  // 获取导航列表数据
  navList: '/api/public/v1/home/catitems',
  // 获取楼层数据
  floor: '/api/public/v1/home/floordata',
  // 获取分类列表数据
  cate: '/api/public/v1/categories',
  // 搜索建议查询
  search: '/api/public/v1/goods/qsearch',
  // 商品列表搜索
  goodsList: '/api/public/v1/goods/search',
  // 商品详情
  goodsDetail: '/api/public/v1/goods/detail',
  // 获取token
  token: '/api/public/v1/users/wxlogin',

}


// 传递参数顺序 url data(对象) isShowLoading 
class Common extends HttpRequest {
  getSwiperList (param) {
    return this.get(URL.swiperList)
  }
  getNavList(param) {
    return this.get(URL.navList)
  }
  getFloor(param) {
    return this.get(URL.floor)
  }
  getCateList(param) {
    return this.get(URL.cate)
  }
  getSearch({ query }) {
    return this.get(URL.search, { query }, false)
  }
  getGoodsList(param) {
    const { query, cid , pagenum, pagesize } = param
    return this.get(URL.goodsList, {query, cid, pagenum, pagesize})
  }
  getGoodsDetail({ goods_id }) {
    return this.get(URL.goodsDetail, { goods_id })
  }
  getToken({ query }) {
    return this.post(URL.token, { query })
  }
}

export default new Common()