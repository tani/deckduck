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
const sass = require("sass")

function createTransform() {
    let page = 1;
    return (node) => {
        node.data.hProperties = {
            id: `p${page}`
        }
        node.children.push({
            type: 'link',
            url: `#p${page-1}`,
            title: 'previous-page'
        }, {
            type: 'link',
            url: `#p${page+1}`,
            title: 'next-page'
        })
        page++
    }
}

function createTemplate(argv) {
    return (content, frontmatter) => {
        const scssFile = path.join(__dirname, `${argv.theme || frontmatter.theme || 'default'}.scss`)
        const stylesheet = sass.renderSync({file: scssFile})
        return html`
            ${doctype}
            <html>
                <head>
                    <title>${frontmatter.title}</title>
                    <style>${stylesheet.css.toString("utf-8")}</style>
                </head>
                <body>
                    ${content}
                </body>
            </html>
        `
    }
}

function createProcessor(argv) {
    return unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkExtractFrontmatter, { yaml: yaml.parse })
        .use(remarkMath)
        .use(remarkContainers, { 
            custom: [{
                type: 'frame',
                element: 'section',
                transform: createTransform()
            }]
        })
        .use(remarkRehype)
        .use(rehypeTemplate, { template: createTemplate(argv) })
        .use(rehypeMathJax)
        .use(rehypeFormat)
        .use(rehypeStringify)
}

module.exports = createProcessor 