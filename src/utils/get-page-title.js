/*
 * @Author: mingxing.huang
 * @Date: 2020-10-29 21:45:29
 */

const title = 'Vue Next Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
