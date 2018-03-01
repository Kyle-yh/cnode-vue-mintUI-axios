import axios from 'axios'
import { Indicator,Toast } from 'mint-ui';

const apiUrl = 'https://cnodejs.org/api/v1';

const httpRequest = (url,data) => {
    Indicator.open();
    if(!data){
        return axios.get(url).then((res) => {
            Indicator.close();
            return Promise.resolve(res);
        }).catch((err)=>{
            Indicator.close();
            Toast({
                message: '网络请求错误',
                className: 'warning-toast'
            });
            return Promise.reject(err);
        })
    }else{
        return axios.post(url,data).then((res) => {
            Indicator.close();
            return Promise.resolve(res);
        }).catch((err)=>{
            Indicator.close();
            Toast({
                message: '网络请求错误',
                className: 'warning-toast'
            });
            return Promise.reject(err);
        })
    }
}

//获取主题
const getTopics = (tab,page) => {
    let url = '';
    if(!page){
        if(tab != 'all'){
            url = `${apiUrl}/topics?limit=20&tab=${tab}`;
    
        }else{
            url = `${apiUrl}/topics?limit=20`;
        }
    }else{
        if(tab != 'all'){
            url = `${apiUrl}/topics?limit=20&tab=${tab}&page=${page}`;
    
        }else{
            url = `${apiUrl}/topics?limit=20&page=${page}`;
        }
    }
    return httpRequest(url);
}
//进入详情
const getDetail = (id) => {
    let url = `${apiUrl}/topic/${id}`;
    return httpRequest(url);
}
//登录
const login = (accesstoken) =>{
    let url = `${apiUrl}/accesstoken`;
    return httpRequest(url,{
        accesstoken:accesstoken 
    })
}
//评论
const replies = (topic_id,accesstoken,content,reply_id) =>{
    let url = `${apiUrl}/topic/${topic_id}/replies`;
    if(!reply_id){
        return httpRequest(url,{
            accesstoken:accesstoken,
            content:content
        })
    }else{
        return httpRequest(url,{
            accesstoken:accesstoken,
            content:content,
            reply_id:reply_id
        })
    }
}

//点赞
const thumbUp = (accesstoken,reply_id) => {
    let url = `${apiUrl}/reply/${reply_id}/ups`;
    return httpRequest(url,{
        accesstoken:accesstoken
    })
}

//获取定位
const getPosition = () =>{
    let ip = ''
    return axios.get('http://freegeoip.net/json/').then(res => {
        ip = res.data.ip;
        return axios.get(`http://restapi.amap.com/v3/ip?key=c5c368adb8bb95aac7cab8099f2b716c&ip=${ip}`).then(res => {
            return res.data;
        })
    })
}
//获取用户详情
const getProfile = (loginname) =>{
    let url = `${apiUrl}/user/${loginname}`;
    return httpRequest(url)
}

//收藏主题
const collect = (accesstoken,topic_id) =>{
    let url = `${apiUrl}/topic_collect/collect`;
    return httpRequest(url,{
        accesstoken:accesstoken,
        topic_id:topic_id
    })
}

//取消收藏主题
const deCollect = (accesstoken,topic_id) =>{
    let url = `${apiUrl}/topic_collect/de_collect`;
    return httpRequest(url,{
        accesstoken:accesstoken,
        topic_id:topic_id
    })
}

//获取所收藏的主题
const getCollect = (loginname) =>{
    let url = `${apiUrl}/topic_collect/${loginname}`;
    return httpRequest(url)
}

//获取消息
const getMessage = (accesstoken) =>{
    let url = `${apiUrl}/messages?accesstoken=${accesstoken}`;
    return httpRequest(url)
}

//新建主题
const saveTopic = (accesstoken,title,tab,content) => {
    let url = `${apiUrl}/topics`;
    return httpRequest(url,{
        accesstoken:accesstoken,
        title:title,
        tab:tab,
        content:content
    })
}

//获取未读消息数
const getCount = (accesstoken) =>{
    let url = `${apiUrl}/message/count?accesstoken=${accesstoken}`;
    return httpRequest(url)
}

//标记全部为已读
const setAllReaded = (accesstoken) =>{
    let url = `${apiUrl}/message/mark_all`;
    return httpRequest(url,{
        accesstoken:accesstoken
    })
}

//标记单个为已读
const setReaded = (accesstoken,msg_id) =>{
    let url = `${apiUrl}/message/mark_one/${msg_id}`;
    return httpRequest(url,{
        accesstoken:accesstoken
    })
}

export default {
    getTopics,
    getDetail,
    login,
    replies,
    thumbUp,
    getPosition,
    getProfile,
    collect,
    deCollect,
    getCollect,
    getMessage,
    saveTopic,
    getCount,
    setAllReaded,
    setReaded
}