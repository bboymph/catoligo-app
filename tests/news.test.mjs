import assert from 'node:assert/strict';
import test from 'node:test';

import { filterNews, formatNewsDate, news } from '../src/data/news.ts';

test('as notícias fictícias têm identificadores e conteúdo completos', () => {
  assert.equal(news.length, 4);
  assert.equal(new Set(news.map((item) => item.id)).size, 4);
  for (const item of news) {
    assert.ok(item.title && item.description && item.illustration);
  }
});

test('a pesquisa considera títulos e descrições sem diferenciar acentos ou maiúsculas', () => {
  assert.equal(filterNews(news, '  CELEBRACAO  ')[0]?.id, 'community-celebration');
  assert.equal(filterNews(news, 'voluntarios')[0]?.id, 'solidarity');
  assert.deepEqual(filterNews(news, ''), news);
  assert.deepEqual(filterNews(news, 'termo inexistente'), []);
});

test('as datas são exibidas no formato DD/MM/YYYY', () => {
  assert.equal(formatNewsDate('2026-11-05'), '05/11/2026');
  for (const item of news) {
    assert.match(formatNewsDate(item.date), /^\d{2}\/\d{2}\/\d{4}$/);
  }
});
