---
title: "Data Structure : (4) 포인터 (Pointer)"
date: 23. 04. 13
categories:
  - INU-DataStructure
tags:
  - DataStructure
  - Pointer
  - C/C++
teaser: "/assets/images/INU/pointer.png"
---

# Data Structure :: 포인터 (Pointer)

```
포인터(Pointer) 란 ?
```
<img src="/assets/images/INU/pointer.png" alt="pointer_Procdess" />

- **`"포인터: 다른 변수의 주소를 가지고 있는 변수"`**

## 포인터 연산자: &, *

<img src="/assets/images/INU/pointerdef.png" alt="pointerdef_Procdess" />

- 포인터와 관련된 두 가지의 중요한 연산이 있다.

<br><br>

<img src="/assets/images/INU/and.png" alt="and_Procdess" />

### 주소 연산자: &
  - (&) 연산자는 변수의 주소를 추출하는 연산자 이다. 
  - 앞에서 선언한 포인터 p가 특정한 변수를 가리키게 하려면 **`"변수의 주소를 & 연산자로 추출 후 p에 대입한다."`**

<br><br>

<img src="/assets/images/INU/aster.png" alt="aster_Procdess" />

### 간접 참조 연산자 (역참조 연산자)
  - (*) 연산자는 포인터가 가리키는 장소에 값을 저장.
  - (ex) p가 가리키는 장소에 200을 저장하려면 다음과 같은 문장을 사용.

```c
int a;    // 정수형 변수
p = &a;   // 변수의 주소를 포인터에 저장
*p = 200; // p가 가리키고 있는 a에 값을 저장
```

- **`📣 *p와 a가 동일한 메모리 위치를 참조하고 있으므로, *p == a 이다. 📣`**
- 값만 같은 것이 아닌, 실질적으로 동일한 객체를 가리키기 때문에 *p의 값을 변경하게 되면 a의 값도 바뀌게 된다..!!

# 포인터의 각종 연산

```
포인터의 각종 연산
```

```c
 p    	// 포인터
*p    	// 포인터가 가리키는 값
*p++  	// 포인터가 가리키는 값을 가져온 다음, 포인터를 한칸 증가한다.
*p--  	// 포인터가 가리키는 값을 가져온 다음, 포인터를 한칸 감소한다.
(*p)++ 	// 포인터가 가리키는 값을 증가시킨다.

int a;	  // 정수 변수 선언
int *p;	  // 정수 포인터 선언
int **pp;	// 정수 포인터의 포인터 선언
p = &a;	  // 변수 a와 포인터 p를 연결
pp = &p; 	// 포인터 p와 포인터의 포인터 pp를 연결
```

# 다양한 포인터

```c
void *p; // p는 아무것도 가리키지 않는 포인터

int *pi; // pi는 정수 변수를 가리키는 포인터

float *pf; // pf는 실수 변수를 가리키는 포인터

char *pc;  // pc는 문자 변수를 가리키는 포인터

int **pp;	// pp는 포인터를 가리키는 포인터

struct test *ps; // ps는 test 타입의 구조체를 가리키는 포인터

void (*f)(int) ; // f는 함수를 가리키는 포인터

(포인터의 형 변환)
void *p;
pi=(int *) p; // 필요항 때마다 형 변환하는 것이 가능하다.
```

# NULL 포인터

```c
if (p == NULL) {
  fprintf(stderr, "오류: NULL pointer exception");
  return;
}
```
- **"NULL 포인터는 어떤 객체도 가르키지 않는 포인터"** 이다.
  - 일반적으로 C 언어에서는 **`NULL`** 이라는 매크로로 표시한다.
  - 포인터를 사용하기 전에 반드시 해당 포인터가 NULL 포인터 인지 검사해야 안전한 프로그래밍을 할 수 있다.

```c
main() {
  char *pc; 	// 포인터 pi는 초기화가 안되어 있음
  *pc = 'E'; 	// 위험한 코드

  // char *pc = NULL; 이처럼 초기화를 해주어야 한다.
}

pointer_type_swap() {
  int *pi;
  float *pf;
  pf = (float *)pi;

  // 포인터 타입 간의 형 변환 시에는 명시적인 타입 변환을 사용하자.
}
```

- 📣 포인터가 아무것도 가르키지 않는다면, 항상 NULL 상태로 초기화 해두어야 한다. 📣
  - 디버깅 과정에서 예외가 발생해 어디서 `NullPointerException` 이 일어났는지를 쉽게 알 수 있기 때문이다.
  - 잘못된 포인터를 가지고 메모리를 변경하는 것은 치명적인 결과를 가져올 수 있다..!

# 매개변수로 포인터 사용

```
함수의 매개변수로 포인터 사용하기
```

- 포인터는 함수의 parameter 로 전달될 수 있다.
- 특정 변수를 가리키는 포인터가 함수의 매개변수로 전달되면 해당 포인터를 이용하여 **`"함수안에서 외부 변수의 값을 변경할 수 있다."`**

```c
#include <stdio.h>

void swap(int *px, int *py){
  int tmp;
  tmp = *px;
  *px = *py;
  *py = tmp;
}

int main(void){
  int a = 1, b = 2;
  printf("swap 함수를 호출하기 전: a = %d, b = %d\n", a, b)
  swap(&a, &b);
  printf("swap 함수 호출 후: a = %d, b = %d\n", a, b)
  return 0;
}

실행결과:
"swap 함수를 호출하기 전: a = 1, b = 2"
"swap 함수 호출 후: a = 2, b = 1"
```

# 배열과 포인터

<img src="/assets/images/INU/arrpointer.png" alt="arrpointer_Procdess">`배열과 포인터의 관계: 배열의 이름은 배열의 첫 인덱스를 가리킨다.`<br>
- **`"함수로 배열이 전달되는 경우에도 함수 내부에서 배열의 내용을 변경 할 수 있다."`**
- 컴파일러가 `배열의 이름을 배열의 첫번째 주소` 로 대치. (하지만 실제로 배열의 이름에 메모리를 할당 하지는 않는다.)
- 배열의 이름이 포인터이기 때문에 함수의 매개변수로 전달될 때에 사실은 `배열이 아닌 포인터가 전달` 되는 것이다.

# 구조체와 포인터

<img src="/assets/images/INU/structpointer.png" alt="structpointer_Procdess">`구조체의 포인터: 구조체의 요소에 접근하는 연산자.`<br>

```c
main() {
  struct {
	  int i;
	  float f;
  } s, *ps;

  ps = &s; // 포인터 ps 에 구조체 s의 주소를 알려준다.
  ps->i = 2; // 포인터 ps가 구조체 s의 요소인 int i를 가리켜 i에 2를 대입시킨다.
  ps->f = 3.14; // 포인터 ps가 구조체 s의 요소인 float f를 가리켜 f에 3.14를 대입시킨다. 
}
```
- 위에서 본 `->` 표기법은 ps가 구조체를 가리키는 포인터 라고 할 때, `(*ps).i` 대신 더 편리하게 `ps->i` 로 나타낼 수 있다.

# 포인터의 포인터

<img src="/assets/images/INU/pointerpointer.png" alt="pointerpointer_Procdess">`포인터의 포인터: 다른 포인터에 연결되는 포인터.`<br>

```c
int a;		// 정수 변수 변수 선언
int *p;		// 정수 포인터 선언
int **pp;	// 정수 포인터의 포인터 선언
p = &a;		// 변수 a와 포인터 p를 연결
pp = &p; 	// 포인터 p와 포인터의 포인터 pp를 연결
```

# 포인터 연산

<img src="/assets/images/INU/calpointer.png" alt="calpointer_Procdess">`포인터의 사칙연산`<br>

- 포인터에 대한 사칙연산: **`"포인터가 가리키는 객체 단위로 계산"`** 된다.

```c
p    	// 포인터
p+1  	// 포인터 p가 가리키는 객체의 바로 뒤 객체 
p-1  	// 포인터 p가 가리키는 객체의 바로 앞 객체 
```

# 전치 행렬 계산하기 (SparseMatrix)

```
지금까지 공부한 내용을 바탕으로 전치 행렬 계산 프로그램을 만들어보자.
```

- 행렬에서 하나의 요소는 (row, col, value) 로 표현할 수 있다.
  - 구조체 element 로 정의.
- 하나의 행렬에 0이 아닌 요소가 여러 개 존재 가능
  - element의 배열
- 하나의 희소 행렬을 구성하는 것들을 모아 SparseMatrix 구조체로 정의.


## 🔥 알고리즘 🔥
```
(0,3,7) -> (3,0,7)
(1,0,9) -> (0,1,9)
(1,5,8) -> (5,1,8)

```
1. 새로운 구조체 b 생성
2. 구조체 a에 저장된 모든 요소에 대하려 다음 코드를 반복

```c
  b.data[bindex].row = a.data[i].col; // b의 행과 a의 열을 가리키는 포인터를 바꾼다
  b.data[bindex].col = a.data[i].row; // b의 열과 a의 행을 가리키는 포인터를 바꾼다
  b.data[bindex].value = a.data[i].value; // b의 값과 a의 값을 가리키는 포인터를 바꾼다
  bindex++; // 다음 저장 위치로 넘어간다.
```

```c
#include<stdio.h>
#include<stdlib.h>

#define MAX_TERMS 100

// 구조체 element 생성
typedef struct {
    int row;
    int col;
    int value;
} element;

typedef struct SparseMatrix {
    element data[MAX_TERMS];
    int rows;   // 행의 개수
    int cols;   // 열의 개수
    int terms;  // 항의 개수
} SparseMatrix;


SparseMatrix matrix_transpose(SparseMatrix a) {

    SparseMatrix b; // 구조체 b 생성

    int bindex; // 행렬 b 에서 현재 저장위치
    b.rows = a.rows;
    b.cols = a.cols;
    b.terms = a.terms;

    if (a.terms > 0) {
        bindex = 0;
        for(int c = 0; c < a.cols; c++){
            for(int i = 0; i < a.terms; i++) {
                if (a.data[i].col == c) {
                    b.data[bindex].row = a.data[i].col;
                    b.data[bindex].col = a.data[i].row;
                    b.data[bindex].value = a.data[i].value;
                    bindex++;
                }
            }
        }
    }
    return b;
}

void matrix_print(SparseMatrix a) {
    printf("-------------------------\n");
    for(int i = 0; i<a.terms; i++) {
        printf("(%d, %d, %d) \n", a.data[i].row, a.data[i].col, a.data[i].value);
    }
    printf("-------------------------\n");
}

int main(void) {

    SparseMatrix m = {
        {
          {0,3,7}, {1,0,9}, {1,5,8}, {3,0,6}, {3,1,5}, {4,5,1}, {5,2,2}
          },
        6,
        6,
        7 
    };
    SparseMatrix result;

    result = matrix_transpose(m);
    matrix_print(result);
    return 0;
}
```

<img src="/assets/images/INU/matrix.png" alt="matrix_Procdess">`전치 행렬 프로그램 계산 결과`<br>

<br><br><br>

# Task Lists
> 
- [x] Data Structure : 포인터(Pointer) 란 ?
- [x] 포인터와 관련된 연산자 : &, *
- [x] 포인터의 각종 연산
- [x] 다양한 포인터
- [x] NULL 포인터
- [x] 배열과 포인터
- [x] 구조체와 포인터
- [x] 포인터의 포인터
- [x] 포인터 연산
- [x] 전치 행렬 계산하기 (SparseMatrix)
