let Api = {};

import axios from 'axios'
import head from '@/components/head'

export default {
  install(Vue, options) {
    // 网络请求
    Vue.prototype.$invoke = function (uri, ask, cb, context) {

      let view = context || {};

      view.loading = true;
      view.error = false;
      view.code = 0;
      view.message = "";
      view.status = 0;
      view.tips = view.tips || true;

      return axios.request({
        url: "apis/v1/ouepm" + uri,
        method: 'POST',
        data: ask,
        headers: {'content-type': 'application/json'},
        })
        .then((response) => {
          view.loading = false;
          let ack = response.data;

          if (ack.code != 0) {

            view.error = true;
            view.message = ack.msg;
            if (view.tips) {
              this.$message({
                showClose:true,
                message:"服务器返回错误 （" + ack.code + " : " + ack.msg + ")",
              })
            }

          }else{
            if(cb) {
              cb(ack.data)
            }else if (view.data){
              view.data = ack.data;
            }
          }

        })
        .catch((err) => {

          view.loading = false;
          view.error = true;

          let r = err.response;

          if(view.tips) {
            this.$message({
              showClose: true,
              message: 'HTTP请求失败 (' + r.status + " : " + r.statusText + ")",
              type: 'error'
            });
          }

        })

    };
  }
}
