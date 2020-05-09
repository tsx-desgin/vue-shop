// 过滤price
const formatPrice=function(price){
    const arr=price.toString().split('.');
    let num =parseFloat(arr[1]);
    if(isNaN(num)||num===0){
        return arr[0]
    }
    return  parseInt(arr[0])+num/100
}
function dateFormat(fmt,date){
    let ret;
    var opt = {
        "Y+": date.getFullYear().toString(),                 //年份
        "M+": (date.getMonth()+1) .toString(),                  //月份
        "d+": date.getDate().toString(),                   //日
        "h+": date.getHours().toString(),                   //小时
        "m+": date.getMinutes().toString(),                  //分
        "s+": date.getSeconds().toString(),                  //秒
    };
    for(let k in opt){
        ret=new RegExp("("+k+")").exec(fmt);
        if(ret){
            fmt=fmt.replace(ret[1],(ret[1].length===1)?(opt[k]):(opt[k].padStart(ret[1].length,0)))
        }
    }
    return fmt;
}

const validate =function(data,validateObj){
    for(let key in data){
        if(Reflect.has(validateObj,key)){
            const res=validateObj[key](data[key],data.password);
            // console.log(res);
            if(res.error!=0){
                return res;
            }
        }
    }
    return {error:0}
}
export{
    formatPrice,
    dateFormat,
    validate,
}