// Test script for hamburger menu debugging
// Run this in the browser console on any page of the website

console.log('=== Hamburger Menu Debug Test ===');

// Check if elements exist
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

console.log('Hamburger element:', hamburger);
console.log('Nav menu element:', navMenu);

if (hamburger) {
    console.log('Hamburger styles:', {
        display: getComputedStyle(hamburger).display,
        visibility: getComputedStyle(hamburger).visibility,
        opacity: getComputedStyle(hamburger).opacity,
        pointerEvents: getComputedStyle(hamburger).pointerEvents,
        cursor: getComputedStyle(hamburger).cursor,
        zIndex: getComputedStyle(hamburger).zIndex,
        position: getComputedStyle(hamburger).position
    });
    
    // Check if hamburger is visible
    const rect = hamburger.getBoundingClientRect();
    console.log('Hamburger bounding rect:', rect);
    console.log('Hamburger is visible:', rect.width > 0 && rect.height > 0);
    
    // Check for any overlapping elements
    const elementsAtPoint = document.elementsFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
    console.log('Elements at hamburger center:', elementsAtPoint);
    
    // Test click manually
    console.log('Testing manual click...');
    hamburger.click();
    
    // Add a simple test click handler
    hamburger.addEventListener('click', function(e) {
        console.log('TEST CLICK DETECTED!', e);
        alert('Hamburger clicked!');
    });
    
    // Check for existing event listeners (if possible)
    console.log('Hamburger onclick attribute:', hamburger.onclick);
    console.log('Hamburger event listeners (if accessible):', hamburger._listeners || 'Not accessible');
    
} else {
    console.error('Hamburger element not found!');
}

if (navMenu) {
    console.log('Nav menu styles:', {
        display: getComputedStyle(navMenu).display,
        visibility: getComputedStyle(navMenu).visibility,
        opacity: getComputedStyle(navMenu).opacity,
        position: getComputedStyle(navMenu).position,
        zIndex: getComputedStyle(navMenu).zIndex
    });
} else {
    console.error('Nav menu element not found!');
}

// Check for any CSS that might be interfering
console.log('=== CSS Interference Check ===');
const allStyles = document.styleSheets;
console.log('Total stylesheets:', allStyles.length);

// Check for any JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error detected:', e.error);
});

// Test if the hamburger is actually clickable
function testClickability() {
    if (!hamburger) return;
    
    console.log('=== Clickability Test ===');
    
    // Create a test event
    const testEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    
    // Dispatch the event
    const result = hamburger.dispatchEvent(testEvent);
    console.log('Event dispatched successfully:', result);
    
    // Check if any handlers were called
    setTimeout(() => {
        console.log('Click test completed');
    }, 100);
}

// Run clickability test
testClickability();

console.log('=== Debug Test Complete ===');
console.log('Check the console for any errors or warnings above.');
