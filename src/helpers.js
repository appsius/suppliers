export default async function getData(tag, data, setData) {
  window.localStorage.setItem(tag, JSON.stringify(data));
  const parsedData = JSON.parse(window.localStorage.getItem(tag));
  return setData(parsedData);
}
