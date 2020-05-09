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
    confirmPwd(val,password){
         if(val===''){
            return {error:1,message:'确认密码为空'}
        }
        if(val!=password){
            // console.log(password)
            return {error:1,message:'确认密码跟密码不一致'}
        }
        return {error:0}
    },
     nickname(val){
         if(val===''){
            return {error:1,message:'昵称为空'}
        }
        if(/[\u4e00-\u9fa5]/.test(val)===false){
            return {error:1,message:'昵称必须包含中文'}
        }
        return {error:0}
    },
}