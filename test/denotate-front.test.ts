// import { html, fixture, expect } from '@open-wc/testing';
//
// import {DenotateFront} from '../src/DenotateFront.js';
// import '../denotate-front.js';
//
// describe('DenotateFront', () => {
//   it('has a default title "Hey there" and counter 5', async () => {
//     const el: DenotateFront = await fixture(html`
//       <denotate-front></denotate-front>
//     `);
//
//     expect(el.title).to.equal('Hey there');
//     expect(el.counter).to.equal(5);
//   });
//
//   it('increases the counter on button click', async () => {
//     const el: DenotateFront = await fixture(html`
//       <denotate-front></denotate-front>
//     `);
//     el.shadowRoot!.querySelector('button')!.click();
//
//     expect(el.counter).to.equal(6);
//   });
//
//   it('can override the title via attribute', async () => {
//     const el: DenotateFront = await fixture(html`
//       <denotate-front title="attribute title"></denotate-front>
//     `);
//
//     expect(el.title).to.equal('attribute title');
//   });
//
//   it('passes the a11y audit', async () => {
//     const el: DenotateFront = await fixture(html`
//       <denotate-front></denotate-front>
//     `);
//
//     await expect(el).shadowDom.to.be.accessible();
//   });
// });
