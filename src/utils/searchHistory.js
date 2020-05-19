import {Storage} from './storage'
const HISTOTY_NAME='search_history'
const MAX_HISTOTY_LENGTH=10
const setHistory= function(keyword){
    const history = getHistory();
    if(history.length===0){
        history.unshift(keyword)
    }else{
        const index = history.findIndex(item=>item===keyword);
        if(index>-1){
            history.splice(index,1);
        }
        history.unshift(keyword)
    }
    if(history.length>MAX_HISTOTY_LENGTH){
        history.pop()
    }
    Storage.setItem(HISTOTY_NAME,history);
}

const getHistory= function(){
    return Storage.getItem(HISTOTY_NAME)|| [];
}

const clearHistory=function(){
    Storage.deleteItem(HISTOTY_NAME)
}

export default{
    getHistory,
    setHistory,
    clearHistory
}