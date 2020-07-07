const KEY_USERINFO = process.env.VUE_APP_NAME;

export const userInfoCache = (cache => {
  if (!cache) {
    return {}
  }
  try {
    return JSON.parse(cache)
  }
  catch(e) {
    localStorage.setItem(KEY_USERINFO, {});
    return {}
  }
})(localStorage.getItem(KEY_USERINFO))

export function getMenu() {
  return userInfoCache && userInfoCache.menuList
}

export function getToken() {
  return userInfoCache && userInfoCache.userInfo.token
}

export function getUser() {
  return userInfoCache && userInfoCache.userInfo
}