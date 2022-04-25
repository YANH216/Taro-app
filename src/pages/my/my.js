import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/feature/userSlice'
import Login from '../../components/login/login'
import UserInfo from '../../components/userInfo/userInfo'

function My () {
  const token = useSelector(selectToken)
  return (
    <View>
      {
        token 
        ? <UserInfo></UserInfo>
        : <Login></Login>
      }
    </View>
  )
}

export default My