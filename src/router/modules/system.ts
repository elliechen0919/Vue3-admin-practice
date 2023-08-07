import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { OptionsSharp } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

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
    path: '/system',
    name: 'System',
    redirect: '/system/menu',
    component: Layout,
    meta: {
      title: 'System',
      icon: renderIcon(OptionsSharp),
      sort: 1,
    },
    children: [
      {
        path: 'user',
        name: 'system_user',
        meta: {
          title: 'User Management',
        },
        component: () => import('@/views/list/basicList/index.vue'),
      },
      // todo 之後改一下path
      {
        path: 'user/basic-info/:id?',
        name: 'system_user_basic-info',
        meta: {
          title: '基础详情',
          hidden: true,
          activeMenu: 'basic-list',
        },
        component: () => import('@/views/list/basicList/info.vue'),
      },
      {
        path: 'role',
        name: 'system_role',
        meta: {
          title: 'User Role Management',
        },
        component: () => import('@/views/system/role/role.vue'),
      },
    ],
  },
];

export default routes;
