import dotwalking from "./dotwalking"
/**
 * 
 * @param {String} string 
 * @param {*} object 
 */
export default function (string, object) {
  let updatable_string = string;
  
  [...string.matchAll("(?<={{).+?(?=}})")].map(i => i[0]).map(i => {

    updatable_string = updatable_string.replace(`{{${i}}}`, dotwalking(i.trim(), object))
  })
  return updatable_string;

}