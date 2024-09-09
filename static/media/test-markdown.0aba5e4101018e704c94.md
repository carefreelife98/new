---
title: "[Front-Matter] Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title"
date: "24.09.08"
categories:
  - Category1
  - Category2
  - Category3
  - Category4
tags:
  - Tag1
  - Tag2
teaser: "/assets/image/author.jpeg"

# Created by CarefreeLife98. Visit My Tech blog: 'https://carefreelife98.github.io/new' 
---

# 목표
- **Github Pages 에 배포 중인 Client-Side-Redering 환경의 React 프로젝트**에서 **마크다운 파일을 렌더링**하기.
- 서버를 Manage 할 수 없으므로 React 프로젝트 소스 내에 마크다운 파일을 저장하고, 해당 파일을 불러오도록 해야한다.
- **재사용 가능한 <Markdown />  컴포넌트**를 만들것.

# 구현
## import
```bash
npm install react-markdown

npm install rehype-highlight

npm install rehype-raw
```


```jsx
import PostMarkdown from "../../interfaces/postMarkdown";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
```
- Markdown 렌더링을 위한 `react-markdown`
- 백틱 (\`) 을 사용한 코드 블록 표현 시 풍부한 시각적 효과의 제공을 위한 `rehype-highlight`
- 마크다운 파일 내 존재하는 HTML 태그의 기능을 위한 `rehype-raw`

## interface: PostMarkdown
```js
// interfaces/postMarkdown.ts
export default interface PostMarkdown {
  category: string;
  subCategory: string;
  fileName: string;
}

export default function Markdown(postMarkdownProps: PostMarkdown){...}
```
- 각 포스트 (블로그 게시물) 는 `최상위 카테고리 > 하위 카테고리 > 게시물 리스트` 와 같은 구조를 가진다.
- 따라서 하나의 마크다운 파일은 하나의 게시물 역할을 하며, 해당 마크다운 파일을 구분하기 위해 다음과 같은 정보를 Prop 으로 받아오도록 했다.
  - **최상위 카테고리** (예: Backend, Frontend, Database, Programming Language ... )
  - **하위 카테고리** (예: Java, Spring, Typescript, MySQL ... )
  - **마크다운 파일 이름** (확장자 .md 제외)

## 1. "posts" 폴더 내의 전체 마크다운 파일 추출
```js
// require.context를 사용하여 posts 폴더 내의 모든 마크다운 파일을 가져오기.
const markdownContext = require.context('../../posts', true, /\.md$/);
```
- `require.context(${마크다운 파일이 들어있는 폴더 경로}, ${하위 폴더 탐색 여부}, ${필터})`
- 위 메서드를 통해 특정 폴더 하위 빌드된 전체 포스팅 파일(.md)을 가져온다.


## 2. 카테고리에 따른 마크다운 파일 필터링
```js
// 동적으로 카테고리와 서브카테고리로 필터링  
const targetFiles = markdownContext.keys().filter((filename: string) => {  
    return filename.includes(`/${category}/${subCategory}/`);  
});
```
- `keys().filter()` 메서드를 통해 앞서 Props 로 가져온 **최상위 카테고리 및 하위 카테고리와 일치하는 파일만 collect.**


## 3. 요청한 마크다운 파일이 존재하는 경우 fetch()
```js
// 요청한 markdown 파일이 존재하는 경우 /src/posts 폴더로부터의 하위 경로를 저장하고 이를 통해 마크다운 파일을 가져와 렌더링.  
if (targetFiles.length >= 1) {  
  
    // 파일 경로를 가져옴  
    // 경로 예시: "./{BigCategory}/{SubCategory}/{filename}.md  
    const markdownPath = markdownContext(targetFiles[0]);  
  
    // fetch로 해당 파일의 내용을 가져옴  
    fetch(markdownPath)  
        .then((response) => response.text())  
        .then((text) => {  
            setMarkdown(text);  
        })  
        .catch((error) => {  
            console.error('Error loading markdown file:', error);  
        });  
}
```
- 요청한 파일이 존재하는 경우, **해당 파일의 경로를 새로운 context 로 잡아 fetch().**
- **response 를 text 로 받은 후 상태로 저장**한다.


## 3. <ReactMarkdown />
```jsx
return (  
    <div style={{width: "100%", justifyContent: "center", display: "flex"}}>  
        <div style={{maxWidth: "2048px", width: "100%"}}>  
            <>  
                <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>  
                    {markdown}  
                </ReactMarkdown>  
            </>  
        </div>  
    </div>  
);
```
- 기본 css 를 대충 주고, react-markdown 을 통해 앞서 저장한 마크다운 상태를 렌더링한다.
- 앞서 설치한 두개의 부가 라이브러리 또한 `rehypePlugins=` prop 을 통해 넣어주기만 하면 적용된다.

## 4. 전체 코드
```tsx
import PostMarkdown from "../../interfaces/postMarkdown";  
import {useEffect, useState} from "react";  
import ReactMarkdown from "react-markdown";  
import rehypeHighlight from "rehype-highlight";  
import rehypeRaw from "rehype-raw";  
  
export default function Markdown(postMarkdownProps: PostMarkdown) {  
  
    // fetch() 를 통해 불러온 markdown 파일 내용 (string)    const [markdown, setMarkdown] = useState<string>("");  
  
    const category: string = postMarkdownProps.category;  
    const subCategory: string = postMarkdownProps.subCategory;  
    const markdownName: string = postMarkdownProps.fileName;  
  
    useEffect(() => {  
  
        // require.context를 사용하여 특정 폴더 내의 파일을 가져오기  
        const markdownContext = require.context('../../posts', true, /\.md$/);  
  
        // 동적으로 카테고리와 서브카테고리로 필터링  
        const targetFiles = markdownContext.keys().filter((filename: string) => {  
            return filename.includes(`/${category}/${subCategory}/`);  
        });  
  
        // 요청한 markdown 파일이 존재하는 경우 /src/posts 폴더로부터의 하위 경로를 저장하고 이를 통해 마크다운 파일을 가져와 렌더링.  
        if (targetFiles.length >= 1) {  
  
            // 파일 경로를 가져옴  
            // 경로 예시: "./{BigCategory}/{SubCategory}/{filename}.md  
            const markdownPath = markdownContext(targetFiles[0]);  
  
            // fetch로 해당 파일의 내용을 가져옴  
            fetch(markdownPath)  
                .then((response) => response.text())  
                .then((text) => {  
                    setMarkdown(text);  
                })  
                .catch((error) => {  
                    console.error('Error loading markdown file:', error);  
                });  
        }  
  
    }, [category, subCategory, markdownName]);  
  
    return (  
        <div style={{width: "100%", justifyContent: "center", display: "flex"}}>  
            <div style={{maxWidth: "2048px", width: "100%"}}>  
                <>  
                    <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>  
                        {markdown}  
                    </ReactMarkdown>  
                </>  
            </div>  
        </div>  
    );  
};
```

# 동작 모습

![path](/assets/images/test-post-image.png)
- 위와 같이 블로그를 설정하는 공통 config 파일을 만들었다.

![[스크린샷 2024-09-08 오전 2.27.22.png]]
- 이후 해당 config 내용 중 어떤 카테고리의 포스트 들을 노출할 것인지 상단에서 가공한 후에 상단 카테고리 이름, 하위 카테고리 이름, 파일 이름을 내려주면..!

![[스크린샷 2024-09-08 오전 2.24.47.png]]
- 음.. 추후에 css 를 조금 손보긴 해야 할 것 같다.

끝!