import {Token} from "../utils/token"
export default{
    async getUser({commit},axios){
        const token=Token.getToken()
        if(token!==''){
            // this.$showLoading()
            const User=await axios.get('/api/user',{
                headers:{
                    token
                }
            })
            commit('setUser',User);
        }
    }
}