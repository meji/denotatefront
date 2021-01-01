const hljs = require("highlight.js");
export const md = require("markdown-it")({
  html: false,
  linkify: true,
  typographer: true,
  highlight: function(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
          );
        } catch (__) {}
      }
      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});
md.linkify.set({ fuzzyEmail: false });
