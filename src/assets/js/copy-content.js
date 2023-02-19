const copyContent = async () => {
  let text = document.getElementById('validatorNode').value;
  Notiflix.Notify.success("Staking address copied.")
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
