import { ToastProps } from '@/types/types';
import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CustomToast: React.FC<ToastProps> = ({ text1, text2, props }) => (
   <View
    style={{
      height: hp("7%"),
      width: wp('91.11%'),
      backgroundColor: '#209928',
      borderRadius: 10,
      paddingLeft: wp("1.6%"),
      justifyContent: 'center',
      shadowColor: '#3d3d3d',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    }}
  >
    <View
    style={{
      height: "100%",
      width: '100%',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: wp("4%"),
      justifyContent: 'center',
      shadowColor: '##3d3d3d',
      borderTopRightRadius:10,
      borderBottomRightRadius:10,
      
    }}
    >
<Text style={{ color: '#209928',fontWeight: '600', fontSize:RFValue(12) ,fontFamily:"Poppins-Medium",top:hp("0.25%")}}>{text1}</Text>
    {text2 ? <Text style={{ color: '#209928' , fontSize:RFValue(10),fontWeight:"500",fontFamily:"Poppins-Regular",bottom:hp("0.25%")}}>{text2}</Text> : null}
  </View>
  </View>
);

const CustomToast2: React.FC<ToastProps> = ({ text1, text2, props }) => (
  <View
    style={{
      height: hp("7%"),
      width: wp('91.11%'),
      backgroundColor: '#d32f2f',
      borderRadius: 10,
      paddingLeft: wp("1.6%"),
      justifyContent: 'center',
      shadowColor: '#3d3d3d',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    }}
  >
    <View
    style={{
      height: "100%",
      width: '100%',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: wp("4%"),
      justifyContent: 'center',
      shadowColor: '##3d3d3d',
      borderTopRightRadius:10,
      borderBottomRightRadius:10,
      
    }}
    >
<Text style={{ color: '#B71C1C', fontWeight: '600', fontSize:RFValue(12) ,fontFamily:"Poppins-Medium",top:hp("0.25%")}}>{text1}</Text>
    {text2 ? <Text style={{ color: '#C62828' , fontSize:RFValue(10),fontWeight:"500",fontFamily:"Poppins-Regular",bottom:hp("0.25%") }}>{text2}</Text> : null}
  </View>
  </View>
);


const CustomToast3: React.FC<ToastProps> = ({ text1, text2, props }) => (
  <View
    style={{
      height: hp("7%"),
      width: wp('91.11%'),
      backgroundColor: '#0288D1',
      borderRadius: 10,
      paddingLeft: wp("1.6%"),
      justifyContent: 'center',
      shadowColor: '#3d3d3d',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    }}
  >
    <View
     style={{
      height: "100%",
      width: '100%',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: wp("4%"),
      justifyContent: 'center',
      shadowColor: '##3d3d3d',
      borderTopRightRadius:10,
      borderBottomRightRadius:10,
      
    }}
    >
<Text style={{ color: '#0D47A1', fontWeight: '600', fontSize:RFValue(12) ,fontFamily:"Poppins-Medium",top:hp("0.25%")}}>{text1}</Text>
    {text2 ? <Text style={{ color: '#1B4F72' , fontSize:RFValue(10),fontWeight:"500",fontFamily:"Poppins-Regular",bottom:hp("0.25%")}}>{text2}</Text> : null}
  </View>
  </View>
);


export const toastConfig = {
  success: (props: any) => <CustomToast {...props} />,
  error: (props: any) => <CustomToast2 {...props} />,
  information: (props: any) => <CustomToast3 {...props} />,
};
