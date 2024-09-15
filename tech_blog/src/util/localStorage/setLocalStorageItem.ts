import dayjs from "dayjs";

export function setLocalStorageItem<T>(keyName: string, value: T, validHour: number) {
    // localStorage에 저장할 객체
    const obj = {value: value, expire: dayjs().add(validHour, 'hour')};
    // 객체를 JSON 문자열로 변환
    const objString = JSON.stringify(obj);
    // setItem
    window.localStorage.setItem(keyName, objString);
}