// ==========================================================================
// 상담 신청 접수 엔드포인트 (Cloudflare Pages Functions)
// ==========================================================================
// POST /api/consult 로 받은 상담 신청을 Google Apps Script 웹 앱에 넘기고,
// 실제 발송은 그쪽의 Gmail 이 맡는다. 발송 코드는 apps-script/Code.gs 에 있다.
//
// 이 함수도 Apps Script 도 상담 내용을 별도로 저장하지 않는다. 메일 사본은
// 사무소 Gmail 계정의 보낸편지함에만 남으므로 제3자에게 보관되지 않는다.
// 실패 응답 본문은 로그로 남기지 않는다(상담 내용이 되비쳐 담길 수 있다).
//
// Cloudflare 대시보드 > Settings > Environment variables 에 아래 값을 등록한다.
// 시크릿(Encrypt)으로 넣어야 하며, 저장소에는 절대 담지 않는다.
//   APPS_SCRIPT_URL    Apps Script 웹 앱 배포 URL
//                      (https://script.google.com/macros/s/.../exec)
//   APPS_SCRIPT_TOKEN  Code.gs 의 SHARED_TOKEN 과 같은 값. 웹 앱 URL 은 공개
//                      주소라, 이 토큰이 맞을 때만 발송하도록 막아 둔다.
//
// 수신 주소는 Apps Script 쪽 RECIPIENT 상수에 있다. 여기서는 다루지 않는다.

// 입력 길이 상한. 지나치게 긴 본문으로 발송이 막히지 않도록 받는 쪽에서 자른다.
const LIMITS = { name: 50, phone: 40, message: 5000 };

// 메일 본문을 HTML 로 보내므로, 입력값이 태그로 해석되지 않도록 이스케이프한다.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function trimField(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    return json({ success: false, message: "요청 형식이 올바르지 않습니다." }, 400);
  }

  // 스팸 봇 유인용 숨김 필드. 사람이 채울 수 없는 칸이므로 값이 있으면 봇으로 본다.
  // 봇에게 차단 사실을 알리지 않으려고 성공으로 응답하고 발송만 건너뛴다.
  if (payload.botcheck) {
    return json({ success: true }, 200);
  }

  const name = trimField(payload["성함"], LIMITS.name);
  const phone = trimField(payload["연락처"], LIMITS.phone);
  const message = trimField(payload["상담 내용"], LIMITS.message);
  const agreed = payload["개인정보 수집·이용 동의"] === "동의함";

  if (!name || !phone) {
    return json({ success: false, message: "성함과 연락처를 입력해 주세요." }, 400);
  }
  if (!agreed) {
    return json({ success: false, message: "개인정보 수집·이용에 동의해 주세요." }, 400);
  }

  const { APPS_SCRIPT_URL, APPS_SCRIPT_TOKEN } = env;
  if (!APPS_SCRIPT_URL || !APPS_SCRIPT_TOKEN) {
    // 방문자에게 설정 미비를 노출하지 않고, 전화 안내로 유도한다.
    return json({ success: false, message: "현재 접수가 어렵습니다. 전화로 문의해 주세요." }, 503);
  }

  const receivedAt = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  const html =
    "<p><strong>성함</strong><br>" + escapeHtml(name) + "</p>" +
    "<p><strong>연락처</strong><br>" + escapeHtml(phone) + "</p>" +
    "<p><strong>상담 내용</strong><br>" +
    (message ? escapeHtml(message).replace(/\n/g, "<br>") : "(작성 없음)") + "</p>" +
    "<hr><p>개인정보 수집·이용 동의: 동의함<br>접수 일시: " + escapeHtml(receivedAt) + "</p>";

  try {
    // Apps Script 웹 앱은 실행 결과를 302 로 넘겨주므로 리다이렉트를 따라가야 한다.
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: APPS_SCRIPT_TOKEN,
        subject: "[홈페이지] 법률 상담 신청 - " + name,
        html: html
      })
    });

    if (!res.ok) {
      // 응답 본문에 상담 내용이 되비치어 담길 수 있으므로 로그로 남기지 않는다.
      return json({ success: false, message: "전송에 실패했습니다." }, 502);
    }

    // 권한이나 배포 설정이 어긋나면 200 과 함께 로그인 안내 HTML 이 돌아온다.
    // 그때는 JSON 파싱이 실패하므로 발송된 것으로 보지 않는다.
    let result;
    try {
      result = await res.json();
    } catch (err) {
      return json({ success: false, message: "전송에 실패했습니다." }, 502);
    }

    if (!result.ok) {
      return json({ success: false, message: "전송에 실패했습니다." }, 502);
    }
    return json({ success: true }, 200);
  } catch (err) {
    return json({ success: false, message: "전송 중 오류가 발생했습니다." }, 502);
  }
}

// 엔드포인트가 살아 있는지 확인만 하고, 다른 메서드는 받지 않는다.
export async function onRequest({ request }) {
  if (request.method === "POST") return;
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
