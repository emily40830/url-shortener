function copyTextToClipboard(id) {
  let link = document.getElementById(id);
  link.select();
  link.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert(`Link: ${link.value} \nbeen copied successfully!`)
}
