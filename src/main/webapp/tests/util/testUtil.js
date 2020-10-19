export function getRandomString(length) {
    return [...Array(length)]
        .map(_ =>
            (~~(Math.random() * 36)).toString(36))
        .join('');
}
