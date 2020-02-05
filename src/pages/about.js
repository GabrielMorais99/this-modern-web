import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { Styled } from "theme-ui"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import TwoCol from "../components/two-col"
import Image from "gatsby-image"
import aboutGif from "../../content/assets/patrick-marsceill.gif"

export default props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const [colorMode, setColorMode] = useColorMode()

  setColorMode("light")
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="About Patrick Marsceill" />
      <TwoCol extended="true">
        <Nav />
        <div
          sx={{
            display: ["grid"],
            gridGap: ["", 3, 5],
            gridTemplateAreas: [
              '"intro" "image" "details" "more"',
              '"intro image image" "details image image" "more more more"',
              '"intro image image" "details image image" "more more x"',
            ],
          }}
        >
          <div
            sx={{
              gridArea: "intro",
            }}
          >
            <h1
              sx={{
                fontFamily: "heading",
                fontSize: [5, "", "", 6],
                letterSpacing: "heading",
                lineHeight: "heading",
                mt: 0,
                width: ["", "160%"],
              }}
            >
              Patrick Marsceill
              <span
                sx={{
                  color: "secondary",
                  ml: "0.2em",
                }}
              >
                is a product design manager at GitHub leading teams that design
                &amp; build tools used by over 40 million developers.
              </span>
            </h1>
          </div>
          <div
            sx={{
              gridArea: "details",
            }}
          >
            <div
              sx={{
                fontFamily: "body",
                lineHeight: "body",
                fontSize: [1, "", "", 2],
                color: "medium",
              }}
            >
              <p>
                At GitHub, I manage the <em>Code to Cloud</em> Product Design team, which focuses on enabling developers build, test, and deploy their code on GitHub. You may have seen our work in products like:
              </p>
              <Styled.ul sx={{ color: "text" }}>
                <li>GitHub Actions</li>
                <li>GitHub Packages</li>
                <li>GitHub Pages</li>
              </Styled.ul>
              <p>
                Previously, I managed the product design teams that comprise the
                core workflows that developers use daily including:
              </p>
              <Styled.ul sx={{ color: "text" }}>
                <li>Pull Requests</li>
                <li>Code Review</li>
                <li>Repositories</li>
                <li>Ecosystem powering third-party apps</li>
              </Styled.ul>
            </div>
          </div>
          <div
            sx={{
              gridArea: "image",
            }}
          >
            <img
              src={aboutGif}
              alt="Patrick Marsceill"
              sx={{
                width: "100%",
                mt: [4, 6, ""],
                borderRadius: "6px",
              }}
            />
          </div>

          <div
            sx={{
              gridArea: "more",
            }}
          >
            <div
              sx={{
                fontFamily: "body",
                lineHeight: "body",
                fontSize: [1, "", "", 2],
                color: "medium",
              }}
            >
            <p>
              Before joining GitHub in 2015, I led design teams at Happy Cog and Empathy Lab working with Fortune 500 industry leaders, scrappy start-ups,
              and mission-driven non-profits to build digital products for screens of all sizes.
            </p>
            <Styled.h2>
              About this website
            </Styled.h2>
              <p>
                This website is powered by a custom theme that I wrote for{" "}
                <Styled.a href="https://gatsbyjs.org">GatsbyJS</Styled.a>, a
                very nice framework for React. You can find the source code is
                available on GitHub and hosting is provided by Netlify.
              </p>
              <p>
                The logotype is set in Optician Sans (Open Source on GitHub),
                the reset of the site uses system-safe fontstacks:
              </p>
              <Styled.a href="https://gatsbyjs.org">GatsbyJS</Styled.a>

              <Styled.ul>
                <li>
                  <strong>Headings</strong>
                </li>
                <li>Headings</li>
                <li>Headings</li>
              </Styled.ul>
            </div>
          </div>
        </div>
      </TwoCol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
  }
`
