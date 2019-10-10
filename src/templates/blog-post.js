import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TwoCol from "../components/two-col"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Styled } from 'theme-ui'
import { useColorMode } from 'theme-ui'
import { MDXRenderer } from "gatsby-plugin-mdx"
import { InView } from 'react-intersection-observer'

class BlogPostPage extends React.Component {

  SetColor() {
    const [colorMode, setColorMode] = useColorMode()

    setColorMode('light')
    return(
      null
    )
  }

  constructor(props) {
    super(props)
    this.showSideTitle = this.showSideTitle.bind(this)
    this.state = {
      showSideTitle: false
    }
  }

  showSideTitle(show) {
    this.setState({
      showSideTitle: show,
    })
  }

  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const sideTitleClass = (this.state.showSideTitle ? ' show' : '')

    return (
      <Layout location={this.props.location} title={siteTitle} >
	<this.SetColor />

	<SEO
	  title={post.frontmatter.title}
	  description={post.frontmatter.description || post.excerpt}
	/>

	<article>
	  <header
	    sx = {{
	      mb: [3,'', 5, 6],
	      maxWidth: ['420px', '680px'],
	      pr: ['', 5, 0, 0],
	    }}
	  >
	    <InView as="div" onChange={(inView, entry) => this.showSideTitle(!inView)}>
	      <h1
		sx = {{
		  fontFamily: 'heading',
		  fontSize: [5, 6, '', 7],
		  display: 'inline',
		  color: 'primary',
		  letterSpacing: 'heading',
		  mr: 2,
		}}
	      >
		{post.frontmatter.title}
	      </h1>
	      <h2
		sx = {{
		  fontFamily: 'heading',
		  fontSize: [5, 6, '', 7],
		  fontWeight: 'bold',
		  color: 'secondary',
		  display: 'inline',
		  letterSpacing: 'heading',
		}}
	      >
		{post.frontmatter.description}
	      </h2>
	    </InView>
	  </header>
	  <TwoCol>
	    <div
	      sx = {{
		fontFamily: 'body',
		display: 'block',
	      }}
	    >
	      <div
		sx = {{
		  position: ['', '', 'sticky'],
		  top: 5,
		  mb: 3,
		  mt: 1,
		}}
	      >
	      <div
		className = {sideTitleClass}
		sx = {{
		  display: 'none',
                  mb: 4,
		  '&.show': {
		     display: 'block',
		  }
		}}
	      >
		<span
		  sx = {{
		    fontFamily: 'heading',
		    fontWeight: 'heading',
		    fontSize: [3],
		    display: ['none', '', 'inline' ],
		    color: 'primary',
		    letterSpacing: 'heading',
		    mr: 2,
		  }}
		>
		  {post.frontmatter.title}
		</span>
		<span
		  sx = {{
		    fontFamily: 'heading',
		    fontWeight: 'heading',
		    fontSize: [3],
		    display: ['none', '', 'inline' ],
		    color: 'secondary',
		    letterSpacing: 'heading',
		    mr: 2,
		  }}
		>
		  {post.frontmatter.description}
		</span>
	      </div>
		<p
		  sx = {{
		    fontSize: [0],
		    color: 'secondary',
		    mt: 0,
		  }}
		>{post.frontmatter.date}</p>
	      </div>
	    </div>
	    <section
	      sx = {{
		pt: ['', 4, 0, 0]
	      }}
	    >
	      <Styled.root>
		<MDXRenderer>{post.body}</MDXRenderer>
	      </Styled.root>
	    </section>
	  </TwoCol>
	  <hr />
	  <footer>
	    <Bio />
	  </footer>
	</article>

	<nav>
	  <ul
	  >
	    <li>
	      {previous && (
		<Link to={previous.fields.slug} rel="prev">
		  ← {previous.frontmatter.title}
		</Link>
	      )}
	    </li>
	    <li>
	      {next && (
		<Link to={next.fields.slug} rel="next">
		  {next.frontmatter.title} →
		</Link>
	      )}
	    </li>
	  </ul>
	</nav>
      </Layout>
    )
  }
}

export default BlogPostPage

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
	title
	author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
	title
	date(formatString: "MMMM DD, YYYY")
	description
      }
    }
  }
`
