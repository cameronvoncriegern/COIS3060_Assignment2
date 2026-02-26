/**
 *  test.js
 * Automated Testing for MSR Knowledge Base
 */

const fs = require('fs');
const path = require('path');

beforeEach(() => {
  // Load the HTML into the JSDOM document
  const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
  document.open();
  document.write(html);
  document.close();

  // Manually trigger DOMContentLoaded because JSDOM doesn't always fire it 
  // automatically after document.write() for scripts loaded via <script defer>
  require('./script.js'); 
  window.dispatchEvent(new Event('DOMContentLoaded'));
});

// ── Helpers ──────────────────────────────────────────────────

function getNavLink(href) {
  return document.querySelector(`a[href="${href}"]`);
}

function getSection(id) {
  return document.getElementById(id);
}

function clickNavLink(href) {
  getNavLink(href).click();
}

// ─────────────────────────────────────────────────────────────

describe('Initial Page Load', () => {

  test('Data Sources is active by default', () => {
    const dataSourceLink = getNavLink('#data-sources');
    const dataSourceSection = getSection('data-sources');
    
    expect(dataSourceLink.classList.contains('active-link')).toBe(true);
    expect(dataSourceSection.classList.contains('active')).toBe(true);
  });

  test('Other sections are not active on load', () => {
    expect(getSection('collection-methods').classList.contains('active')).toBe(false);
    expect(getSection('analysis-methods').classList.contains('active')).toBe(false);
  });

});

describe('Navigation Logic', () => {

  test('clicking Collection Methods activates its section and link', () => {
    clickNavLink('#collection-methods');

    expect(getSection('collection-methods').classList.contains('active')).toBe(true);
    expect(getNavLink('#collection-methods').classList.contains('active-link')).toBe(true);
  });

  test('clicking a new tab deactivates the previous tab', () => {
    // Start by clicking one
    clickNavLink('#analysis-methods');
    expect(getSection('analysis-methods').classList.contains('active')).toBe(true);

    // Click a different one
    clickNavLink('#publication-venues');

    // Analysis should now be inactive
    expect(getSection('analysis-methods').classList.contains('active')).toBe(false);
    expect(getNavLink('#analysis-methods').classList.contains('active-link')).toBe(false);
    
    // Publication should be active
    expect(getSection('publication-venues').classList.contains('active')).toBe(true);
  });

});

describe('Content Integrity', () => {

  test('Data Sources table contains expected research platforms', () => {
    const tableBody = document.querySelector('#data-sources tbody');
    const content = tableBody.textContent;
    
    expect(content).toContain('GitHub');
    expect(content).toContain('Stack Overflow');
    expect(content).toContain('npm Registry');
  });

  test('Publication Venues table lists key SE conferences', () => {
    const tableBody = document.querySelector('#publication-venues tbody');
    const content = tableBody.textContent;
    
    expect(content).toContain('ICSE');
    expect(content).toContain('MSR');
    expect(content).toContain('EMSE');
  });

});