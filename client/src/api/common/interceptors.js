import store from "@/store/index";

export function setInterceptors(instance) {
    // Add a request interceptor
    instance.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            console.log(config);
            config.headers.Authorization = store.state.token;
            return config;
        }, 
        function (error) {
            //요청이 잘못되었을 때 에러가 컴포넌트 단으로 오기 전에 어떤 처리를 할 수 있다.
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        // 서버에 요청 보낸 후 응답 받기 전에 처리
        function (response) {
            return response;
        }, 
        function (error) {
            //응답이 에러인 경우에 미리 전처리할 수 있다. 
            return Promise.reject(error);
        }
    );

    return instance;
}
