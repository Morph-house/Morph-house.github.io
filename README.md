# Yddrasil 홍보 페이지

Wisp, Flit, Irisa Bridge 등 요정 컨셉 앱을 만드는 Yddrasil 소개용 정적 웹페이지입니다.
빌드 과정 없이 HTML / CSS / JS 파일만으로 동작합니다.

## 구조

```
index.html        페이지 본문 (앱 소개 문구는 여기서 고칩니다)
style.css         스타일
script.js         별·빛가루 배경, 스크롤 등장 효과
assets/           로고와 앱 아이콘 (각 앱의 런처 아이콘 벡터를 SVG로 옮김)
.nojekyll         GitHub Pages가 Jekyll 처리를 건너뛰게 함
```

## 로컬에서 보기

`index.html`을 브라우저로 열면 됩니다.

## GitHub Pages로 배포

1. GitHub에 새 저장소를 만들고 이 폴더 내용을 올립니다.
2. 저장소 **Settings → Pages**에서 Source를 `Deploy from a branch`, Branch를 `main` / `/ (root)`로 고릅니다.
3. 잠시 뒤 `https://<계정>.github.io/<저장소>/` 주소로 열립니다.
   저장소 이름을 `<계정>.github.io`로 하면 `https://<계정>.github.io/` 주소가 됩니다.

## 새 요정(앱) 추가

1. `assets/`에 아이콘 SVG를 넣습니다.
2. `index.html`의 `<section id="fairies">` 안에 있는 `<article class="fairy">` 하나를 복사해 이름, 설명, 기능 칩, `--accent` 색을 바꿉니다.
