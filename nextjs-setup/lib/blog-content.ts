/** Simple markdown-ish → HTML for blog posts (prototype-themed, no inline Tailwind). */
export function formatBlogContent(content: string): string {
  return content
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) {
        return `<h2>${line.substring(2)}</h2>`;
      }
      if (line.startsWith('## ')) {
        return `<h3>${line.substring(3)}</h3>`;
      }
      if (line.startsWith('### ')) {
        return `<h4>${line.substring(4)}</h4>`;
      }

      let out = line;
      out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      out = out.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" rel="noopener noreferrer">$1</a>'
      );

      if (line.startsWith('- ') || line.startsWith('* ')) {
        return `<li>${out.substring(2)}</li>`;
      }
      if (line.trim()) {
        return `<p>${out}</p>`;
      }
      return '';
    })
    .join('\n');
}
