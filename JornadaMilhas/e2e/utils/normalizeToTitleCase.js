export function normalizeToTitleCase(str){
    const exceptions = ['de', 'da', 'do', 'dos', 'das', 'e'];
    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            if(exceptions.includes(word)){
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}