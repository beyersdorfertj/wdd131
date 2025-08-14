// Set footer information
function setFooterInfo() {
    console.log("footer");
  const currentYear = document.getElementById('currentyear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
  
  const lastModified = document.getElementById('lastModified');
  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }
}
