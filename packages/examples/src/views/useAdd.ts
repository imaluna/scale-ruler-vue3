export const useAdd = () => {
  const list = reactive<number[]>([]);
  console.log(list);
  function add(num: number) {
    list.push(num);
    list.sort();
    console.log(JSON.stringify(list));
  }
  return { list, add };
};
