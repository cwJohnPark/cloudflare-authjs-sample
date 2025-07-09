#!/bin/bash

# .env 파일에서 환경 변수를 읽어서 wrangler secret put으로 등록하는 스크립트

set -e  # 에러 발생 시 스크립트 종료

ENV_FILE=".env.local"
WRANGLER_CONFIG="wrangler.jsonc"

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로깅 함수
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 함수: 사용법 표시
show_usage() {
    echo "사용법: $0 [옵션]"
    echo "옵션:"
    echo "  -f, --file <파일명>    환경 변수 파일 지정 (기본값: .env.local)"
    echo "  -d, --dry-run          실제 실행 없이 명령어만 출력"
    echo "  -h, --help             도움말 표시"
    echo ""
    echo "예시:"
    echo "  $0                     # .env.local 파일 사용"
    echo "  $0 -f .env.production  # .env.production 파일 사용"
    echo "  $0 --dry-run           # 실제 실행 없이 명령어만 확인"
}

# 함수: 환경 변수 검증
validate_env_var() {
    local key=$1
    local value=$2
    
    # 빈 값 체크
    if [[ -z "$value" ]]; then
        log_warning "빈 값: $key (건너뜀)"
        return 1
    fi
    
    # 예시 값 체크 (your_*, example_*, xxx 등)
    if [[ "$value" =~ ^(your_|example_|xxx|XXXXXXX|G-XXXXXXXXXX) ]]; then
        log_warning "예시 값: $key=$value (건너뜀)"
        return 1
    fi
    
    return 0
}

# 함수: 시크릿 등록
put_secret() {
    local key=$1
    local value=$2
    
    if [[ "$DRY_RUN" == "true" ]]; then
        echo "wrangler secret put $key"
        return 0
    fi
    
    log_info "시크릿 등록 중: $key"
    
    # 값을 echo로 파이프해서 wrangler secret put에 전달
    if echo "$value" | wrangler secret put "$key"; then
        log_success "시크릿 등록 완료: $key"
        return 0
    else
        log_error "시크릿 등록 실패: $key"
        return 1
    fi
}

# 함수: 환경 변수 파일 처리
process_env_file() {
    local file=$1
    
    if [[ ! -f "$file" ]]; then
        log_error "환경 변수 파일을 찾을 수 없습니다: $file"
        exit 1
    fi
    
    log_info "환경 변수 파일 처리 중: $file"
    
    local success_count=0
    local skip_count=0
    local error_count=0
    
    # 파일을 한 줄씩 읽어서 처리
    while IFS= read -r line || [[ -n "$line" ]]; do
        # 주석이나 빈 줄 무시
        if [[ "$line" =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]]; then
            continue
        fi
        
        # KEY=VALUE 형식 파싱
        if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
            key="${BASH_REMATCH[1]}"
            value="${BASH_REMATCH[2]}"
            
            # 따옴표 제거
            value=$(echo "$value" | sed 's/^["'\'']//' | sed 's/["'\'']$//')
            
            # NEXT_PUBLIC_ 접두사가 있는 변수는 시크릿이 아니므로 건너뜀
            if [[ "$key" =~ ^NEXT_PUBLIC_ ]]; then
                log_warning "Public 변수 건너뜀: $key"
                ((skip_count++))
                continue
            fi
            
            # 환경 변수 검증
            if validate_env_var "$key" "$value"; then
                if put_secret "$key" "$value"; then
                    ((success_count++))
                else
                    ((error_count++))
                fi
            else
                ((skip_count++))
            fi
        else
            log_warning "잘못된 형식의 라인: $line"
        fi
    done < "$file"
    
    # 결과 요약
    echo ""
    log_info "처리 완료"
    log_success "등록 성공: $success_count개"
    log_warning "건너뜀: $skip_count개"
    if [[ $error_count -gt 0 ]]; then
        log_error "등록 실패: $error_count개"
    fi
}

# 함수: wrangler 설치 확인
check_wrangler() {
    if ! command -v wrangler &> /dev/null; then
        if [[ "$DRY_RUN" == "true" ]]; then
            log_warning "wrangler가 설치되지 않았습니다 (dry-run 모드에서는 무시)"
            return 0
        else
            log_error "wrangler가 설치되지 않았습니다."
            log_info "설치 방법: npm install -g wrangler"
            exit 1
        fi
    fi
    
    log_info "wrangler 버전: $(wrangler --version)"
}

# 함수: wrangler 로그인 확인
check_wrangler_auth() {
    if ! wrangler whoami &> /dev/null; then
        log_error "wrangler에 로그인되지 않았습니다."
        log_info "로그인 방법: wrangler login"
        exit 1
    fi
    
    log_info "wrangler 인증 확인 완료"
}

# 메인 함수
main() {
    local DRY_RUN=false
    
    # 명령줄 인수 처리
    while [[ $# -gt 0 ]]; do
        case $1 in
            -f|--file)
                ENV_FILE="$2"
                shift 2
                ;;
            -d|--dry-run)
                DRY_RUN=true
                shift
                ;;
            -h|--help)
                show_usage
                exit 0
                ;;
            *)
                log_error "알 수 없는 옵션: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    log_info "Cloudflare Workers 시크릿 배포 스크립트"
    echo ""
    
    # 사전 확인
    check_wrangler
    
    if [[ "$DRY_RUN" != "true" ]]; then
        check_wrangler_auth
    else
        log_info "Dry-run 모드: 실제 실행 없이 명령어만 출력"
    fi
    
    # 환경 변수 파일 처리
    process_env_file "$ENV_FILE"
    
    if [[ "$DRY_RUN" != "true" ]]; then
        echo ""
        log_info "시크릿 배포가 완료되었습니다."
        log_info "확인 방법: wrangler secret list"
    fi
}

# 스크립트 실행
main "$@" 