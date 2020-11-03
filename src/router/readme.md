### 路由定义格式

```js
  {
    path: '/form',
    name: 'Form', // 如果配置了redirect，不设置name
    hidden: false,     // 是否在侧边栏菜单显示
    component: Layout,
    meta: {
 	   title: '表单',  // 侧边栏菜单显示名称
 		 icon: 'MenuOutlined',  // 侧边栏显示图标，直接使用ant design vue 支持的图标名称(https://2x.antdv.com/components/icon-cn/)
 	 },
    children: [
      {
 			 path: 'form1',
 			 name: 'Form1',
 			 component: () => import('..form1.vue'),
 			 meta: {
 					title: '表单1',
 					icon: 'MenuOutlined',
 					roles: ['admin'] // 角色控制，只有admin可以看到
 				}
 		 },
      {
 			 path: 'form2',
 			 name: 'Form2',
 			 component: () => import('...form2.vue'),
 			 meta: {
 					title: '表单2',
 					icon: 'MenuOutlined',
 					roles: ['admin', 'guest'] // 角色控制，admin、guest都可以看到
 				}
 			}
    ]
  }
```
