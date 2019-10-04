
export function format(num){
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  
  return (num + "").replace(reg, '$&,');
}