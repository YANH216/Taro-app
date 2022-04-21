import { 
  Icon,
  Text,
  Input, 
  View,
} from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import SearchHistory from './searchHistory/searchHistory'
import SearchResults from './searchResults/searchResults'
import common from '../../../httpCommon/common'
import _showToast from '../../../util/_showToast'
import './search.scss'

function MySearch () {
  // 搜索关键字
  const [keyWord, setKeyWord] = useState('')

  // 搜索结果列表
  const [searchResults, setSearchResults] = useState([])

  // 搜索历史
  const [searchHistory, setSearchHistory] = useState([])

  // 设置定时器 对用户输入事件进行防抖处理
  let timer = null
  const inputHandler = (e) => {
    const { value } = e.detail

    clearTimeout(timer)

    timer = setTimeout(() => {
      setKeyWord(value)
    }, 500)
  }

  useEffect(async () => {
    // 如果关键字为空 将搜索结果重置
    if (keyWord === '') 
      return setSearchResults([])

    const res = await common.getSearch({query: keyWord})

    if (res.meta.status !== 200) 
      return _showToast()

    setSearchResults(res.message)

    // 将之前的搜索历史与当前搜索关键字组合并判断历史中是否有相同的值，没有再保存到状态中
    if (searchHistory.indexOf(keyWord) === -1) {
      const currentSearchHistory = [keyWord, ...searchHistory]
      setSearchHistory(currentSearchHistory)
      Taro.setStorageSync('keyWord', currentSearchHistory)
    }
    // 数组去重
    /* 
    // const uniqueCurrentSearchHistory = [...new Set(currentSearchHistory)]
    setSearchHistory([...new Set(currentSearchHistory)]) 
    */

  }, [keyWord])

  useEffect(() => {
    const savedSearchHistory = Taro.getStorageSync('keyWord')
    if (savedSearchHistory)
      setSearchHistory(savedSearchHistory)
  }, [])



  useReady(() => {

  })

  
  return (
    <View>
      <View className='search-box'>
        <Input
          className='search-bar' 
          placeholder='请输入搜索内容'
          focus
          onInput={(event) => inputHandler(event)}
        />
        <Icon 
          type='clear' 
          className='input-clear'
          color='#dbdbdb'
        />
      </View>
      {
        searchResults.length === 0 
        ? <SearchHistory searchHistory={searchHistory} setSearchHistory={setSearchHistory}/>
        : <SearchResults searchResults={searchResults}/>
      }
    </View>
  )
}

export default MySearch