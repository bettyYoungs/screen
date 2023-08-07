import { cloneDeep } from 'lodash';
const typeArr = ['string', 'number'];
export default function optionAssign(dataOption, configObj) {
  const configOption = cloneDeep(configObj.option.option || {});
  const handlerFunc = (option, defaultOption, isArray = false) => {
    if (!isArray) {
      for (let key in defaultOption) {
        if (
          option[key] === undefined ||
          (typeof defaultOption[key] !== typeof option[key] &&
            (!typeArr.includes(typeof defaultOption[key]) || !typeArr.includes(typeof option[key])))
        ) {
          option[key] = defaultOption[key];
        } else if (Object.prototype.toString.call(defaultOption[key]) === '[object Object]') {
          handlerFunc(option[key], defaultOption[key]);
        } else if (
          Object.prototype.toString.call(defaultOption[key]) === '[object Array]' &&
          key == 'series'
        ) {
          handlerFunc(option[key], defaultOption[key], true);
        }
      }
    } else {
      option.forEach((ele, index) => {
        const item = defaultOption[index] || defaultOption[0];
        for (let key in item) {
          if (
            option[index][key] === undefined ||
            (typeof item[key] !== typeof option[index][key] &&
              (!typeArr.includes(typeof item[key]) || !typeArr.includes(typeof option[index][key])))
          ) {
            option[index][key] = item[key];
          } else if (Object.prototype.toString.call(item[key]) === '[object Object]') {
            handlerFunc(option[index][key], item[key]);
          }
        }
      });
    }
    // else {
    //   console.log('defaultOption**************', defaultOption, option);
    //   defaultOption.forEach((item, index) => {
    //     if (!option[index]) {
    //       return;
    //     }
    //     for (let key in item) {
    //       console.log('option[index]', item, option[index], key);
    //       if (
    //         option[index][key] === undefined ||
    //         (typeof item[key] !== typeof option[index][key] &&
    //           (!typeArr.includes(typeof item[key]) || !typeArr.includes(typeof option[index][key])))
    //       ) {
    //         option[index][key] = item[key];
    //       } else if (Object.prototype.toString.call(item[key]) === '[object Object]') {
    //         handlerFunc(option[index][key], item[key]);
    //       }
    //     }
    //   });
    // }
  };
  handlerFunc(dataOption, configOption);
}
