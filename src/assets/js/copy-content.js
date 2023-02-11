  const copyContent = async () => {
    let text = document.getElementById('validatorNode').value;
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
