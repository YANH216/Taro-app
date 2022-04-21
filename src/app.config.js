// eslint-disable-next-line no-undef
export default ({
  pages: [
    'pages/home/home',
    'pages/cate/cate',
    'pages/cart/cart',
    'pages/my/my',
  ],
  subpackages: [
    {
      root: 'pages/subpackages',
      pages: [
        'goods_detail/goods_detail',
        'goods_list/goods_list',
        'search/search'
      ]
    }
  ],
  tabBar: {
    selectedColor: '#c00000',
    list: [{
      pagePath: 'pages/home/home',
      text: '首页',
      iconPath: 'resource/tab_icons/home.png',
      selectedIconPath: 'resource/tab_icons/home-active.png'
    }, {
      pagePath: 'pages/cate/cate',
      text: '分类',
      iconPath: 'resource/tab_icons/cate.png',
      selectedIconPath: 'resource/tab_icons/cate-active.png'
    }, {
      pagePath: 'pages/cart/cart',
      text: '购物车',
      iconPath: 'resource/tab_icons/cart.png',
      selectedIconPath: 'resource/tab_icons/cart-active.png'
    }, {
      pagePath: 'pages/my/my',
      text: '我的',
      iconPath: 'resource/tab_icons/my.png',
      selectedIconPath: 'resource/tab_icons/my-active.png'
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#91e4f0',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    onReachBottomDistance: 150,
    backgroundColor: '#F8F8F8'
  },
})
