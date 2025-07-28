/* header */
fetch('/ICCA/include/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.header-include').innerHTML = data;

    const header = document.querySelector('.header');
    const menuItems = document.querySelectorAll('.menu-bar li.main-menu');
    const allSubmenus = document.querySelector('.all-submenus');
    const logoImg = document.querySelector('.logo img');

    const logoBlack = '../images/logo.png';
    logoImg.src = logoBlack;

    let isHoveringMenu = false;
    let isHoveringSubmenu = false;

    function showSubmenus() {
      allSubmenus.classList.add('active');
    }

    function hideSubmenus() {
      if (!isHoveringMenu && !isHoveringSubmenu) {
        allSubmenus.classList.remove('active');
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
  });

/* 전체 탭 */
const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

function showTab(tabId) {
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  contents.forEach(content => {
    content.style.display = content.id === tabId ? 'block' : 'none';
  });
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;
    showTab(tabId);
    // ✅ URL 바꾸기 (새로고침 없음)
    history.pushState(null, '', `?tab=${tabId}`);
  });
});

// ✅ 페이지 진입 시 URL로 탭 설정
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('tab') || 'tab1';
  showTab(currentTab);
});

/* FAQ */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const body = header.nextElementSibling;

    if (item.classList.contains('active')) {
      item.classList.remove('active');
      body.style.maxHeight = null;
    } else {
      document.querySelectorAll('.accordion-item.active').forEach(openItem => {
        openItem.classList.remove('active');
        openItem.querySelector('.accordion-body').style.maxHeight = null;
      });

      item.classList.add('active');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});





/* 후원하기 */
document.addEventListener('DOMContentLoaded', function () {
  const fields = document.querySelectorAll('.field');

  // ✅ 첫 번째 field는 기본으로 open + 두 번째 버튼 활성화
  if (fields.length > 0) {
    fields[0].classList.add('open');

    const secondButton = fields[0].querySelectorAll('.easy-buttons button')[1];
    if (secondButton) {
      fields[0].querySelectorAll('.easy-buttons button').forEach(b => b.classList.remove('active'));
      secondButton.classList.add('active');
    }
  }

  // ✅ short 클릭 시 해당 field 열기 + 두 번째 버튼 선택
  fields.forEach(field => {
    const shorts = field.querySelectorAll('.short');

    shorts.forEach(short => {
      short.addEventListener('click', () => {
        field.classList.toggle('open');

        if (field.classList.contains('open')) {
          // 열릴 때 두 번째 버튼 활성화
          const buttons = field.querySelectorAll('.easy-buttons button');
          if (buttons.length > 1) {
            buttons.forEach(b => b.classList.remove('active'));
            buttons[1].classList.add('active');
          }

          // 입력창도 비워주기 (선택사항)
          const input = field.querySelector('.self-buttons input');
          if (input) input.value = '';
        }
      });
    });
  });

  // ✅ 버튼 클릭 시 스타일 적용 및 input 초기화
  document.querySelectorAll('.easy-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.easy-buttons');
      group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const field = btn.closest('.field');
      const input = field.querySelector('.self-buttons input');
      if (input) input.value = '';
    });
  });

  // ✅ input 입력 시 버튼 active 해제
  document.querySelectorAll('.self-buttons input').forEach(input => {
    input.addEventListener('input', () => {
      const field = input.closest('.field');
      const buttons = field.querySelectorAll('.easy-buttons button');
      buttons.forEach(b => b.classList.remove('active'));
    });
  });
});

/* 페이지네이션 */
const itemsPerPage = 15;

// tbody.noticeBody 모두 가져오기
const allTbodyList = document.querySelectorAll('tbody.noticeBody');

allTbodyList.forEach((tbody, index) => {
  let currentPage = 1;
  const allRows = Array.from(tbody.querySelectorAll('tr'));
  const pagination = document.querySelectorAll('.pagination')[index];

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    allRows.forEach((row, idx) => {
      row.style.display = (idx >= start && idx < end) ? '' : 'none';
    });
  }

  function renderPagination() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(allRows.length / itemsPerPage);

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '이전';
    prevBtn.disabled = currentPage === 1;
    prevBtn.className = currentPage === 1 ? 'disabled' : '';
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        update();
      }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) {
        btn.disabled = true;
        btn.className = 'disabled';
      }
      btn.addEventListener('click', () => {
        currentPage = i;
        update();
      });
      pagination.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '다음';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.className = currentPage === totalPages ? 'disabled' : '';
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        update();
      }
    });
    pagination.appendChild(nextBtn);
  }

  function update() {
    showPage(currentPage);
    renderPagination();
  }

  update();
});

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

