export function formatDateEN(date){
    return new Intl.DateTimeFormat('en-US').format(date);
}