export default function (name, object) {
  if(!name) return undefined;
  let obj = object;
  name.split(".").map(i => {
    if(obj){ obj = obj[i] }
  });
  return obj;
}