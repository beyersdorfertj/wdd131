function displayFormData() {
  const reviewContent = document.getElementById('review-content');
  
  if (!reviewContent) {
    return; // Not on review page
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.toString() === '') {
    reviewContent.innerHTML = '<div style="padding: 20px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; color: #721c24; margin: 20px 0;"><p>No review data found. Please <a href="form.html">submit a review</a> first.</p></div>';
    return;
  }
  
  let submitCount = parseInt(localStorage.getItem('submitCount')) || 0;
  let reloadCount = parseInt(localStorage.getItem('reloadCount')) || 0;
  if (sessionStorage.getItem('fromFormSubmission') === 'true') {
    sessionStorage.removeItem('fromFormSubmission');
    localStorage.removeItem('reloadCount');
    submitCount++;
    reloadCount = 0;
    localStorage.setItem('submitCount', submitCount);
  } else {
    reloadCount++;
    localStorage.setItem('reloadCount', reloadCount);
  }
  
  
  let html = '<div style="background-color: white; padding: 20px; border-radius: 4px; margin: 20px 0;">';
  html += '<h2 style="color: #4CAF50; margin-bottom: 20px;">Review Details</h2>';
  
  // Display counters with enhanced tracking information
  const reloads = reloadCount > 0 ? ` (Reloads: #${reloadCount})` : '';
  html += `<div style="background-color: #e7f3ff; padding: 15px; border-radius: 4px; margin-bottom: 20px; border-left: 4px solid #2196F3;">
    <strong>🎉 Thank you for completing this review #${submitCount}${reloads}.</strong><br>
  </div>`;
  
  // Product Name
  if (urlParams.get('productName')) {
    html += `<div style="margin-bottom: 15px;"><strong>Product:</strong> ${escapeHtml(urlParams.get('productName'))}</div>`;
  }
  
  // Rating
  if (urlParams.get('rating')) {
    const rating = parseInt(urlParams.get('rating'));
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    html += `<div style="margin-bottom: 15px;"><strong>Rating:</strong> ${stars} (${rating}/5)</div>`;
  }
  
  // Installation Date
  if (urlParams.get('installDate')) {
    const date = new Date(urlParams.get('installDate'));
    html += `<div style="margin-bottom: 15px;"><strong>Installation Date:</strong> ${date.toLocaleDateString()}</div>`;
  }
  
  // Features
  const features = urlParams.getAll('features');
  if (features.length > 0) {
    html += `<div style="margin-bottom: 15px;"><strong>Useful Features:</strong><ul style="margin: 5px 0 0 20px;">`;
    features.forEach(feature => {
      html += `<li>${escapeHtml(feature)}</li>`;
    });
    html += '</ul></div>';
  }
  
  // Written Review
  if (urlParams.get('writtenReview')) {
    html += `<div style="margin-bottom: 15px;"><strong>Your Review:</strong><div style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap;">${escapeHtml(urlParams.get('writtenReview'))}</div></div>`;
  }
  
  // User Name
  if (urlParams.get('userName')) {
    html += `<div style="margin-bottom: 15px;"><strong>Reviewer:</strong> ${escapeHtml(urlParams.get('userName'))}</div>`;
  }
  
  html += '</div>';
  
  reviewContent.innerHTML = html;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}


// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  displayFormData();
  setFooterInfo();
});