'use strict';
/*封装localStorage*/

//存储信息有效期
export function setTimeStore(name,value,timeout){
      //默认有效期365天
      let now  = Date.now() ;
      timeout = timeout ? now + timeout : now + 365*24*60*60*1000;
      value = Object.assign(value,{
        'savedate':now,
        'timeout':timeout
      })
      localStorage.setItem(name,JSON.stringify(value))
  }
//获取信息有效期
export function   getTimeStore(name){
      let data =  localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : {},
          now = Date.now();
      //获取超时时间,判断是否返回
      if(data.timeout){
        if(data.timeout < now){
          return {}
        }else{
          return data
        }
      }else{
        return {}
      }
  }
//删除信息   
export function deleteStore(name){
   localStorage.removeItem(name)
}
// 自动存储浏览记录
export function  saveFrom(prop) {
      let name = prop.pagename,
          transit =  prop.location,
    	    qhfrom = transit.query.qhfrom ,//默认全部返回首页
          para = transit.query.para ? JSON.parse(transit.query.para) : '';
      if(!qhfrom) return false;
    	var paths  = localStorage.getItem("FromUrlStore") ? JSON.parse(localStorage.getItem("FromUrlStore")) : {};
      if (localStorage) {
      	paths[name] = {
          'name':qhfrom,//存储来源页面
          'para':para //存储来源页面的参数
        }
      	localStorage.setItem("FromUrlStore", JSON.stringify(paths));
      }
  }

    // 返回localstorage存储的对应目录记录
export function  getBack(name) {
    	var paths = {};
      if (localStorage) {
          paths = localStorage.getItem("FromUrlStore") ? JSON.parse(localStorage.getItem("FromUrlStore")) :'';
          if(paths && paths[name]){
          	return paths[name];
          }else{
          	return {'name':'home'}
          }
      }
  }
