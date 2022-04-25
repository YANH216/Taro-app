import Taro, { useDidShow, useReady } from '@tarojs/taro'
import { 
  Swiper, 
  SwiperItem, 
  Image,
  View,
  Navigator } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartList } from '../../redux/feature/cartListSlice'
import common from '../../httpCommon/common'
import _showToast from '../../util/_showToast';
import MySearch from '../../components/mySearch/mySearch';
import { mixin } from '../../mixins/tabbarBadge'
import './style/home.scss'

const Home = () => {
  // 轮播图列表
  const [swiperList, setSwiperList] = useState([])
  // 导航列表
  const [navList, setNavList] = useState([])
  // 楼层数据
  const [floor, setFloor] = useState([])

  const navClickHandler = (item) => {
    if (item.name === '分类') {
      Taro.switchTab({
        url: '/pages/cate/cate'
      })
    }
  }

  const cartList = useSelector(selectCartList)
  const dispatch = useDispatch()

  useDidShow(() => {
    mixin(cartList, dispatch)
  })

  useReady(async () => {
    // 发起获取轮播图数据请求
    const swiperListData = await common.getSwiperList()

    // 发起获取导航列表数据请求
    const navListData = await common.getNavList()

    // 发起获取楼层数据请求
    const floorData = await common.getFloor()

    if (swiperListData.meta.status !== 200) {
      return _showToast('轮播图数据请求失败！')
    } else if (navListData.meta.status !== 200) {
      return _showToast('导航列表数据请求失败')
    } else if (floorData.meta.status !== 200) {
      return _showToast('楼层数据请求失败')
    } 

    // 对请求到的楼层数据进行处理
    floorData.message.forEach((item) => {
      item.product_list.forEach((subItem) => {
        // 原数据中navigator_url :  /pages/goods_list?query=服饰
        // 向原数据中添加属性 url
        subItem.url = '../subpackages/goods_list/goods_list?' + subItem.navigator_url.split('?')[1]
      })
    })

    // 将获取到的数据保存到状态
    setSwiperList(swiperListData.message)
    setNavList(navListData.message)
    setFloor(floorData.message)

  })


  return (
    <View>
      <View className='search-box'>
        <MySearch></MySearch>
      </View>
      {/* 轮播图区域 */}
      <Swiper
        className='swiper'
        circular
        indicatorDots
        autoplay
      >
        {
          swiperList.map(item => {
            return (
              <Navigator className='swiper-item' url={`../subpackages/goods_detail/goods_detail?goods_id=${item.goods_id}`}>
                <SwiperItem>
                  <Image
                    src={item.image_src}
                  />
                </SwiperItem>
              </Navigator>
            )
          })
        }
      </Swiper>
      {/* 分类导航区域 */}
      <View className='nav-list'>
        {
          navList.map((item) => {
            return (
              <View className='nav-item' onClick={() => navClickHandler(item)}>
                <Image className='nav-img' src={item.image_src}/>
              </View>
            )
          })
        }
      </View>
      {/* 楼层区域 */}
      <View className='floor-list'>
        {
          floor.map((item) => {
            return (
              <View className='floor-item'>
                {/* 楼层标题 */}
                <Image className='floor-title-img' src={item.floor_title.image_src}/>
                {/* 楼层图片 */}
                <View className='floor-img-box'>
                  {/* 左侧大图片的盒子 */}
                  <View className='left-img-box'>
                    <Navigator url={item.product_list[0].url}>
                      <Image 
                        src={item.product_list[0].image_src}
                        style={`width:${item.product_list[0].image_width}rpx`}
                        mode= 'widthFix'
                      />
                    </Navigator>
                  </View>
                  {/* 右侧四个小图片的盒子 */}
                  <View className='right-img-box'>
                    {
                      item.product_list.slice(1).map((subItem) => {
                        return (
                          <Navigator url={subItem.url}>
                            <Image 
                              src={subItem.image_src}
                              style={`width:${subItem.image_width}rpx`}
                              mode= 'widthFix'
                            />
                          </Navigator>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default Home