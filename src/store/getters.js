export default{
    reset: state=> {
        if(state.user==null){
            state.user='刷新失败,请重新刷新一下!!!'
            return state.user
        }
    }
}