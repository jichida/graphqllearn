import React from 'react'
import { FormattedMessage } from 'react-intl'

export const getlocalstring_typestring = (typestring,locale)=>{
  if(locale === 'zh-cn'){
    return typestring;
  }

  if(typestring === '套利奖励'){
    return 'arbitrage awards';
  }
  if(typestring === '提现'){
    return 'withdraw';
  }
  if(typestring === '冲币'){
    return 'recharge';
  }
  if(typestring === '俱乐部套利奖励'){
    return 'club arbitrage awards';
  }
  if(typestring === '转出'){
    return 'transfered';
  }
}

export const getlocalstring_status = (status,locale)=>{
  if(locale === 'zh-cn'){
    if(status === 'finished'){
      return <FormattedMessage id="money.arbitrage.success" />;
    }
    if(status === 'processing' || status === 'new'){
      return <FormattedMessage id="money.arbitraging" />;
    }
    if(status === 'canceled'){
      return <FormattedMessage id="money.arbitrage.cancelstatus" />;
    }
  }
  return status;
}


// exports.getlocalstring_typestring = getlocalstring_typestring;
// exports.getlocalstring_status = getlocalstring_status;
