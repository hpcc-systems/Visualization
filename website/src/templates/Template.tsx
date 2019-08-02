import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { RootLayout as Layout } from '../Layout'

function PageTemplate({ data: { mdx } }: any) {
  return (
    <Layout sidebarRoot={mdx.frontmatter.root}>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </Layout>
  )
}
export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        root
      }
      code {
        body
      }
    }
  }
`
export default PageTemplate
