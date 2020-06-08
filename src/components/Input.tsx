import React, {useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native'
import Block from './Block'
import Text from './Text'
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable'
export const InputOptions = [
    "text"
] as const;
export type InputTypes =  typeof InputOptions;
export interface InputProps {

}

const Input = () => {
    return (
    <Block style={{padding : 4}}>
    <Block style= {{flexDirection : "row", flexShrink: 1 }}>
        <Text color="white" style={{flex : 1, fontSize : 20, marginLeft : 14}}> Title</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{}} style={{}}> 
          <FeatherIcon name='more-horizontal' size={20} style={{color:"white", borderWidth : 2, borderColor : "white", borderRadius :2, padding: 2, flex: 0.2, paddingLeft: 8}}/>
        </TouchableOpacity>
    </Block>
    <Block style= {{flexDirection : "row"}}>
    <TextInput
          style={{
            backgroundColor: "white",
            fontFamily: "Montserrat-Regular",
            flexDirection :"row",
            flex : 0.5,
            borderRadius : 4,
            borderColor: "black",
            borderStyle : "solid",
            borderWidth : 1
          }}
            // onChangeText={handleChange('email')}
            // onBlur={handleBlur('email')}
            value={"yee"}
          />
    </Block>
        

    </Block>
        
    )
}
export default Input;