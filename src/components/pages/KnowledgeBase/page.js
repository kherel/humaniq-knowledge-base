import React, {Component} from 'react'
import CustomScroll from 'react-custom-scroll'
import 'react-custom-scroll/dist/customScroll.css'
import { Motion, spring } from 'react-motion'
import ScrollHandler from './ScrollHandler'
import A_Logo_H from 'A_Logo_H'
import A_BurgerBtn from 'A_BurgerBtn'
import M_Link from 'M_Link'
import Menu from './Menu'
import MobileMenu from './MobileMenu'
import Article from './Article'
import Section from "./Article/Section";
import './styles.scss'
import {cssClassName} from 'utils'
const cn = cssClassName('KnowledgeBase');

let HEADER_OFFSET = 92 //header height + top border width

class KnowledgeBase extends Component {

  state = {
    scrollPosition: 0,
    scrollTo: 0,
    scrollProgress: 0,
    scrollFinish: 0,
    currentAnchorId: [],
    anchorCoords: {},
    scrollMotionActive: false,
    mobileMenuActive: false
  }

  _getAnchorCoords = (anchorBlocks, HEADER_OFFSET) => {
    const scrollPosition = this.refs.customScroll.refs.innerContainer.scrollTop

    let
      anchorCoords = {},
      topCoords = []

    Object.entries(anchorBlocks).forEach((anchorBlock) => {
      const
        [id, block] = anchorBlock,
        offset = HEADER_OFFSET + pageYOffset - scrollPosition,
        topCoord = Math.round(block.getBoundingClientRect().top - offset),
        bottomCoord = Math.round(block.getBoundingClientRect().bottom - offset)

      anchorCoords = {...anchorCoords, [id]: {top: topCoord, bottom: bottomCoord}}
      topCoords = [...topCoords, topCoord]
    });

    const scrollFinish = topCoords.reduce(function(a, b) {
      return Math.max(a, b);
    });

    this.setState({anchorCoords, scrollFinish})
  }

  _handleResize = () => {
    this._getAnchorCoords(this.anchorBlocks, HEADER_OFFSET)
  }

  _handleScroll = (e) => {
    const scrollPosition = e.target.scrollTop

    this.setState({scrollPosition})
    this._setcurrentAnchorId(scrollPosition)
    this._countScrollProgress(scrollPosition)
  }

  _setcurrentAnchorId = (scrollPosition) => {
    const { anchorCoords } = this.state

    let currentAnchorId = []
    for (let anchorId in anchorCoords) {
      if(anchorCoords.hasOwnProperty(anchorId)) {
        const anchor = anchorCoords[anchorId]
        if (scrollPosition >= anchor.top && scrollPosition < anchor.bottom) {
          currentAnchorId = [...currentAnchorId, anchorId]
        }
      }
    }

    this.setState({ currentAnchorId })
  }

  _countScrollProgress = (scrollPosition) => {
    const { scrollFinish } = this.state

    const scrollProgress = Math.round(scrollPosition * 100 / scrollFinish)

    this.setState({ scrollProgress })
  }

  setScrollTo = (anchorBlockId) => {
    const { anchorCoords } = this.state

    const scrollTo = anchorCoords[anchorBlockId].top

    this.setState({scrollTo, scrollMotionActive: true})
  }

  finishScrollMotion = () => {
    this.setState({scrollMotionActive: false})
  }

  toggleMobileMenu = () => {
    this.setState(state =>({mobileMenuActive: !state.mobileMenuActive}))
  }


  componentDidMount() {
    window.addEventListener("resize", this._handleResize)
    this._getAnchorCoords(this.anchorBlocks, HEADER_OFFSET)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize)
  }

  render() {
    console.log('render')
    const {articles} = this.props
    const {scrollTo, scrollPosition, currentAnchorId, scrollMotionActive, mobileMenuActive, scrollProgress} = this.state
    return (
      <main className={cn()}>

        <header
          className={cn('header')}
        >
          <M_Link
            mix={cn('logo')}
            type='external'
            to='https://humaniq.com/'
          >
            <A_Logo_H />
          </M_Link>

          <A_BurgerBtn
            mix={cn('burger-btn')}
            onClick={this.toggleMobileMenu}
            active={mobileMenuActive}
          />
        </header>
        
        <div className={cn('content')}>
          <Menu
            mix={cn('menu')}
            articles={articles}
            setScrollTo={this.setScrollTo}
            currentAnchorId={currentAnchorId}
          />

          <MobileMenu
            mix={cn('mobile-menu')}
            articles={articles}
            setScrollTo={this.setScrollTo}
            currentAnchorId={currentAnchorId}
            toggleMenu={this.toggleMobileMenu}
            active={mobileMenuActive}
          />

          <div className={cn('articles')}>

            <div className={cn('progress')}>
              <div
                className={cn('progress-line')}
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            <CustomScroll
              ref="customScroll"
              heightRelativeToParent='100%'
              onScroll={this._handleScroll}
            >
              {articles.map((article) => (
                <Article
                  anchorRef={(domNode) => {this.anchorBlocks = {...this.anchorBlocks, [article.id]: domNode}}}
                  key={article.id}
                  mix={cn('article')}
                  articleData={article}
                >

                  <div className={cn('sections')}>
                    {article.sections.map((section) => {
                      return (
                        <Section
                          anchorRef={(domNode) => {this.anchorBlocks = {...this.anchorBlocks, [section.id]: domNode}}}
                          key={section.id}
                          mix={cn('section')}
                          sectionData={section}
                        />
                      )
                    })}
                  </div>
                </Article>
              ))}
            </CustomScroll>
          </div>

          {scrollMotionActive ? (
            <Motion
              defaultStyle={{
                scrollMotionProgress: scrollPosition //from
              }}
              style={{
                scrollMotionProgress: spring(scrollTo, {stiffness: 260, damping: 26}) //to
              }}
            >
              {({scrollMotionProgress}) => {
                return(
                  <ScrollHandler
                    scrollContainer={this.refs.customScroll.refs.innerContainer}
                    scrollTo={scrollTo}
                    scrollMotionProgress={scrollMotionProgress}
                    finishScrollMotion={this.finishScrollMotion}
                  />
                )

              }}

            </Motion>) : (null)}
        </div>
      </main>
    )
  }
}


export default KnowledgeBase;
