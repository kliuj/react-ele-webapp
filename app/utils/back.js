import { hashHistory} from 'react-router'
import {getBack} from './baseStore.js'
export function utilBack(prop){
      let backData = getBack(prop.pagename)
      console.log(backData)
      if(backData.para){
        hashHistory.push('/'+backData.name+'?para='+backData.para)
      }else{
        hashHistory.push('/'+backData.name)
      }

}
