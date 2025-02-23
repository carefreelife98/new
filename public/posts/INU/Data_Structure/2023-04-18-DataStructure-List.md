---
title: "Data Structure : (7-1) 배열 리스트 (List)"
date: 23. 04. 18
categories:
  - INU-DataStructure
  - C
tags:
  - Data Structure
  - List
  - Array List
  - Linked List
  - C/C++
thumbnail: "/assets/images/INU/list.png"
---

# Data Structure : List 란?

```
Data Structure : 리스트의 소개
```

<img src="/assets/images/INU/list.png" alt="list_Procdess" />`사진출처:`[jimmyglenos](https://jimmyglenos.com/2021/01/19/make-your-to-do-list-a-ta-da-list/)<br>

```
리스트(List)란, 우리들이 자료(data)를 정리하는 방법중에 하나이다.

- 리스트에는 항목(자료)들이 "차례대로" 정리되어있다. 리스트를 구성하고 있는 항목들은 순서 or 위치 를 가진다.
- 📣 각 항목간에 순서가 없는 집합은 리스트가 아니다!! 📣 
```

<img src="/assets/images/INU/listdef.png" alt="listdef_Procdess">`수식으로 표현된 리스트`<br>
- 지금까지 소개한 리스트로는 어떤 연산을 할 수 있을까?
  - `삽입연산(insert):` 리스트에 새로운 항목을 추가한다.
  - `삭제연산(delete):` 리스트에서 항목을 삭제한다.
  - `탐색연산(seek):` 리스트에서 특정한 항목을 찾는다.

## 리스트 ADT

```
리스트 ADT(Abstract Data Type) - 추상 데이터 타입
```
<img src="/assets/images/INU/ADT.png" alt="ADT_Procdess" />`ADT로 정의된 리스트.`<br><br>

## 리스트의 구현

**리스트ADT는 배열과 연결리스트를 이용하여 구현이 가능하다.**
- **`배열`** 을 이용할 시 구현 과정이 매우 간단해지지만, 크기가 고정(static)된다.
- 포인터(~~으윽..~~)를 이용하여 **연결리스트** 를 만들어 구현하는 방법은 상대적으로 더 복잡하지만, malloc 과 포인터의 조합으로 **동적으로 크기를 조정**할 수 있을 뿐 아니라 **`"책장처럼 원하는 위치에서 자료를 삽입, 삭제, 탐색 할 수 있다."`**

<img src="/assets/images/INU/ARRvsList.png" alt="ARRvsList_Procdess" />`배열과 리스트의 모습.` `사진출처:`[open4tech](https://open4tech.com/array-vs-linked-list-vs-hash-table/)<br><br>

## 리스트의 구현: 배열 (Array List)

```
배열로 연결리스트를 구현해보자.
```
<img src="/assets/images/INU/seqrepresentation.png" alt="seqrepresentation_Procdess" />`Sequential Representation`
- 배열로 리스트를 구현하면 순차적인 메모리 공간이 할당된다.
- 이것을 **`리스트의 순차적 표현(Sequential Representation)`** 이라고 한다.

### 리스트의 정의
- 배열 리스트를 구현하기 위해 배열과 항목의 개수를 구조체로 정의해보자.

```c
#define MAX_LIST_SIZE 100 // 리스트의 최대 크기

typedef int element; // 항목의 정의

typedef struct {
  element array[MAX_LIST_SIZE]; // 배열 정의
  int size; // 현재 리스트에 저장된 항목들의 개수
} ArrayListType;  // 새로운 타입 ArrayListType 정의
```


### 기초 연산 with ArrayList
- 모든 연산은 구조체 포인터를 받는다. (함수 내부에서 구조체를 변경할 필요도 있기 때문에)
- 포인터를 사용하지 않으면 복사본이 전달되어 원본 구조체에 영향을 미칠 수 없다.

```c
#include<stdio.h>
#include<stdlib.h>

#define MAX_LIST_SIZE 100 // 리스트의 최대 크기

typedef int element; // 항목의 정의

typedef struct {
  element array[MAX_LIST_SIZE]; // 배열 정의
  int size; // 현재 리스트에 저장된 항목들의 개수
} ArrayListType;  // 새로운 타입 ArrayListType 정의

// 오류 처리 함수
void error(char *message) {
    fprintf(stderr,"%s",message);
    exit(1);
}

// 리스트 초기화 함수
void init_list(ArrayListType *L) {
    L->size = 0;
}

// 리스트가 비어있으면 1, 아니면 0 반환
int is_empty(ArrayListType *L) {
    return L->size == 0;
}

// 리스트가 꽉 차있으면 1, 아니면 0 반환
int is_full(ArrayListType *L) {
    return L->size == MAX_LIST_SIZE;
}

element get_entry(ArrayListType *L, int pos) {
    if(pos < 0 || pos >= L->size) {
        error("pos 위치 오류");
    }
    return L->array[pos];
}

// 리스트 출력
void print_list(ArrayListType *L)
{
	int i;
	for (i = 0; i<L->size; i++)
		printf("%d->", L->array[i]);
	printf("\n");
}

// 리스트에 데이터 추가
void insert_last(ArrayListType *L, element item) {
    if(is_full(L)) {
        error("리스트 오버플로우");
    }
    L->array[L->size++] = item;
}
```

### 배열 리스트의 항목 삽입 연산
- 여기까지는 스택, 큐 ADT와 큰 차이가 없을 것이다.
- 이제 List의 가장 큰 특징인 **`자료구조 중간에서의 삽입과 삭제`**를 알아보자.
- ArrayList에서 pos위치에 데이터를 추가하려면 어떻게 해야 할까?
  - pos번째부터 마지막 항목까지 한 칸씩 오른쪽으로 이동하여 빈자리를 만든다.
  - 새로운 항목을 pos 위치에 저장한다.
    - (ex.) arr[1] 에 데이터를 추가하려면
      1. arr[4] 데이터 이동-> arr[5],
      2. arr[3] 데이터 이동-> arr[4] ...
         - 이런 식으로 가장 마지막 항목부터 이동해야 한다.

<img src="/assets/images/INU/arrlistinsert.png" alt="arrlistinsert_Procdess" /><br>`ArrayList의 삽입 과정`<br><br>

```c
//항목 삽입 연산

void insert(ArrayListType *L, int pos, element item) {
    if(!is_full(L) && (pos >= 0) && (pos <= L->size)) {
        // 리스트의 제일 끝 항목부터 항목 이동.
        for(int i = (L->size - 1); i >= pos; i--) {
            L->array[i+1] = L->array[i];
        }
        // pos 위치에 새로운 항목 저장후 현재 List의 크기를 나타내는 size의 크기를 하나 늘려준다.
        L->array[pos] = item;
        L->size++;
    }
}
```

### 배열 리스트의 항목 삭제 연산
<img src="/assets/images/INU/arrlistdelete.png" alt="arrlistdelete_Procdess">`ArrayList의 삭제 연산`<br><br>
- pos 위치의 항목을 삭제하는 delete(list, pos) 를 구현해보자.
- 삽입 함수와 마찬가지로 삭제한 후에 array[pos + 1] 부터 array[size - 1] 까지를 한 칸씩 앞으로 이동하여야 한다.

```c
//항목 삭제 연산

element delete(ArrayListType *L, int pos) {
    if(pos < 0 && pos >= (L->size)) {
        error("pos 위치 오류");
    }
    // 반환을 위해 pos 위치 항목 임시저장.
    element item = L->array[pos];
    for(int i = pos; i < (L->size-1); i++) {
        L->array[i] = L->array[i+1];
    }
    L->size--;
    return item;
}
```

## 배열 리스트 테스트 프로그램

```
앞서 알아본 배열 리스트를 프로그램을 통해 테스트 해보자.
```

```c
#include<stdio.h>
#include<stdlib.h>

#define MAX_LIST_SIZE 100 // 리스트의 최대 크기

typedef int element; // 항목의 정의

typedef struct {
  element array[MAX_LIST_SIZE]; // 배열 정의
  int size; // 현재 리스트에 저장된 항목들의 개수
} ArrayListType;  // 새로운 타입 ArrayListType 정의

// 오류 처리 함수
void error(char *message) {
    fprintf(stderr,"%s",message);
    exit(1);
}

// 리스트 초기화 함수
void init_list(ArrayListType *L) {
    L->size = 0;
}

// 리스트가 비어있으면 1, 아니면 0 반환
int is_empty(ArrayListType *L) {
    return L->size == 0;
}

// 리스트가 꽉 차있으면 1, 아니면 0 반환
int is_full(ArrayListType *L) {
    return L->size == MAX_LIST_SIZE;
}

element get_entry(ArrayListType *L, int pos) {
    if(pos < 0 || pos >= L->size) {
        error("pos 위치 오류");
    }
    return L->array[pos];
}

// 리스트 출력
void print_list(ArrayListType *L)
{
	int i;
	for (i = 0; i<L->size; i++)
		printf("%d->", L->array[i]);
	printf("\n");
}

// 리스트에 데이터 추가
void insert_last(ArrayListType *L, element item) {
    if(is_full(L)) {
        error("리스트 오버플로우");
    }
    L->array[L->size++] = item;
}

void insert(ArrayListType *L, int pos, element item) {
    if(!is_full(L) && (pos >= 0) && (pos <= L->size)) {
        // 리스트의 제일 끝 항목부터 항목 이동.
        for(int i = (L->size - 1); i >= pos; i--) {
            L->array[i+1] = L->array[i];
        }
        // pos 위치에 새로운 항목 저장후 현재 List의 크기를 나타내는 size의 크기를 하나 늘려준다.
        L->array[pos] = item;
        L->size++;
    }
}

element delete(ArrayListType *L, int pos) {
    if(pos < 0 && pos >= (L->size)) {
        error("pos 위치 오류");
    }
    // 반환을 위해 pos 위치 항목 임시저장.
    element item = L->array[pos];
    for(int i = pos; i < (L->size-1); i++) {
        L->array[i] = L->array[i+1];
    }
    L->size--;
    return item;
}

int main(void)
{
	// ArrayListType를 정적으로 생성하고 ArrayListType를 	
	// 가리키는 포인터를 함수의 매개변수로 전달한다.
	ArrayListType list;

	init_list(&list);		
	insert(&list, 0, 10);	print_list(&list);	// 0번째 위치에 10 추가
	insert(&list, 0, 20);	print_list(&list);	// 0번째 위치에 20 추가
	insert(&list, 0, 30);	print_list(&list);	// 0번째 위치에 30 추가
	insert_last(&list, 40);	print_list(&list);	// 맨 끝에 40 추가
	delete(&list, 0);		print_list(&list);	// 0번째 항목 삭제
	return 0;
}
```


<img src="/assets/images/INU/arrlisttest.png" alt="arrlisttest_Procdess" /><br>`ArrayList 테스트 결과`<br><br>**😊 해설 😊**<br>
1. 10이 리스트의 0번째 위치에 추가됨.
2. 20이 리스트의 0번째 위치에 추가됨. ▶️ 기존 0번에 있던 10이 한 칸 옆으로 밀린다.
3. insert_last를 사용해 40을 마지막 인덱스에 추가.
4. 30 -> 20 -> 10 -> 40
5. delete 를 호출, 0번째 항목 삭제
6. 20 -> 10 -> 40

<br><br><br>

## Task Lists
> 
- [x] Data Structure : List 란?
- [x] 리스트 ADT(Abstract Data Type) - 추상 데이터 타입
- [x] 배열로 연결리스트를 구현해보자.
- [x] 기초 연산 with ArrayList
- [x] 배열 리스트의 항목 삽입 연산
- [x] 배열 리스트의 항목 삭제 연산
- [x] 배열 리스트 테스트 프로그램