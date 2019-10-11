import React from "react"
import { Link } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Global } from "@emotion/core"
import Micropub from "../components/micropub"

export default props => {
    const { location, title, children } = props
    const rootPath = `${__PATH_PREFIX__}/`
    const bigHeader = location.pathname === rootPath || location.pathname === '/about' || location.pathname === '/inbox'
    let header

    if (bigHeader) {
      header = (
        <div
          sx = {{
            mt: 5,
            mb: [3, '', 7],
          }}
        >
	  <h1
	    sx = {{
	      fontFamily: 'title',
	      fontSize: [6, 8, 10],
	      fontWeight: 400,
	      letterSpacing: '-0.07em',
	      lineHeight: 'title',
              wordSpacing: ['12em', '0'],
              mt: 0,
              mb: [0, 2],
	    }}
	  >
	    <Link
	      to = {`/`}
	      sx = {{
		color: 'primary',
		textDecoration: 'none',
	      }}
	    >
	      {title}
	    </Link>
	  </h1>
	  <p
	    sx = {{
	      fontFamily: 'body',
              color: 'secondary',
              fontSize: [0, 1, 3],
              mt: 0,
	    }}
	  >
	    the personal website of Patrick Marsceill
	  </p>
        </div>
      )
    } else {
      header = (
        <div
          sx = {{
            mt: 5,
            mb: [5, '', 6, '25vh'],
            pb: 5,
            borderBottom: '1px solid',
            borderColor: 'muted',
          }}
        >
	  <h3
	    sx = {{
	      fontFamily: 'title',
	      fontSize: [4, 5, 6],
	      fontWeight: 400,
	      letterSpacing: '-0.07em',
	      lineHeight: 'title',
              mt: 0,
              mb: 0,
	    }}
	  >
	    <Link
	      to = {`/`}
	      sx = {{
                color: 'secondary',
		textDecoration: 'none',
	      }}
	    >
	      {title}
	    </Link>
	  </h3>
	  <p
	    sx = {{
	      fontFamily: 'body',
              color: 'secondary',
              fontSize: 0,
              mt: 0,
              flex: 'auto',
	    }}
	  >
	    the personal website of Patrick Marsceill
	  </p>
        </div>
      )
    }
    return (
      <div
        sx={{
	  maxWidth: 'container',
          mx: 'auto',
          px: [4, 6, '', 5],
        }}
      >
        <Micropub />
        <Global
          styles={
            theme => ({
            '@font-face': {
              fontFamily: 'Optician Sans',
              src: 'url(\'/fonts/Optician-Sans.woff2\') format(\'woff2\'), url(\'/fonts/Optician-Sans.woff\') format(\'woff\')',
              fontWeight: 400,
            },
            '*': {
              boxSizing: 'border-box',
            },
            body: {
              margin: 0,
            },
          })}
        />
        <header>{header}</header>
        <main
          sx = {{
            mb: 6,
            minHeight: ['','','calc(100vh - 389px)'],
          }}
        >
          {children}
        </main>
        <footer
          sx = {{
            fontFamily: "body",
            fontSize: 1,
            color: "secondary",
            pb: 4
          }}
        >
          &copy; 2012-{new Date().getFullYear()} Patrick Marsceill.
          <ul
            sx = {{
              listStyle: 'none',
              pl: 0,
              fontSize: 2,
              display: ['block', 'flex' ],
            }}
          >
            <li
              sx = {{
                mr: 4,
              }}
            >
              <Link
                to = { location.pathname }
                sx = {{
                  color: "primary",
                  textDecoration: "none"
                }}
              >
                Back to top
              </Link>
            </li>
            <li
              sx = {{
                mr: 4,
              }}
            >
              <a
                href = "mailto:patrick.marsceill@gmail.com"
                sx = {{
                  color: "primary",
                  textDecoration: "none"
                }}
              >
                Email me
              </a>
            </li>
            <li
              sx = {{
                mr: 4,
              }}
            >
              <a
                href = "https://twitter.com/pmarsceill"
                sx = {{
                  color: "primary",
                    textDecoration: "none"
                }}
              >
                Twitter
              </a>
            </li>
            <li
              sx = {{
                mr: 4,
              }}
            >
              <a
                href = "https://github.com/pmarsceill"
                sx = {{
                  color: "primary",
                    textDecoration: "none"
                }}
              >
                GitHub
              </a>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
