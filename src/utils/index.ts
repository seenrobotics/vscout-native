import {Platform} from 'react-native'

export default class Utils {
  static capitalize = (string: string): string => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : 'undefined';
  };
  static getDeepLink = (path = "") => {
    const scheme = 'vscout'
    const prefix = Platform.OS == 'android' ? `${scheme}://2381/` : `${scheme}://`
    return prefix + path
  }
}
