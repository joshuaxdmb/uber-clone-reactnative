import { Icon, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Switch } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SelectedPage } from '../types/types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import uberIcon from '../assets/uberIcon.png';
import visaIcon from '../assets/visaIcon.jpeg';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {setPaymentMethodState} from '../slices/navSlice';
import { useDispatch } from 'react-redux';
type Props = {};

const PaymentScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  const handleClose = () => {
    navigation.goBack();
  };
  const [paymentType, setPaymentType] = useState('personal');
  const [uberCash, setUberCash] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('5678')
  const dispatch = useDispatch();

  const handlePaymentMethodChange = (method:string) =>{
    dispatch(setPaymentMethodState(method))
    setPaymentMethod(method)
  }
  return (
    <SafeAreaView>
      {/* X BUTTON */}
      <View style={tw`items-start px-5`}>
        <TouchableOpacity onPress={handleClose}>
          <Icon size={40} name="close" type="fontawesome" />
        </TouchableOpacity>
      </View>
      {/* PAYMENT OPTIONS */}
      <Text style={tw`text-3xl font-bold py-5 px-5`}>Payment Options</Text>
      <View style={tw`mr-10 flex-row`}>
        <TouchableOpacity
          onPress={() => {
            setPaymentType('personal');
          }}
          style={tw`mr-2 ml-5 px-8 flex-row items-center justify-center rounded-full py-4 ${
            paymentType === 'personal' ? 'bg-black' : 'bg-gray-300'
          }`}
        >
          <FontAwesomeIcon
            icon={faUser}
            color={paymentType === 'personal' ? 'white' : '#4a4a4a'}
            size={24}
          />
          <Text
            style={{
              ...tw`pl-4 text-white font-bold text-lg`,
              color: paymentType === 'personal' ? 'white' : '#4a4a4a',
            }}
          >
            Personal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPaymentType('business');
          }}
          style={tw`px-8 flex-row items-center justify-center rounded-full py-4 ${
            paymentType === 'business' ? 'bg-black' : 'bg-gray-300'
          }`}
        >
          <FontAwesomeIcon
            icon={faBriefcase}
            color={paymentType === 'business' ? 'white' : '#4a4a4a'}
            size={24}
          />
          <Text
            style={{
              ...tw`pl-4 font-bold text-lg`,
              color: paymentType === 'business' ? 'white' : '#4a4a4a',
            }}
          >
            Business
          </Text>
        </TouchableOpacity>
      </View>
      {/* UBER CASH */}
      <Text style={tw`m-5 mt-10 text-xl text-gray-500`}>Uber Cash</Text>
      <View style={tw`px-5 flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center`}>
          <Image source={uberIcon} />
          <View style={tw`items-start px-5 justify-center`}>
            <Text style={tw`text-lg`}>Uber Cash</Text>
            <Text style={tw`text-lg text-gray-500`}>$0.00</Text>
          </View>
        </View>
        <Switch
          trackColor={{ true: 'black', false: 'gray' }}
          ios_backgroundColor="gray"
          onValueChange={setUberCash}
          value={uberCash}
        />
      </View>
      <View>
        <Text style={tw`m-5 mt-10 text-xl text-gray-500`}>Payment Method</Text>
        <View style={tw`px-5 justify-center items-start w-full`}>
          <TouchableOpacity
          onPress={()=>{handlePaymentMethodChange('5678')}}
            style={tw`w-full flex-row justify-between items-center pb-5`}
          >
            <View style={tw`items-center flex-row justify-center mb-2`}>
              <Image source={visaIcon} style={{...tw`h-10`, resizeMode:'contain', width:80, marginLeft:-5}}/>
              <Text style={tw`text-lg`}>- 5678</Text>
            </View>
            {paymentMethod==='5678' && <FontAwesomeIcon size={24} icon={faCheck} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{handlePaymentMethodChange('1234')}}
            style={tw`w-full flex-row justify-between items-center pb-5`}
          >
            <View style={tw`items-center flex-row justify-center`}>
              <Image source={visaIcon} style={{...tw`h-10`, resizeMode:'contain', width:80, marginLeft:-5}}/>
              <Text style={tw`text-lg`}>- 1234</Text>
            </View>
            {paymentMethod==='1234' && <FontAwesomeIcon size={24} icon={faCheck} />}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={tw`mt-5`}>
      <Text style={tw`m-5 text-xl text-blue-800`}>Add Payment Method</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={tw`m-5 text-xl text-blue-800`}>Add Voucher Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentScreen;
