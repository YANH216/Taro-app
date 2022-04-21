import { 
  View,
} from '@tarojs/components'
import Taro, { 
  useReachBottom, 
  useRouter,
  usePullDownRefresh, 
  useReady} from '@tarojs/taro'
import { useState, useEffect, useRef } from 'react'
import MyGoodsList from '../../../components/my_goodsList/my_goodsList'
import common from '../../../httpCommon/common'
import _showToast from '../../../util/_showToast'
import './goods_list.scss'

// 定义全局变量
var pagenum = 1

function Goods_List () {
  // 获取页面路由参数
  const routerParams = useRouter().params

  // 商品列表
  const [goodsList, setGoodsList] = useState([])

  // 请求页码
  // const [pagenum, setPagenum] = useState(1)

  // 类似this
  const cacheRef = useRef(Object.create(null))

  cacheRef.current.pagesize = 10


  const reqGoodsList = async (cb) => {
    let { query, cid, pagesize, total } = cacheRef.current
    const res = await common.getGoodsList({ query, cid, pagenum, pagesize })

    if (res.meta.status !== 200) 
      return _showToast()
    // 保存total
    cacheRef.current.total = res.message.total

    // 判断是否有传递的回调函数，有 代表是下拉刷新， 没有 代表是上拉加载
    if (cb) {
      setGoodsList(res.message.goods)
      cb()
    } else {
      setGoodsList([...goodsList, ...res.message.goods])
    }
  }

  useReachBottom(() => {
    const { pagesize, total } = cacheRef.current
    if (pagenum * pagesize >= total)
      return _showToast('数据加载完毕')
    pagenum++
    reqGoodsList()
  })

 usePullDownRefresh(() => {
    // 重置数据
    cacheRef.current.total = 0
    pagenum = 1
    reqGoodsList(() => Taro.stopPullDownRefresh())
  }) 

  useEffect(() => {
    cacheRef.current.query = routerParams.query || '',
    cacheRef.current.cid = routerParams.cid || '',
    reqGoodsList()
  }, [])
  
  return (
    <View className='goods-list'>
      <MyGoodsList goodsList={goodsList}></MyGoodsList>
    </View>
  )
}

export default Goods_List