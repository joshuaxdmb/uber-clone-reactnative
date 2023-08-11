import React from 'react'
import { Image, SafeAreaView, Text,View} from 'react-native'
import { RideOption, SURGE_CHARGE_RATE } from './RideOptionsCard'
import { useNavigation } from '@react-navigation/native'
import { SelectedPage } from '../types/types'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectPaymentMethod, selectTravelTimeInformation } from '../slices/navSlice'
import VisaIcon from '../assets/visaIcon.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'

type Props = {
    route?:{
        params:{
          selectedMethod: RideOption
        }
    }
}

const SummaryCard = (props: Props) => {
  const navigation = useNavigation<any>()
  const paymentMethod = useSelector(selectPaymentMethod)
  const selectedMethod = props.route?.params?.selectedMethod
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const currentTime = new Date
  const dropoffTime = currentTime.getHours()+':'+Math.round(currentTime.getMinutes()+travelTimeInformation.duration.value/60).toString()
  if(!selectedMethod){
    navigation.navigate(SelectedPage.RideOptionsCard)
  }

  const goToPaymentMethods = ()=> {
    navigation.navigate(SelectedPage.PaymentScreen)
  }
  return (
    <SafeAreaView style={[tw`bg-white flex-grow`]}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-0 left-5 p-3 z-10 rounded-full`}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-3 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <Image
              style={{width:'50%',height:'35%', resizeMode:'contain', marginBottom:-10, zIndex:-1}}
              source={{ uri: selectedMethod?.image }}
            />
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
      <TouchableOpacity onPress={goToPaymentMethods}  containerStyle={tw`w-full`} style={tw`justify-between items-center px-5 flex-row`}>
        <View style={tw` items-center flex-row`}>
        <Image source={VisaIcon} style={tw`h-10 mr-2`}/>
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
    </SafeAreaView>
  )
}

export default SummaryCard