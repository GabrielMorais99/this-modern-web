import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from 'theme-ui'
import { Styled } from 'theme-ui'
import { MDXRenderer } from "gatsby-plugin-mdx"
import moment from "moment"

import TwoCol from "../components/two-col"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"

export default props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  const microBlogs = posts.filter(function(post) {
    const tags = post.node.frontmatter.tags || []
    return tags.includes("microblog")
  })

  const legacyBlogs = posts.filter(function(post) {
    const tags = post.node.frontmatter.tags || []
    return tags.includes("legacy")
  })

  const currentBlogs = posts.filter(function(post) {
    const tags = post.node.frontmatter.tags || []
    return !tags.includes("microblog") && !tags.includes("legacy")
  })

  const [colorMode, setColorMode] = useColorMode()

  setColorMode('default')

  function currentBlogLayout(title, tags, description, date, slug) {
    return (
      <article
        key = {slug}
        sx = {{
          mb: '5',
          pb: '5',
          borderBottom: '1px solid',
          borderColor: 'muted',
        }}
      >
        <Link
          to = {slug}
          sx = {{
            color: 'primary',
            textDecoration: 'none',
            display: 'block',
            '&:hover': {
              color: 'accent',
            }
          }}
        >
          <h3
            sx = {{
              display: 'inline',
              fontFamily: 'heading',
              fontSize: [5, 6],
              letterSpacing: 'heading',
              lineHeight: 'heading',
            }}
          >
              {title}
          </h3>
          <p
            sx = {{
              fontFamily: 'heading',
              display: 'inline',
              fontSize: [5, 6],
              color: 'secondary',
              fontWeight: 'bold',
              letterSpacing: 'heading',
              lineHeight: 'heading',
              ml: 2,
            }}
          >
            {description}
          </p>
        </Link>
        <small
          sx = {{
            fontFamily: 'body',
            display: 'block',
            fontSize: [0],
            color: 'greyLt0',
            mt: 3,
          }}
        >
          {date}
        </small>
      </article>
    )
  }

  function microBlogLayout(body, timeAgo, permalink, id, slug) {
    return (
    <article
      key = {slug}
      sx = {{
        mb: '5',
        pb: '5',
        borderBottom: '1px solid',
        borderColor: 'muted',
      }}
      id = {id}
    >
    <div
      sx = {{
        color: 'primary',
        textDecoration: 'none',
        fontSize: 'body',
      }}
    >
      <Styled.root>
      <div
        sx = {{
          fontFamily: 'monospace',
          fontSize: [1, '', '', '', ''],
          lineHeight: 'body',
        }}
      >
          <MDXRenderer>
            {body}
          </MDXRenderer>
        </div>
      </Styled.root>
    </div>

    <small
      sx = {{
        fontFamily: 'monospace',
        display: 'block',
        fontSize: 0,
        mt: 3,
      }}
    >
      <a
        href = {permalink}
        sx = {{
          textDecoration: 'none',
          color: 'secondary',
        }}
      >
        ⌘ {timeAgo}
      </a>
    </small>
  </article>
  )
  }

  return (
    <Layout
      location={props.location}
      title={siteTitle}
    >
      <div>
        <TwoCol>
          <Nav />
          <div>
            <SEO title="All posts" />

            {currentBlogs.map(({node}, index) => {
              const title = node.frontmatter.title || node.fields.slug
              const tags = node.frontmatter.tags || []
              const description = node.frontmatter.description || ""
              const date = node.frontmatter.date
              const slug = node.fields.slug

              if (index < 2) {
                return (
                  currentBlogLayout(title, tags, description, date, slug)
                )
              }
            })}

            {microBlogs.map(({ node }, index) => {
              const body = node.body || node.fields.title || node.fields.slug
              const timeAgo = moment(node.frontmatter.date).fromNow()
              const permalink = `#${node.id}`
              const id = node.id
              const slug = node.fields.slug

              if (index < 4) {
                return (
                  microBlogLayout(body, timeAgo, permalink, id, slug)
                )
              }
            })}
            {currentBlogs.map(({node}, index) => {
              const title = node.frontmatter.title || node.fields.slug
              const tags = node.frontmatter.tags || []
              const description = node.frontmatter.description || ""
              const date = node.frontmatter.date
              const slug = node.fields.slug

              if (index >= 2 && index <= 4) {
                return (
                  currentBlogLayout(title, tags, description, date, slug)
                )
              }
            })}
            {microBlogs.map(({ node }, index) => {
              const body = node.body || node.fields.title || node.fields.slug
              const timeAgo = moment(node.frontmatter.date).fromNow()
              const permalink = `#${node.id}`
              const id = node.id
              const slug = node.fields.slug

              if (index >= 4) {
                return (
                  microBlogLayout(body, timeAgo, permalink, id, slug)
                )
              }
              })}
          </div>
        </TwoCol>
      </div>
    </Layout>
  )
}


export const pageQuery = graphql`
  query allPosts {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
          body
        }
      }
    }
  }
`
