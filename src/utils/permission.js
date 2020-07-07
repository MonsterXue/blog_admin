import router from "@/router"
import { getMenu } from "@/utils/auth.js"

const toRoute = function (item, route) {
  if (item.menuUrl) {
    route.push({
      path: item.menuUrl,
      name: item.menuUrl.substring(1),
      meta: {
        title: item.menuName
      },
      component: () => import(`@/views${item.menuUrl}/index.js`)
    });
  }

  if (item.children) {
    for (let i = 0; i < item.children.length; i++) {
      toRoute(item.children[i], route);
    }
  }
}

export function menuToRoute(menu) {
  const route = {
    path: '/',
    component: () => import("@/layout/index.vue"),
    children: []
  };
  menu.forEach(item => {
    toRoute(item, route.children);
  });
  return [route]
}

export function addRoutes(menu) {
  router.addRoutes(menuToRoute(menu));
}

const menu = getMenu();

export function resetMenu(menu) {
  menu.sort((a, b) => {
    return a.menuIndex - b.menuIndex
  })
  menu.forEach(ele => {
    if (ele.children) {
      resetMenu(ele.children);
    }
  })
}

if (menu) {
  router.addRoutes(menuToRoute(menu));
}