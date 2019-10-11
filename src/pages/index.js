import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Helmet from "react-helmet"

import Swiper from "swiper"
import "swiper/css/swiper.min.css"
import "./index.css"

const Slideshow = () => {
  const images = useStaticQuery(graphql`
  query {
    allFile(filter: {relativeDirectory: {eq: "images"}}, sort: {order: ASC, fields: base}) {
      nodes {
        base
        childImageSharp {
          fluid(maxWidth: 2560, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  `)

  useEffect(() => {
    const slideshow = new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "fade",
      autoplay: {
        delay: "3000",
      },
      on: {
        autoplayStop: () => {
          setTimeout(() => {
            slideshow.autoplay.start()
          }, 7000)
        },
      },
    })
  }, [])

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {images.allFile.nodes.map((node, index) => (
          <div className="swiper-slide" key={index}>
            <Img
              className="swiper-img"
              fluid={node.childImageSharp.fluid}
              alt={`Photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="swiper-pagination" />
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </div>
  )
}

const IndexPage = () => (
  <>
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>My Title</title>
    </Helmet>
    <Slideshow />
  </>
)

export default IndexPage
