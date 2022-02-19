import axios from 'axios';
import { setInterceptors } from './common/interceptors'

function createInstance() {
    return axios.create({
        baseURL: process.env.VUE_APP_API_URL,
    })
}

// 엑시오스 초기화 함수
function createInstanceWithAuth(url) {
    const instance = axios.create({
        baseURL: `${process.env.VUE_APP_API_URL}${url}`,
    });
    
    return setInterceptors(instance);
}

export const instance = createInstance();
// const results = createInstanceWithAuth('breastTypeTest/result');

// 유저 데이터 조회하는 API
// function fetchResults() {
//     // mypage에서 유저 본인의 테스트 결과를 확인할 때 
//     return instance.get('breastTypeTest/result')
// }

function fetchUserData() {
    return instance.get('users/getInfo')
}

function fetchUserKitData() {
    return instance.get('kits/img/getPath')
}


export { createInstance, createInstanceWithAuth, fetchUserData, fetchUserKitData };