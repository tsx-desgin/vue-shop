export default{
    username(val){
        if(val===''){
            return {error:1,message:'账号为空'}
        }
        if(val.length<=3){
            return {error:1,message:'账号长度要大于3'}
        }
        return {error:0}
    },
    password(val){
        if(val===''){
            return {error:1,message:'密码为空'}
        }
        if(val.length<=3){
            return {error:1,message:'密码长度要大于3'}
        }
        if(/^[a-z]/i.test(val)===false){
            return {error:1,message:'密码要以字母开头'}
        }
        return {error:0}
    },
}