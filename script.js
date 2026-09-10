/**
 * ==========================================================================
 * 원본 디자인 스크립트 및 Tailwind 설정 (script.js)
 * ==========================================================================
 */

// Tailwind 테마 커스텀 설정
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "surface-tint": "#455f88",
        "on-primary-fixed": "#001b3c",
        "outline": "#74777f",
        "tertiary-container": "#323638",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "surface-container-high": "#dee8ff",
        "on-surface-variant": "#43474e",
        "primary-container": "#1a365d",
        "on-tertiary-container": "#9b9fa1",
        "background": "#f9f9ff",
        "surface-container-lowest": "#ffffff",
        "surface": "#f9f9ff",
        "on-tertiary-fixed-variant": "#434749",
        "primary": "#002045",
        "outline-variant": "#c4c6cf",
        "on-secondary-container": "#004172",
        "on-secondary-fixed": "#001d37",
        "inverse-primary": "#adc7f7",
        "primary-fixed-dim": "#adc7f7",
        "surface-bright": "#f9f9ff",
        "on-background": "#111c2c",
        "secondary": "#0061a5",
        "surface-container-low": "#f0f3ff",
        "on-tertiary-fixed": "#181c1e",
        "error-container": "#ffdad6",
        "surface-container": "#e7eeff",
        "surface-variant": "#d8e3fa",
        "secondary-container": "#66affe",
        "on-surface": "#111c2c",
        "primary-fixed": "#d6e3ff",
        "on-primary-fixed-variant": "#2d476f",
        "tertiary-fixed-dim": "#c3c7c9",
        "secondary-fixed": "#d2e4ff",
        "inverse-on-surface": "#ebf1ff",
        "inverse-surface": "#263142",
        "tertiary": "#1d2123",
        "surface-dim": "#cfdaf1",
        "on-primary": "#ffffff",
        "on-secondary-fixed-variant": "#00497e",
        "surface-container-highest": "#d8e3fa",
        "tertiary-fixed": "#e0e3e5",
        "on-error-container": "#93000a",
        "on-primary-container": "#86a0cd",
        "on-tertiary": "#ffffff",
        "on-secondary": "#ffffff",
        "secondary-fixed-dim": "#9fcaff"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "stack-md": "16px",
        "gutter": "24px",
        "stack-lg": "32px",
        "container-max": "1200px",
        "section-padding": "80px",
        "margin-mobile": "20px",
        "stack-sm": "8px",
        "margin-desktop": "64px"
      },
      "fontFamily": {
        "body-md": [
          "Manrope"
        ],
        "label-sm": [
          "Manrope"
        ],
        "headline-lg-mobile": [
          "Libre Caslon Text"
        ],
        "headline-md": [
          "Libre Caslon Text"
        ],
        "headline-lg": [
          "Libre Caslon Text"
        ],
        "display-lg": [
          "Libre Caslon Text"
        ],
        "body-lg": [
          "Manrope"
        ]
      },
      "fontSize": {
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-sm": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
      }
    }
  }
};

// DOM 로드 후 인터랙션 초기화
document.addEventListener("DOMContentLoaded", () => {
  // 모바일 메뉴 버튼 인터랙션
  const mobileToggleBtn = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

  if (mobileToggleBtn && mobileMenu) {
    mobileToggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileNavItems.forEach((item) => {
      item.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 경력 더보기 / 접기 인터랙션
  const toggleCareerBtn = document.getElementById("toggleCareerBtn");
  const moreCareers = document.getElementById("moreCareers");
  const toggleCareerText = document.getElementById("toggleCareerText");
  const toggleCareerIcon = document.getElementById("toggleCareerIcon");

  if (toggleCareerBtn && moreCareers) {
    toggleCareerBtn.addEventListener("click", () => {
      const isHidden = moreCareers.classList.contains("hidden");
      if (isHidden) {
        moreCareers.classList.remove("hidden");
        if (toggleCareerText) toggleCareerText.textContent = "경력 접기";
        if (toggleCareerIcon) toggleCareerIcon.textContent = "expand_less";
      } else {
        moreCareers.classList.add("hidden");
        if (toggleCareerText) toggleCareerText.textContent = "경력 전체보기 (17건)";
        if (toggleCareerIcon) toggleCareerIcon.textContent = "expand_more";
      }
    });
  }

  // 언론보도 가로 슬라이드 좌우 이동
  const pressTrack = document.getElementById("pressTrack");
  const pressPrev = document.getElementById("pressPrev");
  const pressNext = document.getElementById("pressNext");

  if (pressTrack && pressPrev && pressNext) {
    // 카드 한 장 + 간격만큼 이동한다. 카드 폭이 반응형이라 매번 실제 값을 읽는다.
    const stepSize = () => {
      const card = pressTrack.querySelector(".press-card");
      if (!card) return pressTrack.clientWidth;
      const gap = parseFloat(getComputedStyle(pressTrack).columnGap) || 0;
      return card.offsetWidth + gap;
    };

    const syncNavState = () => {
      const maxScroll = pressTrack.scrollWidth - pressTrack.clientWidth;
      pressPrev.disabled = pressTrack.scrollLeft <= 1;
      pressNext.disabled = pressTrack.scrollLeft >= maxScroll - 1;
    };

    // 브라우저 기본 smooth 스크롤은 시간을 조절할 수 없고 스크롤 스냅과 부딪혀
    // 도착 직전에 튄다. 직접 감속 곡선을 그려 이동한다.
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const SCROLL_DURATION = 520;
    let scrollAnimation = null;
    let targetIndex = null;

    const slideBy = (direction) => {
      const step = stepSize();
      const maxScroll = pressTrack.scrollWidth - pressTrack.clientWidth;
      // 카드 경계가 아닌 곳에서 멈추면 스냅이 다시 켜지면서 되돌려진다.
      // 목적지는 항상 카드 인덱스로 잡는다. 연타하면 직전 목적지에서 이어 센다.
      const base = targetIndex !== null ? targetIndex : Math.round(pressTrack.scrollLeft / step);
      const lastIndex = Math.ceil(maxScroll / step);
      const index = Math.max(0, Math.min(base + direction, lastIndex));
      const from = pressTrack.scrollLeft;
      const to = Math.min(index * step, maxScroll);
      if (Math.abs(to - from) < 1) return;

      targetIndex = index;
      // 연타하면 이전 애니메이션을 끊고 현재 위치에서 이어간다
      if (scrollAnimation) cancelAnimationFrame(scrollAnimation);

      if (reduceMotion.matches) {
        pressTrack.scrollLeft = to;
        targetIndex = null;
        syncNavState();
        return;
      }

      // 이동 중에는 스냅을 꺼둔다. 켜져 있으면 매 프레임 위치를 되돌린다.
      pressTrack.classList.add("is-sliding");
      const startedAt = performance.now();

      const drawFrame = (now) => {
        const progress = Math.min((now - startedAt) / SCROLL_DURATION, 1);
        pressTrack.scrollLeft = from + (to - from) * easeInOutCubic(progress);
        if (progress < 1) {
          scrollAnimation = requestAnimationFrame(drawFrame);
          return;
        }
        scrollAnimation = null;
        targetIndex = null;
        pressTrack.classList.remove("is-sliding");
        syncNavState();
      };

      scrollAnimation = requestAnimationFrame(drawFrame);
    };

    pressPrev.addEventListener("click", () => slideBy(-1));
    pressNext.addEventListener("click", () => slideBy(1));

    pressTrack.addEventListener("scroll", () => {
      // 손으로 밀었으면 화살표가 세던 목적지는 버리고 현재 위치부터 다시 센다
      if (!scrollAnimation) targetIndex = null;
      syncNavState();
    }, { passive: true });
    window.addEventListener("resize", syncNavState);
    syncNavState();
  }

  // ==========================================================================
  // 상담 신청 폼 유효성 검사 및 제출 제어
  // ==========================================================================
  // Web3Forms access key (https://web3forms.com 에서 수신 메일 주소를 입력하면 메일로 발급된다).
  // 수신자 주소는 키 발급 시점에 고정되므로 코드에 담지 않는다.
  const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
  const consultForm = document.querySelector("form");
  if (consultForm) {
    const submitBtn = document.getElementById("consultSubmitBtn") || consultForm.querySelector("button");
    const agreeBox = document.getElementById("privacyAgree");

    // 개인정보 수집·이용 동의 여부에 따른 제출 버튼 활성화/비활성화 상태 동기화
    if (submitBtn && agreeBox) {
      const syncSubmitState = () => {
        submitBtn.disabled = !agreeBox.checked;
      };
      agreeBox.addEventListener("change", syncSubmitState);
      syncSubmitState();
    }

    // 폼 제출 이벤트 리스너
    if (submitBtn) {
      submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");

        // 1. 성함 유효성 검사
        if (nameInput && !nameInput.value.trim()) {
          alert("이름을 입력해 주세요.");
          nameInput.focus();
          return;
        }

        // 2. 연락처 유효성 검사
        if (phoneInput && !phoneInput.value.trim()) {
          alert("연락처를 입력해 주세요.");
          phoneInput.focus();
          return;
        }

        // 3. 개인정보 수집·이용 동의 확인
        if (agreeBox && !agreeBox.checked) {
          alert("개인정보처리방침에 동의해 주세요.");
          agreeBox.focus();
          return;
        }

        // 4. Web3Forms 로 상담 신청 전송
        const messageInput = document.getElementById("message");
        const botcheck = document.getElementById("botcheck");
        const originalLabel = submitBtn.textContent.trim();

        submitBtn.disabled = true;
        submitBtn.textContent = "전송 중...";

        try {
          // 응답이 없으면 버튼이 "전송 중..." 상태로 잠긴 채 남으므로 15초로 끊는다
          const timeout = AbortSignal.timeout(15000);
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            signal: timeout,
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: WEB3FORMS_ACCESS_KEY,
              subject: "[홈페이지] 법률 상담 신청 - " + nameInput.value.trim(),
              from_name: "오세영 변호사 홈페이지",
              성함: nameInput.value.trim(),
              연락처: phoneInput.value.trim(),
              "상담 내용": messageInput.value.trim() || "(작성 없음)",
              "개인정보 수집·이용 동의": "동의함",
              botcheck: botcheck ? botcheck.checked : false
            })
          });
          const data = await res.json();

          if (data.success) {
            alert("상담 신청이 정상적으로 접수되었습니다. 신속하게 연락드리겠습니다.");
            consultForm.reset();
          } else {
            // 전송 실패 시 작성 내용을 잃지 않도록 폼은 그대로 둔다
            alert("전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.");
          }
        } catch (err) {
          const msg = err.name === "TimeoutError"
            ? "전송이 지연되고 있습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요."
            : "전송 중 오류가 발생했습니다. 네트워크 상태를 확인해 주세요.";
          alert(msg);
        } finally {
          submitBtn.textContent = originalLabel;
          submitBtn.disabled = !agreeBox.checked;
        }
      });
    }
  }
});
