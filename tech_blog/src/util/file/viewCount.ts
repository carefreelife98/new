//TODO: CSR 환경이라 파일을 읽어 수정해가며 쓰려 했는데, 이 또한 생각해보니 말이 안됨. 조회수는 포기.

// 첫 줄의 숫자를 추출합니다.
import {useState} from "react";

// Webpack의 require.context를 사용하여 파일을 가져옵니다.
const fileContext = require.context('../../assets/files', false, /count\.txt$/);
const countFilePath = fileContext.keys()[0]; // 첫 번째 파일의 경로를 가져옵니다
// 가져온 파일의 경로 설정.
const filePath = fileContext(countFilePath);

export default function GetViewCount(): number {

    const [viewCount, setViewCount] = useState<number>(0);

    // fetch로 해당 파일의 내용을 가져옴
    fetch(filePath)
        .then(async (response) => {
            setViewCount(parseInt(await response.text()))
        })
        .catch((error) => {
            console.error('Error loading viewCount file:', error);
        });

    if (isNaN(viewCount)) {
        throw new Error('The first line does not contain a valid number.');
    }

    return viewCount ? viewCount : 0;
}

export function setViewCount() {

};