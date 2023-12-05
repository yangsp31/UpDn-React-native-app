// 사용자로부터 입력받은 키워드가 프로그램이 요구하는 형태인지 자바스크립트 정규식을 활용하여  적합성 검사 로직
export function CheckKeyWord (KeyWord) {
    const CheckWord = KeyWord.trim().split(/[\s.,/]+/).filter(word => word.length > 0);

    if(CheckWord.length === 1) {
        return true;
    }
    else {
        return false;
    }
}