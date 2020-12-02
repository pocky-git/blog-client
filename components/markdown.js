import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/github.css'

import '../styles/components/markdown.less'

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value
    }
})

const Markdown = ({content}) => {
    return (
        <div className="markdown-content" dangerouslySetInnerHTML={{__html:marked(content).replace(/<pre>/g, "<pre class='hljs'>")}}></div>
    )
}

export default Markdown