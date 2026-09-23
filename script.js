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

  // 카카오톡 상담 카드: 채널 개설 전까지 준비 중 안내 팝업을 띄운다.
  // 채널이 열리면 카드의 href 를 채널 주소로 바꾸고 이 블록과 index.html 의 dialog 를 지운다.
  const kakaoCard = document.getElementById("kakaoConsultCard");
  const kakaoDialog = document.getElementById("kakaoConsultDialog");

  if (kakaoCard && kakaoDialog && typeof kakaoDialog.showModal === "function") {
    kakaoCard.addEventListener("click", (e) => {
      e.preventDefault();
      kakaoDialog.showModal();
    });

    // "상담 신청서 작성하기"는 닫은 뒤 원래 링크(#contact)로 이동하도록 기본 동작을 막지 않는다
    kakaoDialog.querySelectorAll("[data-dialog-close]").forEach((el) => {
      el.addEventListener("click", () => kakaoDialog.close());
    });

    // 팝업 바깥 어두운 영역을 누르면 닫는다
    kakaoDialog.addEventListener("click", (e) => {
      if (e.target === kakaoDialog) kakaoDialog.close();
    });
  }

  // 언론보도 가로 슬라이드 좌우 이동
  const pressTrack = document.getElementById("pressTrack");
  const pressPrev = document.getElementById("pressPrev");
  const pressNext = document.getElementById("pressNext");
  // 좌우 버튼까지 감싸는 영역. 마우스나 포커스가 이 안에 있으면 자동 슬라이드를 멈춘다.
  const pressArea = pressTrack && pressTrack.parentElement;

  if (pressTrack && pressPrev && pressNext && pressArea) {
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

    // 카드 경계가 아닌 곳에서 멈추면 스냅이 다시 켜지면서 되돌려진다.
    // 목적지는 항상 카드 인덱스로 잡는다.
    const slideToIndex = (rawIndex) => {
      const step = stepSize();
      const maxScroll = pressTrack.scrollWidth - pressTrack.clientWidth;
      const lastIndex = Math.ceil(maxScroll / step);
      const index = Math.max(0, Math.min(rawIndex, lastIndex));
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

    // 연타하면 직전 목적지에서 이어 센다
    const slideBy = (direction) => {
      const base = targetIndex !== null ? targetIndex : Math.round(pressTrack.scrollLeft / stepSize());
      slideToIndex(base + direction);
    };

    // 일정 간격으로 다음 카드를 보여주고, 끝에 닿으면 처음으로 돌아간다.
    // 읽는 중에 화면이 움직이면 방해가 되므로 아래 상황에서는 돌리지 않는다.
    //   - 모션 최소화 설정, 탭이 가려진 상태, 섹션이 화면 밖일 때
    //   - 마우스가 올라가 있거나 키보드 포커스가 들어와 있을 때
    //   - 방금 손으로 조작했을 때(잠시 쉬었다 재개)
    //   - 일시정지 버튼으로 직접 멈췄을 때(다시 누를 때까지 계속 멈춤)
    const AUTO_SLIDE_INTERVAL = 5000;
    const AUTO_SLIDE_RESUME_DELAY = 10000;
    const autoToggle = document.getElementById("pressAutoToggle");
    const autoToggleWrap = document.getElementById("pressAutoToggleWrap");
    const autoToggleIcon = document.getElementById("pressAutoToggleIcon");
    const autoToggleText = document.getElementById("pressAutoToggleText");
    let autoSlideTimer = null;
    let autoSlideResumeTimer = null;
    let pointerInside = false;
    let trackVisible = true;
    let userPaused = false;

    const canAutoSlide = () =>
      !userPaused &&
      !reduceMotion.matches &&
      !document.hidden &&
      trackVisible &&
      !pointerInside &&
      !pressArea.contains(document.activeElement) &&
      pressTrack.scrollWidth - pressTrack.clientWidth > 1;

    const stopAutoSlide = () => {
      if (!autoSlideTimer) return;
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      // 아직 돌릴 수 없는 상태면 예약된 재개는 그대로 살려 둔다
      if (!canAutoSlide()) return;
      clearTimeout(autoSlideResumeTimer);
      autoSlideTimer = setInterval(() => {
        if (!canAutoSlide()) return stopAutoSlide();
        const maxScroll = pressTrack.scrollWidth - pressTrack.clientWidth;
        if (pressTrack.scrollLeft >= maxScroll - 1) slideToIndex(0);
        else slideBy(1);
      }, AUTO_SLIDE_INTERVAL);
    };

    // 손으로 조작한 직후에 바로 넘어가면 보던 카드를 놓친다. 한 템포 쉬고 재개한다.
    const deferAutoSlide = () => {
      stopAutoSlide();
      clearTimeout(autoSlideResumeTimer);
      autoSlideResumeTimer = setTimeout(startAutoSlide, AUTO_SLIDE_RESUME_DELAY);
    };

    pressPrev.addEventListener("click", () => {
      slideBy(-1);
      deferAutoSlide();
    });
    pressNext.addEventListener("click", () => {
      slideBy(1);
      deferAutoSlide();
    });

    // 트랙을 직접 미는 동작만 잡는다. scroll 이벤트는 자동 슬라이드가 그리는
    // 매 프레임마다 발생하므로 여기에 물리면 스스로를 계속 멈춰 세운다.
    ["pointerdown", "wheel", "touchstart", "keydown"].forEach((type) => {
      pressTrack.addEventListener(type, deferAutoSlide, { passive: true });
    });

    pressArea.addEventListener("pointerenter", () => {
      pointerInside = true;
      stopAutoSlide();
    });
    pressArea.addEventListener("pointerleave", () => {
      pointerInside = false;
      startAutoSlide();
    });
    pressArea.addEventListener("focusin", stopAutoSlide);
    pressArea.addEventListener("focusout", startAutoSlide);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoSlide();
      else startAutoSlide();
    });
    // 자동 넘김을 직접 멈추고 켜는 버튼. 넘길 카드가 없거나 모션 최소화 설정이면
    // 애초에 돌지 않으므로 버튼도 감춘다.
    if (autoToggle && autoToggleWrap && autoToggleIcon && autoToggleText) {
      const syncAutoToggle = () => {
        const needed = !reduceMotion.matches && pressTrack.scrollWidth - pressTrack.clientWidth > 1;
        autoToggleWrap.classList.toggle("hidden", !needed);
        autoToggle.setAttribute("aria-pressed", String(userPaused));
        autoToggleIcon.textContent = userPaused ? "play_arrow" : "pause";
        autoToggleText.textContent = userPaused ? "자동 넘김 켜기" : "자동 넘김 멈춤";
      };

      autoToggle.addEventListener("click", () => {
        userPaused = !userPaused;
        if (userPaused) {
          clearTimeout(autoSlideResumeTimer);
          stopAutoSlide();
        } else {
          startAutoSlide();
        }
        syncAutoToggle();
      });

      window.addEventListener("resize", syncAutoToggle);
      reduceMotion.addEventListener("change", syncAutoToggle);
      syncAutoToggle();
    }

    reduceMotion.addEventListener("change", startAutoSlide);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        trackVisible = entries[0].isIntersecting;
        if (trackVisible) startAutoSlide();
        else stopAutoSlide();
      }, { threshold: 0.2 }).observe(pressTrack);
    }

    pressTrack.addEventListener("scroll", () => {
      // 손으로 밀었으면 화살표가 세던 목적지는 버리고 현재 위치부터 다시 센다
      if (!scrollAnimation) targetIndex = null;
      syncNavState();
    }, { passive: true });
    window.addEventListener("resize", syncNavState);
    syncNavState();
    startAutoSlide();
  }

  // ==========================================================================
  // 상담 신청 폼 유효성 검사 및 제출 제어
  // ==========================================================================
  // 상담 신청 접수 엔드포인트. 같은 도메인의 Cloudflare Pages Function 이며,
  // 메일 발송에 필요한 인증키와 수신 주소는 모두 함수 쪽 환경변수에 있다.
  const CONSULT_ENDPOINT = "/api/consult";
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

        // 4. 접수 엔드포인트로 상담 신청 전송
        const messageInput = document.getElementById("message");
        const botcheck = document.getElementById("botcheck");
        const originalLabel = submitBtn.textContent.trim();

        submitBtn.disabled = true;
        submitBtn.textContent = "전송 중...";

        try {
          // 응답이 없으면 버튼이 "전송 중..." 상태로 잠긴 채 남으므로 15초로 끊는다
          const timeout = AbortSignal.timeout(15000);
          const res = await fetch(CONSULT_ENDPOINT, {
            method: "POST",
            signal: timeout,
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
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
