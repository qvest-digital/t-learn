export default function(vm, courseTitle, deleteCallback) {
  const { $bvModal, $root } = vm;
  $bvModal
    .msgBoxConfirm(
      `Möchtest Du die Veranstaltung "${courseTitle}" wirklich löschen?`,
      {
        title: "Löschen bestätigen",
        okVariant: "danger",
        okTitle: "Ok",
        cancelTitle: "Abbrechen",
        footerClass: "p-2",
        hideHeaderClose: true,
        centered: true
      }
    )
    .then(userResponse => {
      if (userResponse) {
        deleteCallback();
        $root.$bvToast.toast("Veranstaltung wurde gelöscht", {
          variant: "success",
          isStatus: true,
          noCloseButton: true,
          solid: true,
          autoHideDelay: 2000
        });
      }
    })
    .catch(err => console.log(`Modal error ${err}`));
}
