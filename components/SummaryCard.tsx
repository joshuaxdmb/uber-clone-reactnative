import React from 'react'
import { Image, Text,View, TouchableOpacity} from 'react-native'
import { RideOption, SURGE_CHARGE_RATE } from './RideOptionsCard'
import { useNavigation } from '@react-navigation/native'
import { SelectedPage } from '../types/types'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectPaymentMethod, selectTravelTimeInformation } from '../slices/navSlice'
import VisaIcon from '../assets/visaIcon.jpeg'
import { Icon } from 'react-native-elements'
import { setRideOption } from '../slices/navSlice'
type Props = {
    route?:{
        params:{
          selectedMethod: RideOption
        }
    }
}



const SummaryCard = (props: Props) => {
  const getTime = () =>{
    const currentTime = new Date
    let inMinutes =  currentTime.getHours()*60 + travelTimeInformation.duration.value/60 + currentTime.getMinutes()
    let hours = Math.round(inMinutes/60)
    let minutes = Math.round(inMinutes%60)
    
    return (hours.toString() + ':' +minutes.toString())
  }
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  const paymentMethod = useSelector(selectPaymentMethod)
  const selectedMethod = props.route?.params?.selectedMethod
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  
  const dropoffTime = getTime()

  
  if(!selectedMethod){
    navigation.navigate(SelectedPage.RideOptionsCard)
  }

  const goToPaymentMethods = ()=> {
    navigation.navigate(SelectedPage.PaymentScreen)
  }
  return (
    <View style={[tw`bg-white flex-grow justify-between`]}>
      <View style={tw`flex justify-center w-full`}>
        <TouchableOpacity
          style={tw`absolute left-5 top-0 p-3 z-30 rounded-full`}
          onPress={() => {
            dispatch(setRideOption(null))
            navigation.navigate(SelectedPage.RideOptionsCard)}}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center pt-3 text-xl`}>
          Confirm Payment & Pickup
        </Text>
      </View>
      <View style={tw`items-center flex `}>
      <Image
              style={{width:'100%',height:130, resizeMode:'contain', marginTop:-30}}
              source={{ uri: selectedMethod?.image }}
            />
            </View>
      {/* PAYMENT INFORMATION */}
      <View style={tw`flex flex-row items-center justify-between w-full px-5 `}>
        <View>
          <Text style={tw`font-bold text-4xl`}>{selectedMethod?.title}</Text>
          <Text style={tw`text-xl`}>{dropoffTime} dropoff</Text>
        </View>
        <View>
        <Text style={tw`text-3xl font-bold`}>
              {selectedMethod?.multiplier?new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'CAD',
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  selectedMethod?.multiplier) /
                  100
              ):''}
            </Text>
        </View>
      </View>
      {/* PAYMENT OPTION */}
      <TouchableOpacity onPress={goToPaymentMethods}  style={tw`justify-between items-center px-5 flex-row`}>
        <View style={tw` items-center flex-row`}>
        <Image source={VisaIcon} style={{...tw`h-10 mr-2`, resizeMode:'contain', width:80, marginLeft:-5}}/>
        <Text style={tw`text-xl`} >Visa - {paymentMethod}</Text>
        </View>
        <Icon size={40} name="chevron-right" type="fontawesome" />
      </TouchableOpacity  >
    {/* CONFIRM BUTTON */}
    <View style={tw`w-full`}>
        <TouchableOpacity style={tw`mx-5 flex items-center justify-center bg-black`}>
          <Text style={tw`text-2xl text-white font-bold py-5`}>Confirm Pickup</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default SummaryCard