// ==========================================================================
// 상담 신청 메일 발송 (Google Apps Script 웹 앱)
// ==========================================================================
// 이 파일은 저장소에 보관하는 템플릿이다. 홈페이지와 함께 배포되지 않으며,
// 아래 두 상수를 실제 값으로 채운 뒤 script.google.com 편집기에 붙여 넣는다.
// 실제 값이 담긴 사본을 저장소에 커밋하지 않도록 주의한다.
//
// ── 설치 순서 ────────────────────────────────────────────────────────────
// 1. https://script.google.com 에서 '새 프로젝트' 생성
// 2. 이 파일 내용을 붙여 넣고 SHARED_TOKEN 과 RECIPIENT 를 채운다
// 3. 오른쪽 위 '배포' > '새 배포' > 유형 '웹 앱'
//      - 실행 주체: 나
//      - 액세스 권한: 모든 사용자
// 4. 처음 배포할 때 Gmail 발송 권한을 묻는다. '고급' > '안전하지 않음으로
//    이동' 을 눌러 본인 계정 권한을 허용한다 (본인이 만든 스크립트다)
// 5. 배포 후 나오는 웹 앱 URL 과 SHARED_TOKEN 을 Cloudflare Pages 의
//    환경변수 APPS_SCRIPT_URL / APPS_SCRIPT_TOKEN 에 넣는다
//
// 코드를 고친 뒤에는 '배포 관리'에서 기존 배포의 버전을 새로 올려야 반영된다.
// '새 배포'를 누르면 URL 이 바뀌므로 환경변수도 함께 고쳐야 한다.

// 웹 앱 URL 은 공개 주소라 누구나 호출할 수 있다. Cloudflare 함수와 나눠 가진
// 이 토큰이 맞을 때만 발송해 무단 호출을 막는다. 길고 임의적인 문자열로 채운다.
var SHARED_TOKEN = "여기에-길고-임의적인-문자열을-넣는다";

// 상담 신청을 받을 주소. 네이버 메일이든 어디든 상관없다.
var RECIPIENT = "받을주소@naver.com";

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    if (payload.token !== SHARED_TOKEN) {
      return reply({ ok: false });
    }

    MailApp.sendEmail({
      to: RECIPIENT,
      subject: payload.subject,
      htmlBody: payload.html,
      name: "홈페이지 상담 신청"
    });

    return reply({ ok: true });
  } catch (err) {
    // 오류 메시지에 상담 내용이 섞여 나가지 않도록 성공 여부만 돌려준다.
    return reply({ ok: false });
  }
}

// 브라우저로 직접 열었을 때 스크립트의 존재나 동작을 드러내지 않는다.
function doGet() {
  return ContentService.createTextOutput("");
}

function reply(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

// 배포 과정에서 권한 승인 화면이 뜨지 않았을 때 쓴다. 편집기 상단에서 이 함수를
// 골라 '실행' 하면 Gmail 권한을 묻고, 승인하면 테스트 메일이 한 통 날아간다.
// 웹 앱 동작에는 관여하지 않으므로 확인이 끝난 뒤 지워도 된다.
function authorizeAndTest() {
  MailApp.sendEmail(
    RECIPIENT,
    "[테스트] 상담 폼 발송 권한 확인",
    "이 메일이 도착했다면 Gmail 발송 권한이 정상입니다."
  );
}
