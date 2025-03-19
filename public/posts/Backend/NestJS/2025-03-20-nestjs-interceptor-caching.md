---
title: "[Nest.js] Custom Interceptor 기반 캐싱을 통해 조회 성능 높히기"
author: "Carefreelife98"
date: "25. 03. 20"
categories:
  - NestJS
tags:
  - NestJS
  - TypeScript
  - Cache
thumbnail: "/new/assets/images/backend/nestjs/nestjs-interceptor-caching1.png"
---

<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
# [Nest.js] Interceptor 란?
```
대량의 계층형 데이터를 반환하는 API의 응답 속도를 높히기 위해 Nest.js 에서 제공하는 Interceptor 를 사용하여 
더욱 편리하게 API Endpoint 별 Redis 캐싱을 수행하도록 한다.
```

![path](/new/assets/images/backend/nestjs/nestjs-interceptor-caching1.png)
- `Interceptor` 는 `NestInterceptor` 인터페이스를 구현하며 `@Injectable()` 데코레이터가 적용된 `NestJS` 의 클래스이다.
- `AOP (Aspect Oriented Programming)` 기술로부터 영감을 얻은 아래와 같은 기능들을 가지고 있다.
	- **Method 실행 전/후 간의 부가 로직 수행 기능 제공 (전/후처리)**
	- **함수(function) 수행 결과 및 Exception  반환 형태의 변환 (Transform)**
	- **기본 함수의 동작 확장**
	- **특정한 목적을 위해 함수를 완벽히 Override (대체) 가능 (캐싱 등)**
		- **캐싱**: 요청이 들어왔을 때, 인터셉터가 캐시된 결과가 존재하는지 먼저 확인. 만약 캐시된 결과가 있다면, 실제 비즈니스 로직(예: 데이터베이스 조회나 내부 가공 로직)을 실행하지 않고 캐시된 데이터를 바로 반환. 이 경우, 원래 메서드의 실행을 완전히 override 하여 다른 결과(캐시된 데이터)를 반환.
		- **특정 조건 기반**: 다른 조건(예: 사용자 인증, 로깅, 예외 처리 등)에 따라 원래 함수의 로직을 건너뛰고 전혀 다른 처리를 할 수도 있다.

<br><br>

# [Nest.js] Interceptor 기초
```bash
모든 Interceptor 들은 아래와 같은 두 개의 인자를 가지는 intercept() 메서드를 구현해야 한다.
```

<br><br>

## 1. ExecutionContext
`ArgumentsHost` 를 상속받음. (적절한 인자를 사용하기 위한 HTTP / RPC / WebSockets 의 구분을 제공.)
- 공식 문서: [ArgumentsHost](https://docs.nestjs.com/fundamentals/execution-context#argumentshost-class)

현재 실행 프로세스에 대한 추가적인 상세 정보를 제공하기 위해 다양한 헬퍼 메서드를 제공.
- 공식 문서: [ExecutionContext](https://docs.nestjs.com/fundamentals/execution-context)

<br><br>

## 2. CallHandler
인터셉터가 특정 시점에 RouteHandler 를 불러오도록 사용할 수 있는 `handle()` 메서드를 구현.
- **주의사항** `Interceptor` 에서 구현한 `intercept()` 메서드에서 `handle()`메서드를 호출한 후에 `RouteHandler` 가 실행됨. (컨트롤러로 요청이 전달됨)

이러한 접근은 `intercept()` 메서드가 request/response 스트림을 효율적으로 감싸고 있음을 뜻함.
- 이로 인해 **최종 RouteHandler 의 실행 전/후에 특정 비즈니스 로직을 구현** 할 수 있음.

```bash
intercept() 메서드에서 handle() 을 호출하기 전에 특정 로직을 수행하는 건 알겠는데, handle() 이 호출된 후의 처리는 어떻게 가능한거야?
```
- 이것이 가능한 이유는, `handle() 메서드가 Observable 을 반환` 하기 때문.
	- `RxJS` 의 강력한 연산자를 통해 이후 응답을 처리할 수 있도록 함.
	- `AOP` 용어로, **RouteHandler 를 불러오는 것** 을 `PointCut` 이라고 하며, 이는 `개발자가 정의한 추가로직이 어떤 시점에 삽입될 지` 를 나타낸다.

<br><br>

## Interceptor 에 의한 전처리 / 후처리 예시
```
HTTP Method: POST
url: http://localhost:8080/build
```

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CarefreeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // 요청에 대한 전처리

    const now = Date.now();
    return next // 요청에 대한 후처리
      .handle() // handle() 메서드 미정의 시 해당 인터셉터가 적용된 컨트롤러 / 핸들러는 수행되지 않는다.
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

```typescript
@Controller('/build')
@UseInterceptors(CarefreeInterceptor)
export class CarefreeLife {
	@Post()
	build() {
		console.log('Build CarefreeLife!');
	}
}
```

```bash
// 수행 결과 예시
Before...
Build CarefreeLife!
After... 1ms
```
- `[POST] /build` 경로를 통해 `CarefreeLife` 라는 컨트롤러에 정의된 `build()` 라는 핸들러로 사용자의 요청이 향한다고 가정.
- 만약 `CarefreeInterceptor` 에 `handle()` 메서드가 정의되어 있지 않다면, `build()` 핸들러는 절대 실행되지 않아 로그가 찍히지 않는다.
	- `handle()` 메서드가 정의되고 그에  의해  `Observable` 이 반환되면 `build()` 핸들러가 실행될 수 있다.
	- 이후 `Observable` 을 통해 `Response Stream` 을 받으면, 이후의 추가 로직 (후처리) 이 해당 스트림 위에서 수행되어 최종 결과를 요청자에게 반환할 수 있게 된다.

<br><br>

# 캐싱 로직이 필요했던 이유
- `변동성이 적은 대규모 계층형 트리 데이터` 를 주로 조회해오는 서비스를 개발하는 과정에서 매 조회 시마다 DB 쿼리를 수행하는 것은 `리소스 낭비` 라는 판단을 내렸다.
- 쿼리 뿐만 아니라, 전체 데이터를 Closure Table 기반으로 구현된 계층형 트리 리스트로 가공하는 과정에서 다양한 부가 정보들이 삽입되는데, 해당 가공 로직 또한 매 조회 시 마다 수행하는 것은 불필요하다는 판단을 내렸다.
- 따라서 해당 데이터를 각 API Endpoint 및 쿼리 파라미터의 조합을 기준으로 `Redis 에 캐싱하여 조회 성능을 극대화` 하는 방향으로 결정했다.

<br><br>

# 왜 Custom Interceptor 를 구현하여 캐싱을 수행했는가?
- Interceptor 를 사용하는 경우, `Request stream 을 통해 컨트롤러에 전달되기 전에 전처리를 수행` 할 수 있어 내부 로직 진입 전에 캐시 여부를 확인하여 즉시 반환 할 수 있기 때문에 현 상황에서 가장 효율적이라는 판단을 내렸다.
- 만약 캐시가 존재하지 않는다면, Interceptor 를 통해 반환된 `Observable 을 사용해 후처리를 수행하여, Database 및 서비스를 거쳐 가공된 Response 를 캐싱` 하는것에도 가장 이상적인 방향이라고 생각했다.
- 또한 캐싱 로직을 특정 서비스만을 위한 내부 로직으로 구현하지 않고 `Custom Interceptor 기반의 공통 유틸` 로서 구현해놓는다면, 해당 프로젝트의 모든 서비스에서 편리하게 API 별 캐싱을 수행할 수 있게 되어 `확장 가능한 범용 소스` 가 될 수 있기 때문이었다.

<br><br>

# [CacheModule] 추가적인 대안은 없었는가?
사실 `Nest.js` 자체적으로 제공하는 `CacheModule` 또한 대안으로서 존재했다.<br>
CacheModule 은 In-memory 기반의 빠른 캐싱을 아주 쉽게 수행할 수 있도록 도와준다.<br>
또한 `CacheModule` 은 `Custom Interceptor` 를 따로 구현하지 않아도 자체적으로 제공하는 `CacheInterceptor` 를 사용하여 동일한 효과를 얻을 수 있다.<br>

<br><br>

하지만 이미 Redis 를 도커로 띄워 사용하고 있는 현 상황에서는 `Redis 를 사용하는 것에 추가적인 리소스 할당이 요구되지 않았다.`<br>
추후 해당 서비스를 `Scale-out` 하게 된다면 `in-memory 기반의 캐싱은 1차 캐싱 용도로만 사용` 되고, 결국 `Redis 기반의 외부 분산 캐시 시스템` 을 구축해야 할 것이었다.<br>
또한 현재 캐싱하고 있는 대규모 계층형 데이터를 캐싱할 때 `Redis 에서 제공하는 hset, hget 과 같은 고급 자료구조 (Hash)` 기반의 명령어를 통해 여러 조건에 따른 `객체 / Dictionary 형태의 데이터를 효율적으로 저장하고 관리` 할 수 있다는 장점이 컸다.

<br><br>

# [Nest.js] RedisInterceptor 구현

```typescript
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';  
import { catchError, Observable, of } from 'rxjs';  
import { RedisCacheService } from '../cache/redis.cache.service';  
import { tap } from 'rxjs/operators';  
import { instanceToPlain } from 'class-transformer';  
import { ConfigService } from '@nestjs/config';  
  
@Injectable()  
export class RedisInterceptor implements NestInterceptor {  
    constructor(  
        private readonly redisService: RedisCacheService,  
        private readonly configService: ConfigService,  
    ) {}  
    private readonly logger = new Logger('RedisInterceptor');  
  
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {  
        const prefix = this.configService.get<string>('REDIS_INTERCEPTOR_CACHE_PREFIX');  
        const ttl = this.configService.get<number>('REDIS_INTERCEPTOR_CACHE_TTL');  
        const key = RedisInterceptor.generateCacheKeyByHostType(context, prefix);  
  
        const cachedResponse = await this.redisService.get(key);  
        if (cachedResponse) {  
            return of(cachedResponse);  
        }  
  
        return next.handle().pipe(  
            tap(async (response) => {  
                // 캐시된 데이터가 없으면 응답을 Redis에 저장 (TTL: 60초)  
                const safeResponse = instanceToPlain(response);  
                await this.redisService.set(key, JSON.stringify(safeResponse), ttl);  
            }),  
            catchError((error) => {  
                this.logger.error(`Error ::: RedisInterceptor ::: message [${error.message}]`, { stack: error.stack });  
                throw Error(error);  
            }),  
        );  
    }  
	
	// HostType 에 따른 동적 Key 생성 로직 (API Endpoint / Query Param 기반으로 URL인코딩 된 키 생성)
    static generateCacheKeyByHostType(ctx: ExecutionContext, prefix: string): string {  
        const hostType = ctx.getType();  
		
        if (hostType === 'http') {  
            const request = ctx.switchToHttp().getRequest<Request>();  
            prefix += encodeURIComponent(request.url);  
        }  
		
        return prefix;
    }  
}
```
- `NestInterceptor` 를 구현한 `RedisInterceptor` 클래스 생성.
	- `NestInterceptor` 에 정의된 `intercept()` 메서드 오버라이딩.
- `generateCacheKeyByHostType()`
	- `ExecutionContext` 를 통해 요청의 HostType 및 request stream 을 받아, `HostType 별 Redis Key 를 생성` 한다. (현 예시는 HostType === 'http' 기준 url 을 인코딩하여 Redis Key 생성)
	  
## intercept(context: ExecutionContext, next: CallHandler) 메서드
```typescript
async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
	/**
	 * 전처리 과정
	 * - 해당 request 에 대한 캐시가 존재하는 경우 캐시데이터 반환
	 */
	const prefix = this.configService.get<string>('REDIS_INTERCEPTOR_CACHE_PREFIX');  
	const ttl = this.configService.get<number>('REDIS_INTERCEPTOR_CACHE_TTL');  
	const key = RedisInterceptor.generateCacheKeyByHostType(context, prefix);  
	
	const cachedResponse = await this.redisService.get(key);  
	if (cachedResponse) {  
		return of(cachedResponse);  
	}  
	
	/**
	 * 후처리 과정
	 * - 해당 request 에 대한 캐시가 존재하지 않는 경우 next.handle() 을 통해 observing 하며 요청에 대한 response 데이터를 Redis 에 캐싱한다.
	 */
	return next.handle().pipe(
		tap(async (response) => {
			const safeResponse = instanceToPlain(response);  
			await this.redisService.set(key, JSON.stringify(safeResponse), ttl);  
		}),  
		catchError((error) => {  
			this.logger.error(`Error ::: RedisInterceptor ::: message [${error.message}]`, { stack: error.stack });  
			throw Error(error);  
		}),  
	);  
}  
```
- **전처리 과정 (해당 request 에 대한 캐시가 존재하는 경우)**
	- 컨트롤러 (핸들러) 에 요청을 전달하지 않고 즉시 캐시데이터 반환.
	  
- **후처리 과정 (해당 request 에 대한 캐시가 존재하지 않는 경우)**
	- `next.handle() 을 통해 observing` 하며 `요청에 대한 response 데이터를 Redis 에 캐싱` 한다.

# Custom Interceptor 사용 예시 및 결과
## 사용 예시
```typescript
import { Controller, UseInterceptors, BadRequestException } from '@nestjs/common';
import { RedisInterceptor } from '../../common/interceptor/redis.interceptor';
import { CarefreeService } from './carefree.service';

@UseInterceptors(RedisInterceptor)  // 커스텀 인터셉터 적용
@Controller('care')  
export class CarefreeController {
	constructor(private readonly carefreeService: CarefreeService) {}
	
	@Get('free')  
	public async find(@Query('free') free: string): Promise<FreeDto> {  
	    if (!free) throw new BadRequestException({}, 'carefree 가 확인되지 않았습니다.');  
	  
	    const response = await this.carefreeService.(free);  
	    return FreeDto.of({ data: response });  
	}  
  
	@Get('life')  
	public async findLife(@Query('life') life: string): Promise<LifeDto> {  
	    if (!life) throw new BadRequestException({}, 'life 가 확인되지 않았습니다.');  
	  
	    const response = await this.carefreeService.generateLife(life);  
	    return LifeDto.of({ data: response });  
	}
	
}
```
- 각 컨트롤러 / 내부 핸들러에 `@UseInterceptors()` 데코레이터를 적용하여 구현한 커스텀 인터셉터를 인스턴스가 아닌 클래스 형태로 넘겨주면 된다.
	- 현 예시는 해당 컨트롤러 내부 전체 핸들러에 `RedisInterceptor` 가 적용되는 형태이다.
- 위처럼, `RedisInterceptor` 를 구현한 덕에 캐싱이 필요한 모든 컨트롤러 및 핸들러에서 `@UseInterceptors()` 데코레이터를 통해 동일한 캐싱 정책을 쉽고 빠르게 정의할 수 있게 되었으며, 변경에 용이하고 확장 가능한 형태의 아키텍쳐를 구축할 수 있게 된다.

## 결과
![path](/new/assets/images/backend/nestjs/nestjs-interceptor-caching2.png)
- Winston 기반 로깅 Interceptor 를 통해 각 API 호출 별 실행 시간 또한 로깅하고 있다.
- `209ms` 정도 소요되던 API Response time 이 `3ms` 정도로 `약 70배` 감소된 것을 확인 할 수 있다.


<br><br><br><br>