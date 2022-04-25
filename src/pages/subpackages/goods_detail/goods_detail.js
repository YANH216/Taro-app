import { 
  Icon,
  Image,
  RichText,
  Swiper,
  SwiperItem,
  Text,
  View,
} from '@tarojs/components'
import Taro, { 
  useReady,
  useRouter,
} from '@tarojs/taro'
import { 
  useState,
  useEffect,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartList } from '../../../redux/feature/cartListSlice'
import { saveTotal } from '../../../redux/feature/totalSlice'
import GoodsNav from '../../../components/goodsNav/goodsNav'
import common from '../../../httpCommon/common'
import _showToast from '../../../util/_showToast'
import './style/goods_detail.scss'

function Goods_Detail () { 

  const cartList = useSelector(selectCartList)

  const dispatch = useDispatch()

  // 在子组件dipatch 更新redux中cartList状态之后，计算total值，并dispatch total 并保存
  useEffect(() => {
    let total = 0
    cartList.forEach((item) => {
      return total += item.goods_count
    })
    dispatch(saveTotal(total))
  }, [cartList])
  
  const routerParams = useRouter().params

  // 商品详情
  const [goodsDetail, setGoodsDetail] = useState([])

  const reqGoodsDetail = async (goods_id) => {
    const res = await common.getGoodsDetail({ goods_id })
    if (res.meta.status !== 200) 
      return _showToast()
    // 使用字符串的replace方法，使img标签添加行内的style样式，从而解决图片之间的空白间隙
    // 替换webp格式为jpg格式，解决无法在ios设备上展示
    res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;" ').replace(/webp/g, 'jpg')
    setGoodsDetail(res.message)
  }

  const preview = (currentUrl) => {
    // 图片链接列表
    const urls = goodsDetail.pics.map((item) => {
      return item.pics_big
    })
    Taro.previewImage({
      current: currentUrl,
      urls: urls
    })
  }

  useReady(() => {
    
  })

  useEffect(() => {
    const goods_id = routerParams.goods_id
    reqGoodsDetail(goods_id)
  }, [])
  
  return (
    <View className='goods-detail-container'>
      {/* 轮播图区域 */}
      <Swiper
        className='swiper-container'
        indicatorDots
        autoplay
        circular
      >
        {
          (goodsDetail.pics || []).map((swiperItem) => {
            return (
              <SwiperItem className='swiper-item'>
                <Image
                  className='swiper-img'
                  onClick={() => preview(swiperItem.pics_big)}
                  src={ swiperItem.pics_big }
                />
              </SwiperItem>
            )
          })
        }
      </Swiper>
      {
        // 在请求数据返回之前，默认文本样式已经展示，会导致闪烁，故在数据返回之前，使该部分不展示
        !goodsDetail.goods_name 
        ? '' 
        : (
            /* 商品信息区域 */
            <View className='goods-info-box'>
              {/* 商品价格  */}
              <View className='goods-info-price'>
                ￥{ goodsDetail.goods_price }
              </View>
              {/* 商品信息主体区域 */}
              <View className='goods-info-body'>
                {/* 商品名称 */}
                <View className='goods-info-name'>
                  { goodsDetail.goods_name }
                </View>
                {/* 收藏 */}
                <View className='collection'>
                  <Icon type='success'/>
                  <Text>收藏</Text>
                </View>
              </View>
              {/* 运费 */}
              <View className='freight'>
                快递: 免运费
            </View>
          </View>
        )
      }

      <RichText nodes={goodsDetail.goods_introduce}></RichText>
      <GoodsNav goodsDetail={goodsDetail} cartList={cartList}></GoodsNav>
    </View>
  )
}

export default Goods_Detail