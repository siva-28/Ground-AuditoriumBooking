import {StyleSheet} from 'react-native'
export default StyleSheet.create({
    heading:{
        fontSize:25,
        textAlign:'center'

    },
    input:{
        backgroundColor:'rgba(255,255,255,0.2)',
        height:40,
        marginBottom:20,
        color:'#FFFF',
        marginHorizontal:20,
        justifyContent:'center',
        borderRadius: 25,
        padding:12,
    },
    parent:{
        flex:1,
        justifyContent:'center'
    },
    container:{
        flex:1,
        backgroundColor:'#65ACEA',
        justifyContent:'center'
    },
        Buttoncontainer:{
        backgroundColor:'#2980b9',
        width:'30%',
        marginHorizontal:80,
        marginVertical:20,
        borderRadius: 25,
        padding:10,
        //flex: 1,
        //flexDirection: 'row',
        //justifyContent: 'space-between'   
    },
    Buttontext:{
        textAlign:'center',
        color:'#FFFF'
    }
})