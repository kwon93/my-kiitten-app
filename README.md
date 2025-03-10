# MyKiittenApp 요구사항

## 1. 프로젝트 목표
- 반려동물 주인들이 애완동물의 건강을 체계적으로 관리할 수 있도록 돕는다.
- 정기적인 예방 접종, 건강 검진 등의 일정을 알려준다.

## 2. 주요 기능

### a. 사용자 관리
- 회원가입 및 로그인
- 프로필 관리 (이메일 주소 포함)

### b. 애완동물 정보 관리
- 애완동물 등록 (이름, 종류, 품종, 생년월일, 몸무게 등)
- 애완동물 정보 수정 및 삭제

### c. 예방 일정 관리
- 애완동물 종류와 나이에 따른 예방 접종, 건강 검진 일정 자동 생성
- 사용자 정의 일정 추가 기능

### d. 알림 시스템
- 이메일을 통한 알림 발송
- 알림 주기 설정 (예: 일정 3일 전, 1주일 전 등)

## 3. 사용자 역할
- 일반 사용자: 애완동물 정보 등록, 알림 받기
- 관리자: 시스템 관리, 기본 예방 일정 설정

## 4. 기술적 요구사항
- Backend: Nest.js
- Frontend: React.js
- Database: PostgreSQL
- 이메일 발송 서비스 (예: Nodemailer, SendGrid 등)

## 5. 비기능적 요구사항
- 사용자 친화적인 UI/UX
- 반응형 웹 디자인 (모바일 대응)
- 데이터 보안 (개인정보 보호)

## 6. 제약사항
- 초기 버전에서는 가장 일반적인 애완동물 (개, 고양이)에 대한 정보만 제공
