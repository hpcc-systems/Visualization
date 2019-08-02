import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Header } from './Header'
import { pathPrefix } from '../gatsby-config'
import { Layout, Breadcrumb } from 'antd'
import { SidebarContents } from './SidebarContents'
import { TableOfContents } from './TableOfContents'
const { Sider, Content } = Layout

export function RootLayout({ children, sidebarRoot }: any) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
          allMdx {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => {
        const allPosts = data.allMdx.edges.map(
          (edge: any) => edge.node.fields.slug
        )
        let onPostPage
        if (typeof window !== 'undefined') {
          const path = window.location.pathname.replace(
            pathPrefix.slice(0, -1),
            ''
          )
          if (
            allPosts.indexOf(path) >= 0 ||
            allPosts.indexOf(path.slice(0, -1)) >= 0
          ) {
            onPostPage = true
          } else {
            onPostPage = false
          }
        }

        const { title } = data.site.siteMetadata

        return (
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr',
              height: '100vh',
            }}
          >
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header siteTitle={title} />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                height: '100%',
              }}
            >
              <SidebarContents root={sidebarRoot} />
              <Layout>
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                  }}
                >
                  {children}
                </Content>
              </Layout>
              <TableOfContents />
            </div>
            <Layout>
              <Sider
                width={200}
                style={{ background: '#fff', height: '100%' }}
              />
            </Layout>
          </div>
        )
      }}
    />
  )
}

export default RootLayout
