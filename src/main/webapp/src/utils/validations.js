export function validationStateClass(path) {
    const { $dirty, $error } = path
        .split('.')
        .reduce(
            (previous, current) => (previous ? previous[current] : null),
            this.$v
        );

    return $dirty && $error ? 'is-invalid' : 'is-valid';
}
