---
title: "Android - 배열 (Array)"
categories:
  - INU-MobileSoftware
  - Kotlin
tags:
  - INU-MobileSoftware
  - Kotlin
teaser: "/assets/images/INU/MobileSoftware/androidArray2.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 배열 객체를 생성하는 방법 - Array(), arrayOf(), (Type)ArrayOf()
> **배열 객체를 생성하는 방법에는 세 가지가 존재함.**
> 1. **Array()**
> 2. **arrayOf()**
> 3. IntArrayOf() - 잘 사용하지 않음
> 
> <br><br>
> **[중요]** **arrayOf<>() 의 반환 Type 은 Array\<String>**

```kotlin
class MainActivity : AppCompatActivity() {  
    private lateinit var binding: ActivityMainBinding  
  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        binding = ActivityMainBinding.inflate(layoutInflater)  
        setContentView(binding.root)  
  
        binding.button.setOnClickListener {  
            // arrayOf<>() : 원소의 개수가 제한적이고 각 원소의 초기 값이 다를 때 사용.
            // type: Array<type>            
            val strArr: Array<String> = arrayOf<String>("Red", "Green", "Blue")  
  
            // Array<>() : 원소의 개수가 많으며 초기 값이 같을 때 사용.  
            // type: Array<type>            
            val strArr2: Array<String> = Array(strArr.size) { idx -> strArr[idx] }  
  
            // (type)ArrayOf : 대부분의 자료형을 사용할 수 있지만 String Type 은 사용하지 못한다.  
            // type: (Type)Array            
            val boolArr = booleanArrayOf(true, false, false)  
            val intArr:IntArray = intArrayOf(9, 8, 0, 1, 1, 6)  
            // stringArrayOf 사용 불가.  
            // val stringArr = stringArrayOf("red", "green", "blue")
            
            binding.textView.text = boolArr.contentToString()  
        }  
    }  
}
```
> - **Array() & arrayOf()**
> 	- **Array() 와 arrayOf() 의 자료형은 Array\<type> 으로 동일**하다.
> 
> <br><br>
> - **(type)ArrayOf()**
> 	- **(type)ArrayOf() 의 자료형은 (Type)Array** 로서 다르게 표현됨.
> 	- **대부분의 자료형을 지원하지만 String 자료형은 지원하지 않음.**
> 		- stringArrayOf() 는 사용불가.

<br><br>

# 배열과 List Collection

```kotlin
class MainActivity : AppCompatActivity() {  
    private lateinit var binding: ActivityMainBinding  
  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        binding = ActivityMainBinding.inflate(layoutInflater)  
        setContentView(binding.root)  
  
        binding.button.setOnClickListener {  
            // 정적 자료구조. 크기가 정해져 있으며 수정 불가.  
            val strArr = arrayOf("red", "green", "blue")  
  
            // List Collection. Immutable List. 불변 리스트  
            // 추가, 삭제 및 변경 불가.  
            val strList = listOf<String>("Red", "Green", "Blue")  
  
            // List Collection. Mutable List. 가변 리스트 (동적 자료 구조)  
            val strList2 = mutableListOf<String>("Red", "Green", "Blue")  
  
            // List 내 모든 원소에 대하여 조건을 생성함으로서 Filtering 수행.  
            binding.textView.text = "${strList.filter { it.length == 3 }}"  
  
            // List 내 모든 원소에 대하여 같은 (수정) 동작을 수행.  
            binding.textView.text = "${strList.map { "Color $it" }}"  
  
            // List 와 배열 내의 모든 원소에 대하여 조건을 생성.  
            // 해당 조건을 충족하는 원소가 하나도 없을 경우 True 반환.  
            // List 에 적용.
            binding.textView.text = "${strList.none { it.length < 4 }}" // false

			// 배열에 적용.
            binding.textView.text = "${strArr.none { it.length < 4 }}" // false  
        }  
    }  
}
```

> **배열(Array)**
> - 정적 자료 구조
> - 크기가 정해져 있으며 수정이 불가능 하다.
>
> <br><br>
>
> **List Collection**
> - **Immutable List (불변 리스트)**
> 	- **listOf<>()**
> 	- 리스트 내 원소의 추가, 삭제 및 변경 불가.
> - **Mutable List (가변 리스트, 동적 자료 구조)**
> 	- **mutableListOf<>()**
> 	- 리스트 내 원소의 추가, 삭제 및 변경 가능
> - **메소드**
> 	- **.filter { }**
> 		- List 내 모든 원소에 대하여 조건을 생성하여 Filtering 수행.
> 	- **.map { }**
> 		- List 내 모든 원소에 대하여 같은 (수정) 동작을 수행.
> 	- **.none { }**
> 		- List 와 Array 모두 사용 가능.
> 		- 모든 원소에 대하여 조건을 생성.
> 			- **해당 조건을 충족하는 원소가 하나도 없을 경우 True 반환.**
> 	- **.any { }**
> 		- List 와 Array 모두 사용 가능.
> 		- 모든 원소에 대하여 조건을 생성.
> 			- **해당 조건을 충족하는 원소가 하나라도 있을 경우 True 반환.**

<br><br>

# 문자열 배열 리소스를 Array 객체에 저장
## \[string.xml] 배열 리소스 생성

```xml
<resources>  
    <string name="app_name">Android Array</string>  
    <string-array name="colors">  
        <item>Red</item>  
        <item>Green</item>  
        <item>Blue</item>  
	</string-array>
</resources>
```

> **string-array 를 사용하여 문자열 배열 리소스를 생성한다.**

<br><br>

## 문자열 배열 리소스를 MainActivity 의 Array 객체에 저장

> **string.xml 파일에 정의한 문자열 배열 리소스 (string-array) 를 MainActivity 에서 가져오려면 resources 를 참조.**

```kotlin
class MainActivity : AppCompatActivity() {  
    private lateinit var binding: ActivityMainBinding  
  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        binding = ActivityMainBinding.inflate(layoutInflater)  
        setContentView(binding.root)  
  
        binding.button.setOnClickListener {
	        // 아래처럼 코드 내에 배열의 원소를 직접 할당하는 경우는 드물다.
			// val strArr = arrayOf("red", "green", "blue")  
            // 대신 아래처럼 타 리소스 파일에 정의한 후 참조하는 방식을 주로 사용함.
            val strArr: Array<String> = resources.getStringArray(R.array.colors)  
            binding.textView.text = strArr.contentToString()  
        }  
    }  
}
```

> **resources.getStringArray()**
> - **반환 타입**
> 	- Array\<String>
> - **파라미터**
> 	- R.array.(string-array name)

<br><br>

## For 문과 StringBuilder() 를 사용하여 배열 리소스 탐색

> **`strArr.contentToString()`** 대신 For 문과 StringBuilder() 를 사용하여 배열 리소스를 탐색해보자.

```kotlin
binding.button.setOnClickListener {  
    val strArr: Array<String> = resources.getStringArray(R.array.colors)  
    var sb = StringBuilder()  
    for (element in strArr) {  
        sb.append("$element ")  
    }  
  
    binding.textView.text = sb.toString()  
}
```

> 1. StringBuilder 객체 (sb) 를 생성.
> 2. StringBuilder 에 배열의 원소를 append.
> 3. sb.toString() 을 사용하여 StringBuilder 의 모든 원소를 출력.

<br><br>

> **아래와 같이 for 문에서 원소 자체가 아닌 Index 를 사용하여 Loop 하는 방법도 있다.**

```kotlin
binding.button.setOnClickListener {  
    val strArr: Array<String> = resources.getStringArray(R.array.colors)  
    var sb = StringBuilder()  
    for (idx in strArr.indices) {  
        sb.append("${strArr[idx]} ")  
    }  
  
    binding.textView.text = sb.toString()  
}
```

> **Array 의 메서드인 indices 사용.**
> - strArr.indices : strArr 의 범위를 반환.
> - idx 는 strArr 의 index 가 되어 Loop.

<br><br>

## forEach { } 람다식 사용

```kotlin
binding.button.setOnClickListener {  
    val strArr: Array<String> = resources.getStringArray(R.array.colors)  
    var sb = StringBuilder()
    
    // 원소 자체가 움직이므로 it 사용.
    strArr.forEach { sb.append("$it ") }  
  
    binding.textView.text = sb.toString()  
}
```

> **(array).forEach { }**
> - 사용 시 배열의 각 원소에 람다 식을 적용.
> - **`it`** 은 원소 자체가 됨.

<br><br>

## forEachIndexed { } 람다식 사용

> **forEachIndexed { } 를 사용하여 Index 를 추출** 할 수 있다.

```kotlin
binding.button.setOnClickListener {  
    val strArr: Array<String> = resources.getStringArray(R.array.colors)  
    var sb = StringBuilder()  
    strArr.forEachIndexed { idx, element -> sb.append("$idx = $element ") }
  
    binding.textView.text = sb.toString()  
}
```

> **위와 같이 배열의 전체 원소 및 그 Index를 추출 할 수 있다.**

<br><br>

## Iterator 사용

```kotlin
binding.button.setOnClickListener {  
    val strArr: Array<String> = resources.getStringArray(R.array.colors)  
    val iter: Iterator<String> = strArr.iterator()  
    var sb = StringBuilder()  
    while (iter.hasNext()) {  
        sb.append("${iter.next()} ")  
    }  
    binding.textView.text = sb.toString()  
}
```

> **(배열).iterator()**
> - iterator 를 사용해서 **간단한 While 문을 통해 배열 내의 원소를 탐색**할 수 있다.
> - **자료형: Iterator\<type>**

<br><br>

# 배열 객체 생성 및 정렬
## 배열 정렬 메소드
> ![path](/assets/images/INU/MobileSoftware/androidArray1.png)<br>
> **정렬은 문자의 크기를 ASCII 순서로 비교하게 된다.** <br>
> 아래와 같은 배열을 정렬해보자.

<br><br>

> **strings.xml**

```xml
<resources>  
    <string name="app_name">Android Array</string>  
    <string-array name="colors">  
        <item>red</item>  
        <item>!Green</item>  
        <item>Blue</item>  
    </string-array>
</resources>
```

<br><br>

> **MainActivity.kt**

```kotlin
/* ... */

binding.button.setOnClickListener {  
    val strArr = resources.getStringArray(R.array.colors)  
    strArr.sort()  
    binding.textView.text = strArr.contentToString()  
}

/* ... */
```

<br><br>

**정렬 실행 결과**

> ![path](/assets/images/INU/MobileSoftware/androidArray2.png)<br>
> 위와 같이 **ASCII Code 순으로 오름차 순 정렬**된 것을 볼 수 있다.
> - **현재 가장 작은 ASCII 값을 가진 문자는 `!`** 이다.

```kotlin
binding.button.setOnClickListener {  
    val strArr = resources.getStringArray(R.array.colors)  
    var sb = StringBuilder()  
    val chArr = Array(strArr.size) { i -> strArr[i][0] }  
    chArr.forEach { sb.append("ch=${it.code} ") }  
    binding.textView.text = sb.toString()  
}
```

> 위 코드로 간단하게 각 문자열의 첫번째 문자 ASCII Code 를 확인해 볼 수 있다.

<br><br>
## Android - strings.xml 에 배열 리소스 정의

```xml
<resources>  
    <string name="app_name">Android Array</string>  
    <string-array name="colors">  
        <item>red</item>  
        <item>!Green</item>  
        <item>Blue</item>  
    </string-array>    
    
    <integer-array name="intArr">  
        <item>11</item>  
        <item>22</item>  
        <item>33</item>  
    </integer-array>    
    
    <string-array name="floatArr">  
        <item>3.14</item>  
        <item>23402.3</item>  
        <item>-0.63</item>  
    </string-array>
</resources>
```

> 위와 같이 **\<string-array name="colors"> 와 같은 태그를 이용하여 배열을 정의** 할 수 있다.
> - **string-array, integer-array 는 지원하지만 float-array 는 없음.**
> - 따라서 **실수 배열을 정의해야 하는 경우에는 string-array 로 리소스 생성 후 MainActivity 등과 같은 kotlin 파일에서 toFloat() 등을 사용하여 형 변환 후 사용해야 한다.**

<br><br>

> **실수 배열 사용 예시**

```kotlin
binding.button.setOnClickListener {  
    val intArr = resources.getIntArray(R.array.intArr)

	// string 배열로 생성된 실수 배열을 받아온 후
    val strArr = resources.getStringArray(R.array.floatArr)  
    
    // toFloat() 를 사용하여 형 변환.
    val floatArr: Array<Float> = Array(strArr.size) { i -> strArr[i].toFloat() }  
  
    binding.textView.text = floatArr.contentToString()  
}
```

<br><br>

지식 공유를 위한 Android 개인 학습 포스트입니다.
피드백은 항상 환영합니다!
긴 글 읽어주셔서 감사합니다.
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] 배열 객체를 생성하는 방법 - Array(), arrayOf(), (Type)ArrayOf()
- [x] 배열과 List Collection
- [x] 문자열 배열 리소스를 Array 객체에 저장
- [x] \[string.xml] 배열 리소스 생성
- [x] 문자열 배열 리소스를 MainActivity 의 Array 객체에 저장
- [x] For 문과 StringBuilder() 를 사용하여 배열 리소스 탐색
- [x] forEach { } 람다식 사용
- [x] forEachIndexed { } 람다식 사용
- [x] Iterator 사용
- [x] 배열 객체 생성 및 정렬
- [x] 배열 정렬 메소드
- [x] Android - strings.xml 에 배열 리소스 정의
