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
  const mobileMenuBtn = document.querySelector("button.md\\:hidden");
  const navMenu = document.querySelector(".hidden.md\\:flex");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
      navMenu.classList.toggle("flex");
      navMenu.classList.toggle("flex-col");
      navMenu.classList.toggle("absolute");
      navMenu.classList.toggle("top-full");
      navMenu.classList.toggle("left-0");
      navMenu.classList.toggle("w-full");
      navMenu.classList.toggle("bg-surface");
      navMenu.classList.toggle("p-4");
      navMenu.classList.toggle("shadow-md");
    });
  }

  // 상담 신청 폼 제출 처리
  const consultForm = document.querySelector("form");
  if (consultForm) {
    const submitBtn = consultForm.querySelector("button");
    if (submitBtn) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        
        if (nameInput && !nameInput.value.trim()) {
          alert("이름을 입력해 주세요.");
          nameInput.focus();
          return;
        }
        if (phoneInput && !phoneInput.value.trim()) {
          alert("연락처를 입력해 주세요.");
          phoneInput.focus();
          return;
        }
        alert("상담 신청이 정상적으로 접수되었습니다. 신속하게 연락드리겠습니다.");
        consultForm.reset();
      });
    }
  }
});
