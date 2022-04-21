import { 
  View,
  ScrollView,
  Text,
  Image,
} from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { useState } from 'react'
import MySearch from '../../components/mySearch/mySearch'
import common from '../../httpCommon/common'
import _showToast from '../../util/_showToast'
import './cate.scss'

function Cate () {
  // 当前设备可用高度
  const [wh, setWh] = useState(0)

  // 一级分类列表数据
  const [cateList, setCateList] = useState([])

  // 二级分类列表数据
  const [cateChildList, setCateChildList] = useState([]) 

  // 左侧scrollView中激活元素
  const [active, setActive] = useState(1)
  
  // 滚动条所在位置
  const [scroll, setScroll] = useState(0)


  // 根据所点击的scrollView中的元素 改变状态active的值
  const scrollItemClickHandler = (cat_id, children) => {
    // 重置滚动条位置
    // 设置值时 如果前后一样 不会有效果
    setScroll(scroll === 0 ? 1 : 0)

    setActive(cat_id)

    setCateChildList(children)

  }

  // 接收传递过来的cat_id 
  const goToGoodsList = (cid) => {
    Taro.navigateTo({
      url: `../subpackages/goods_list/goods_list?cid=${cid}`
    })
  }

  useReady(async () => {
    // 获取当前设备信息
    const sysInfo = Taro.getSystemInfoSync()
    setWh(sysInfo.windowHeight)

    // 获取分类列表数据
    const cateListData = await common.getCateList()

    if (cateListData.meta.status !== 200) return _showToast()

    setCateList(cateListData.message)

    // 默认情况下 展示第一项
    setCateChildList(cateListData.message[0].children)

  })

  // 设置滚动高度时，获取屏幕高度后还要减掉搜索框的高度
  const scrollStyle = {
    height: wh - 50,   
  }
  
  return (
    <View>
      <MySearch></MySearch>
      <View className='scroll-view-container'>
        {/* 左侧滑动区域 */}
        <ScrollView
          className='left-scroll-view'
          scrollY
          style={scrollStyle}
        >
          {/* 一级分类 */}
          {
            cateList.map((item) => {
              return (
                <View
                  className={item.cat_id === active ? 'active' : ''}
                  key={item.cat_id}
                  onClick={() => scrollItemClickHandler(item.cat_id, item.children)}
                >
                  {item.cat_name}
                </View>
              )
            })
          }
        </ScrollView>
        {/* 右侧滑动区域 */}
        <ScrollView
          scrollY
          scrollTop={scroll}
          style={scrollStyle}
        >
          {/* 二级分类 */}
          {
            cateChildList.map((item) => {
              return (
                <View className='cate-child'>
                  \  {item.cat_name}  /
                  {/* 三级分类 */}
                  <View className='cate-grand'>
                    {
                      // 先判断是否有值  没值赋值空数组[]
                      (item.children ? item.children : []).map((subItem) => {
                        return (
                            <View 
                              className='cate-grand-item'
                              onClick={() => goToGoodsList(subItem.cat_id)}
                            >
                              {/* 图片 */}
                                <Image src={subItem.cat_icon}/>
                              {/* 文本 */}
                                <Text>
                                  {subItem.cat_name}
                                </Text>
                            </View>
                        )
                      })
                    }
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  )
}

export default Cate