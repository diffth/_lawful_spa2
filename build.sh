#!/bin/sh
# ==========================================================================
# Cloudflare Pages 배포용 빌드 스크립트
# ==========================================================================
# Pages 의 Git 연동 배포에는 파일을 골라 제외하는 기능이 없다(.cfignore 미지원).
# 저장소를 통째로 올리면 README.md 처럼 공개할 이유가 없는 파일까지 서빙되므로,
# 공개할 것만 dist/ 로 추려 내보내고 Pages 의 빌드 출력 디렉터리를 dist 로 둔다.
#
# functions/ 는 저장소 루트에서 자동으로 읽히므로 dist/ 에 넣지 않는다.
# 넣으면 오히려 함수 소스가 정적 파일로 노출된다.
#
# 배포에서 뺄 항목은 아래 EXCLUDE 에 한 줄씩 추가한다.
# 숨김 파일(.git, .gitattributes 등)은 이름 규칙으로 이미 전부 빠진다.
#
# 주의: Pages 설정의 '빌드 출력 디렉터리' 가 비어 있으면 저장소 루트가 결과물로
# 간주되어 이 스크립트가 만든 dist/ 가 통째로 무시된다. 빌드 명령만 채우고
# 출력 디렉터리를 비워 두면 EXCLUDE 가 하나도 적용되지 않으니 함께 확인한다.
set -e

EXCLUDE="README.md screenshot.png build.sh functions apps-script dist"

rm -rf dist
mkdir -p dist

for entry in *; do
        skip=""
        for name in $EXCLUDE; do
                if [ "$entry" = "$name" ]; then
                        skip="yes"
                        break
                fi
        done
        [ -n "$skip" ] && continue
        cp -r "$entry" dist/
done

echo "배포 대상:"
ls -1 dist
