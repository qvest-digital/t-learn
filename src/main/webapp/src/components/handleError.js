// export default function(vm, error) {
//     const { $router, $root } = vm;

//     $router.push('/');

//     let message;
//     if (error.response && error.response.status === 404) {
//         message = 'Veranstaltung existiert nicht';
//     } else {
//         message = 'Veranstaltung konnte nicht geladen werden';
//     }

//     $root.$bvToast.toast(message, {
//         variant: 'danger',
//         noCloseButton: true,
//         solid: true,
//         autoHideDelay: 2000
//     });
// }
