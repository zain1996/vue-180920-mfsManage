import head from '@/components/head'
import NavMenu from '@/components/NavMenu'
import RoleSelect from '@/components/RoleSelect'
import project_name from '@/components/project_name'
import receivables from '@/components/receivables'
import sales from '@/components/sales'
import business from '@/components/business'
import remark from '@/components/remark'
import pop from '@/components/popver'
import payables from '@/components/payables'
import paid from '@/components/paid'
import received from '@/components/received'
import add from '@/components/add'
import UserAdd from '@/components/UserAdd'
import UserEdit from '@/components/UserEdit'
import project_date from '@/components/project_date'

let mfs = [
  head,
  NavMenu,
  RoleSelect,
  receivables,
  sales,
  business,
  remark,
  project_name,
  payables,
  received,
  UserAdd,
  paid,
  add,
  pop,
  project_date,
  UserEdit
]

export default {
  install (Vue, options){

    let userInfo = {};

    mfs.map(component => {
      Vue.component(component.name, component);
    });

    // 跳转
    Vue.prototype.$go = function (uri,) {
      return this.$router.replace({path: uri});
    };

    // 注销
    Vue.prototype.$clearUser = function () {
      localStorage.removeItem('login');
      this.$router.replace({path: '/login'});
    };

    //eventBus 全局注册
    Vue.prototype.$bus = new Vue();

    // 设置全局用户信息
    Vue.prototype.$setUserInfo = function (val) {
      userInfo = val
    };

    // 获取全局用户信息
    Vue.prototype.$getUserInfo = function () {
      return userInfo
    }
  }
}

