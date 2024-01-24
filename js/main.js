import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

//장바구니
const baskekStarterEl = document.querySelector('header .basket-starter')
const basketEl = baskekStarterEl.querySelector('.basket')

baskekStarterEl.addEventListener('click', function(event) {
  event.stopPropagation() //장바구니 아이콘이 window 영역이 아니라는 기능을 추가 즉, 아이콘 클릭하면 드랍다운이 보임
  if (basketEl.classList.contains('show')) { //show 유무에 따라 false & true 값 반환
    hideBasket()
  } else {
    showBasket()
  }
});

basketEl.addEventListener('click', function (event) { //드롭다운 메뉴를 선택해도 드롭다운이 닫히지 않도록 하는 기능
  event.stopPropagation()
})

window.addEventListener('click', function () { //화면을 클릭하면 드롭다운인 show가 사라지는 기능을 추가
  hideBasket() 
});

function showBasket() {
  basketEl.classList.add('show') //드롭다운 메뉴 보여주기
}
function hideBasket() {
  basketEl.classList.remove('show') //드롭다운 메뉴 가리기
}

// 검색
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')] //배열
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowrEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowrEl.addEventListener('click', hideSearch) //배경 클릭시 검색바 숨기기 함수

function showSearch() {  //클릭시 검색바 보이기 함수
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed') //문서의 최상위 요소
  headerMenuEls.reverse().forEach(function (el, index) { //반대로 항목이 사라지는 모션
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function () { //애니메이션 종료 시 검색바 포커스 기능 실행
    searchInputEl.focus()
  }, 600)
}
function hideSearch() { //클릭시 검색바 숨기기 함수
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index) { //순차적으로 항목이 사라지는 모션
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse() //reverse를 다시 해주는 이유 : 한 번만 처리해주면 사라질 때도 역순으로 사라지기 때문에
  searchInputEl.value = '' //검색바가 닫히면 입력된 문자 초기화 기능
}

// 요소의 가시성 관찰 섹션
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) { //entry.isIntersecting = false 문장 종료
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEl = document.querySelectorAll('.info')
infoEl.forEach(function (el) {
  io.observe(el)
})

// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () { //비디오 재상
  video.play()
  playBtn.classList.add('hide') //재생 버튼 숨기기
  pauseBtn.classList.remove('hide') //일시정지 버튼 생성
})
pauseBtn.addEventListener('click', function () { //비디오 일시정지
  video.pause()
  pauseBtn.classList.add('hide') //일시정지 버튼 숨기기
  playBtn.classList.remove('hide') //재생 버튼 생성
})

// 당신에게 맞는 iPad는 제목의 종류 렌더링 요소
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagine">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList += /* html */`<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /*html*/ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear() //현재 날짜를 얻는 클래스