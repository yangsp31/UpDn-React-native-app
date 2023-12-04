export function CheckKeyWord (KeyWord) {
    const CheckWord = KeyWord.trim().split(/[\s.,/]+/).filter(word => word.length > 0);

    if(CheckWord.length === 1) {
        return true;
    }
    else {
        return false;
    }
}