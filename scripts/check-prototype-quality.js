#!/usr/bin/env node

const path = require('path');
const { chromium } = require('playwright');

const prototypePath = process.argv[2] || 'prototype/store-management/index.html';
const target = 'file://' + path.resolve(prototypePath);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];

  page.on('pageerror', error => errors.push(`JS error: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`Console error: ${message.text()}`);
  });

  await page.goto(target);
  await page.waitForSelector('body');
  await page.waitForTimeout(200);

  const checks = await page.evaluate(() => {
    const visibleNativeSelects = [...document.querySelectorAll('select')].filter(select => {
      const style = getComputedStyle(select);
      const rect = select.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    }).map(select => select.id || select.outerHTML.slice(0, 80));

    const doc = document.documentElement;
    const tableWrap = document.querySelector('.table-wrap');
    const visibleHeaderCount = [...document.querySelectorAll('#storeTable thead th')].filter(th => getComputedStyle(th).display !== 'none').length;
    const misalignedRows = [...document.querySelectorAll('#storeTable tbody tr')].filter(tr => {
      const cells = [...tr.children].filter(td => getComputedStyle(td).display !== 'none');
      return cells.length && cells.length !== visibleHeaderCount;
    }).length;

    return {
      visibleNativeSelects,
      bodyHasHorizontalScroll: doc.scrollWidth > doc.clientWidth + 1,
      tableCanScroll: tableWrap ? tableWrap.scrollWidth > tableWrap.clientWidth : false,
      hasStickyAlias: getComputedStyle(document.querySelector('.col-alias')).position === 'sticky',
      visibleHeaderCount,
      misalignedRows,
    };
  });

  if (checks.visibleNativeSelects.length) {
    errors.push(`Visible native <select> controls found: ${checks.visibleNativeSelects.join(', ')}`);
  }
  if (checks.bodyHasHorizontalScroll) {
    errors.push('Page-level horizontal scroll found; wide tables must scroll inside .table-wrap only.');
  }
  if (!checks.tableCanScroll) {
    errors.push('Table wrapper is not horizontally scrollable; wide fields may overflow the page.');
  }
  if (!checks.hasStickyAlias) {
    errors.push('Store alias column is not sticky.');
  }
  if (checks.misalignedRows) {
    errors.push(`Table header/body visible column mismatch found in ${checks.misalignedRows} row(s).`);
  }

  await browser.close();

  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }

  console.log(`Prototype quality check passed: ${prototypePath}`);
})();
