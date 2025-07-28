/* header */
fetch('/ICCA/include/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.header-include').innerHTML = data;

    const header = document.querySelector('.header');
    const menuItems = document.querySelectorAll('.menu-bar li.main-menu');
    const allSubmenus = document.querySelector('.all-submenus');
    const logoImg = document.querySelector('.logo img');
    const menuLinks = document.querySelectorAll('.menu-bar li.main-menu a');
    const asideLinks = document.querySelectorAll('.aside a');
    const line = document.querySelector('.aside .line');

    const logoWhite = '/ICCA/images/whiteLogo.png'; // 기본 흰색용 로고
    const logoBlack = '/ICCA/images/logo.png'; // 흰 배경용 검정 로고

    let isHoveringMenu = false;
    let isHoveringSubmenu = false;

    function applyActiveBgStyles() {
      header.classList.add('active-bg');
      logoImg.src = logoBlack;
      menuLinks.forEach(link => (link.style.color = '#222'));
      asideLinks.forEach(link => (link.style.color = '#222'));
      if (line) line.style.backgroundColor = 'black';
    }

    function removeActiveBgStyles() {
      header.classList.remove('active-bg');
      logoImg.src = logoWhite;
      menuLinks.forEach(link => (link.style.color = '#fff'));
      asideLinks.forEach(link => (link.style.color = '#fff'));
      if (line) line.style.backgroundColor = 'white';
    }

    function showSubmenus() {
      allSubmenus.classList.add('active');
      applyActiveBgStyles();
    }

    function hideSubmenus() {
      if (!isHoveringMenu && !isHoveringSubmenu) {
        allSubmenus.classList.remove('active');
        if (window.scrollY <= 10) {
          removeActiveBgStyles();
        }
      }
    }

    menuItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        isHoveringMenu = true;
        showSubmenus();
      });
      item.addEventListener('mouseleave', () => {
        isHoveringMenu = false;
        setTimeout(hideSubmenus, 100);
      });
    });

    allSubmenus.addEventListener('mouseenter', () => {
      isHoveringSubmenu = true;
    });
    allSubmenus.addEventListener('mouseleave', () => {
      isHoveringSubmenu = false;
      setTimeout(hideSubmenus, 100);
    });

    function checkScroll() {
      if (window.scrollY > 10) {
        applyActiveBgStyles();
      } else if (!allSubmenus.classList.contains('active')) {
        removeActiveBgStyles();
      }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
  });


/* 배너 스와이퍼 */
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".mySwiper01", {
    loop: false, // 직접 루프 처리
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  const progressBar = document.querySelector(".progress-bar");
  const playPauseBtn = document.querySelector(".btn-play-pause");
  const pauseIcon = playPauseBtn.querySelector(".pause-icon");
  const playIcon = playPauseBtn.querySelector(".play-icon");

  const slideCount = swiper.slides.length;
  let isPlaying = true;

  // 프로그레스바 업데이트 함수
  function updateProgressBar() {
    const currentIndex = swiper.realIndex;
    const percent = ((currentIndex + 1) / slideCount) * 100;
    progressBar.style.width = percent + "%";
  }

  // 초기화
  updateProgressBar();

  // 자동 재생 제어
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      swiper.autoplay.stop();
      pauseIcon.style.display = "none";
      playIcon.style.display = "inline";
    } else {
      swiper.autoplay.start();
      pauseIcon.style.display = "inline";
      playIcon.style.display = "none";
    }
    isPlaying = !isPlaying;
  });

  // 이전 버튼
  document.querySelector(".btn-prev").addEventListener("click", () => {
    if (swiper.activeIndex === 0) {
      swiper.slideTo(slideCount - 1); // 마지막으로 이동
    } else {
      swiper.slidePrev();
    }
  });

  // 다음 버튼
  document.querySelector(".btn-next").addEventListener("click", () => {
    if (swiper.activeIndex === slideCount - 1) {
      swiper.slideTo(0); // 처음으로 이동
    } else {
      swiper.slideNext();
    }
  });

  // 슬라이드 변경 시 프로그레스바 업데이트
  swiper.on("slideChange", updateProgressBar);
  swiper.on("autoplayStart", updateProgressBar);
  swiper.on("autoplayStop", updateProgressBar);
});



/* 드롭다운 */
const dropdown = document.getElementById('dropdown');
const inputBox = document.getElementById('input-box');

function updateInputBox(value) {
  if (value === 'custom') {
    inputBox.value = '';
    inputBox.placeholder = '직접 입력하세요';
    inputBox.disabled = false;
    inputBox.focus();
  } else {
    inputBox.value = value;
    inputBox.placeholder = '';
    inputBox.disabled = true;
  }
}

// 페이지 로드 시 초기값 설정
updateInputBox(dropdown.value);

dropdown.addEventListener('change', function () {
  updateInputBox(this.value);
});


/* 카드뉴스 스와이퍼 */
document.addEventListener("DOMContentLoaded", () => {
  const swiper02 = new Swiper(".mySwiper02", {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".pagination02 .btn-next02",
      prevEl: ".pagination02 .btn-prev02",
    },
  });

  const progressBar02 = document.querySelector(".pagination02 .progress-bar");
  console.log('progressBar02 element:', progressBar02);
  
  let isPlaying02 = true;

  function updateProgressBar02(swiper) {
    const totalSlides = 8;  // 직접 고정
    const currentIndex = swiper.realIndex + 1;
    const percent = (currentIndex / totalSlides) * 100;
    console.log('progress update:', currentIndex, '/', totalSlides, '=', percent + '%');
    if (progressBar02) {
      progressBar02.style.width = percent + "%";
    }
  }

  swiper02.on("init", () => updateProgressBar02(swiper02));
  swiper02.on("slideChange", () => updateProgressBar02(swiper02));
  swiper02.init();

  const playPauseBtn02 = document.querySelector(".pagination02 .btn-play-pause02");
  const pauseIcon02 = document.querySelector(".pagination02 .pause-icon02");
  const playIcon02 = document.querySelector(".pagination02 .play-icon02");

  playPauseBtn02.addEventListener("click", () => {
    if (isPlaying02) {
      swiper02.autoplay.stop();
      pauseIcon02.style.display = "none";
      playIcon02.style.display = "inline-block";
    } else {
      swiper02.autoplay.start();
      pauseIcon02.style.display = "inline-block";
      playIcon02.style.display = "none";
    }
    isPlaying02 = !isPlaying02;
  });
});






/* 기관소개 */
var swiper03 = new Swiper(".mySwiper03", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


/* 사업소개 */
const buttons = document.querySelectorAll('.tab-buttons button');
const tabItems = document.querySelectorAll('.tab-item');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const index = btn.getAttribute('data-tab');

    // 버튼 active 토글
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 탭 내용 표시 토글
    tabItems.forEach(item => {
      if (item.getAttribute('data-tab') === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});


/* 사업소개 하단 숫자 */
function countUp(el, target) {
  let count = 0;
  const duration = 1500; // 1.5초 동안 카운트업
  const stepTime = Math.max(Math.floor(duration / target), 20);
  
  const timer = setInterval(() => {
    count++;
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, stepTime);
}

function handleScroll() {
  const elements = document.querySelectorAll('.count');
  elements.forEach(el => {
    const target = +el.getAttribute('data-target');
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && !el.classList.contains('counted')) {
      countUp(el, target);
      el.classList.add('counted');
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);


/* 캠페인 */
const swiper04 = new Swiper(".mySwiper04", {
  slidesPerView: 1,
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
});

const totalSlides04 = document.querySelectorAll('.campaign-swiper').length;
const progressBar04 = document.getElementById("main-progress-bar");

function updateProgressBar04() {
  const percent = ((swiper04.realIndex + 1) / totalSlides04) * 100;
  progressBar04.style.width = percent + "%";
}

swiper04.on("slideChangeTransitionEnd", updateProgressBar04);
updateProgressBar04();

document.querySelector(".btn-prev04").addEventListener("click", () => swiper04.slidePrev());
document.querySelector(".btn-next04").addEventListener("click", () => swiper04.slideNext());

const btnPlayPause04 = document.querySelector(".btn-play-pause04");
let isPlaying04 = true;

btnPlayPause04.addEventListener("click", () => {
  isPlaying04 = !isPlaying04;
  btnPlayPause04.innerHTML = isPlaying04 
    ? '<i class="bi bi-pause pause-icon02"></i>' 
    : '<i class="bi bi-play-fill play-icon02"></i>';
  isPlaying04 ? swiper04.autoplay.start() : swiper04.autoplay.stop();
});

/* 리뷰 */
  const reviewInner = document.querySelector('.review-inner');
  const firstInner = reviewInner.querySelector('.first-slide .slide-inner');
  const secondInner = reviewInner.querySelector('.second-slide .slide-inner');

  firstInner.innerHTML += firstInner.innerHTML;
  secondInner.innerHTML += secondInner.innerHTML;

  const boxHeight = 335; // 300 + gap 35
  const boxCount = 6;

  const maxPosFirst = boxCount * boxHeight;
  const maxPosSecond = boxCount * boxHeight;

  let currentPosFirst = 0;
  let currentPosSecond = 0;

  let firstInterval;
  let secondInterval;
  let isAutoMoving = true;

  function startAutoMove() {
    if (firstInterval) clearInterval(firstInterval);
    if (secondInterval) clearInterval(secondInterval);

    isAutoMoving = true;

    // 첫 번째 슬라이드 즉시 시작
    firstInterval = setInterval(() => {
      currentPosFirst -= 1;
      if (currentPosFirst <= -maxPosFirst) currentPosFirst = 0;

      firstInner.style.transition = 'none';
      firstInner.style.transform = `translateY(${currentPosFirst}px)`;
    }, 10);

    setTimeout(() => {
      if (!isAutoMoving) return; // 멈춘 상태라면 시작 안함

      secondInterval = setInterval(() => {
        currentPosSecond -= 1;
        if (currentPosSecond <= -maxPosSecond) currentPosSecond = 0;

        secondInner.style.transition = 'none';
        secondInner.style.transform = `translateY(${currentPosSecond}px)`;
      }, 10);
    }, 1500);
  }

  function stopAutoMove() {
    if (firstInterval) clearInterval(firstInterval);
    if (secondInterval) clearInterval(secondInterval);
    isAutoMoving = false;
  }

  function moveSlide(slideInner, currentPos, maxPos, direction) {
    if (isAutoMoving) stopAutoMove();

    currentPos += direction * boxHeight;

    if (currentPos < -maxPos) {
      currentPos = 0;
    } else if (currentPos > 0) {
      currentPos = -maxPos;
    }

    slideInner.style.transition = 'transform 0.5s ease';
    slideInner.style.transform = `translateY(${currentPos}px)`;

    return currentPos;
  }

  const btnStop = document.getElementById('btn-stop');

  btnStop.addEventListener('click', () => {
    if (isAutoMoving) {
      stopAutoMove();
      btnStop.innerHTML = '<i class="bi bi-play-fill play-icon02"></i>';
    } else {
      startAutoMove();
      btnStop.innerHTML = '<i class="bi bi-pause pause-icon02"></i>';
    }
  });
  

  startAutoMove();

  document.getElementById('btn-up').addEventListener('click', () => {
    currentPosFirst = moveSlide(firstInner, currentPosFirst, maxPosFirst, -1);
    currentPosSecond = moveSlide(secondInner, currentPosSecond, maxPosSecond, -1);
    btnStop.textContent = '▶';
  });

  document.getElementById('btn-down').addEventListener('click', () => {
    currentPosFirst = moveSlide(firstInner, currentPosFirst, maxPosFirst, 1);
    currentPosSecond = moveSlide(secondInner, currentPosSecond, maxPosSecond, 1);
    btnStop.textContent = '▶';
  });

/* 후원하기 */
  const swiper05 = new Swiper(".mySwiper05", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000, // 5초
      disableOnInteraction: false, 
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        updateActiveSlideStyles(this);
      },
    },
  });
  
  // 슬라이드 스타일 업데이트 함수 (가운데 카드 강조)
  function updateActiveSlideStyles(swiper) {
    swiper.slides.forEach((slide) => {
      slide.style.transform = 'translateY(0)'; // 초기화
      slide.style.transition = 'transform 0.3s ease';
    });
  
    const activeIndex = swiper.activeIndex;
    const slides = swiper.slides;
  
    // Swiper가 loop이므로 실제 activeIndex는 clone 포함 인덱스임
    // 가운데 슬라이드 하나만 살짝 올리기 (예: -20px)
    slides[activeIndex].style.transform = 'translateY(-30px)';
  }
  
  
  
/* footer */
fetch('/ICCA/include/footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.footer-include').innerHTML = data;

    const movingButtons = document.querySelector('.footer-include > .moving-buttons');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        movingButtons.classList.add('show');
      } else {
        movingButtons.classList.remove('show');
      }
    });
  });



