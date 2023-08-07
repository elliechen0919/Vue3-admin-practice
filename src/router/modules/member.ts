import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { WalletOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils';

const routeName = 'member';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/member',
    name: routeName,
    component: Layout,
    redirect: '/comp/table',
    meta: {
      title: 'member',
      icon: renderIcon(WalletOutlined),
      // 排序
      sort: 1,
    },
    children: [
      {
        path: 'basic',
        name: `${routeName}_table_basic`,
        meta: {
          title: 'Member Management',
        },
        component: () => import('@/views/comp/table/basic.vue'),
      },
      {
        path: 'editCell',
        name: `${routeName}_table_editCell`,
        meta: {
          title: 'OTP State (not yet)',
        },
        component: () => import('@/views/comp/table/editCell.vue'),
      },
    ],
  },
];

export default routes;
