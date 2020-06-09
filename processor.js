const unified = require("unified")
const remarkParse = require("remark-parse")
const remarkFrontmatter = require("remark-frontmatter")
const remarkExtractFrontmatter = require("remark-extract-frontmatter")
const remarkRehype = require("remark-rehype")
const remarkMath = require("remark-math")
const rehypeMathJax = require("rehype-mathjax")
const rehypeStringify = require("rehype-stringify")
const remarkContainers = require("remark-containers")
const { html, doctype, template: rehypeTemplate } = require("rehype-template")
const fs = require("fs")
const path = require("path")
const yaml = require("yaml")
const rehypeFormat = require("rehype-format")

const PageId = require("./page-id")
const pageId = new PageId()

function transform(node) {
    pageId.increment()
    node.data.hProperties = {
        id: pageId.current
    }
    node.children.push({
        type: 'link',
        url: `#${pageId.previous}`,
        title: 'previous-page'
    }, {
        type: 'link',
        url: `#${pageId.next}`,
        title: 'next-page'
    })
}

function template (content, frontmatter) {
    const cssFile = path.join(__dirname, `${frontmatter.theme || 'default'}.css`)
    const stylesheet = fs.readFileSync(cssFile, 'utf-8');
    return html`
        ${doctype}
        <html>
            <head>
                <title>${frontmatter.title}</title>
                <style>${stylesheet}</style>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `
}

const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkExtractFrontmatter, { yaml: yaml.parse })
    .use(remarkMath)
    .use(remarkContainers, { 
        custom: [{
            type: 'frame',
            element: 'section',
            transform
        }]
    })
    .use(remarkRehype)
    .use(rehypeTemplate, { template })
    .use(rehypeMathJax)
    .use(rehypeFormat)
    .use(rehypeStringify)

module.exports = processor