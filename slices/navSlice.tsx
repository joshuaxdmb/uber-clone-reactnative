import { createSlice } from '@reduxjs/toolkit';

export interface RootState {
  nav: {
    origin: {
      location: {
        lat: number;
        lng: number
      };
      description:string
    };
    destination: {
        location: {
          lat: number;
          lng: number
        };
        description:string
      };
    travelTimeInformation: {
        duration:any;
        distance:any;
    };
    paymentMethod:string;
    rideOption:string;
  };
}

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  paymentMethod:'5678',
  rideOption:null
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setPaymentMethodState:(state,action)=>{
        state.paymentMethod = action.payload
    },
    setRideOption:(state,action)=>{
        state.rideOption = action.payload
    }

  },
});

export const { setOrigin, setDestination, setTravelInformation, setPaymentMethodState, setRideOption } =
  navSlice.actions;
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>state.nav.travelTimeInformation;
export const selectPaymentMethod = (state:RootState) =>state.nav.paymentMethod;
export const selectRideOption = (state:RootState) => state.nav.rideOption
export default navSlice.reducer;
