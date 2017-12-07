import React, {Component} from 'react'
import CustomScroll from 'react-custom-scroll'
import './customScroll.scss'
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
import {compareArrays} from 'utils'
const cn = cssClassName('KnowledgeBase');

const HEADER_OFFSET = 92 //header height + top border

class KnowledgeBase extends Component {

  state = {
    currentAnchorId: [],
    scrollProgress: 0,
    scrollMotionActive: false,
    mobileMenuActive: false,
  }

  initialRender = true

  scrollData = {
    getScrollPosition: () => this.refs.customScroll.refs.innerContainer.scrollTop,
    anchorCoords: {},
    scrollTo: 0,
    scrollFinish: 0,
  }


  _setAnchorCoords = () => {
    const { anchorBlocks } = this
    const { getScrollPosition } =  this.scrollData
    console.log('calculating anchor coords, current scroll position', getScrollPosition())

    const
      offset = HEADER_OFFSET + pageYOffset - getScrollPosition(),
      anchorCoords = {},
      topCoords = []

    Object.entries(anchorBlocks).forEach((anchorBlock) => {
      const
        [id, block] = anchorBlock,
        topCoord = Math.round(block.getBoundingClientRect().top - offset),
        bottomCoord = Math.round(block.getBoundingClientRect().bottom - offset)

      anchorCoords[id] = {top: topCoord, bottom: bottomCoord}
      topCoords.push(topCoord)
    });

    this.scrollData.anchorCoords = anchorCoords
    this.scrollData.scrollFinish = topCoords.reduce(function(a, b) {
      return Math.max(a, b);
    });
  }

  _setScrollProgress = () => {
    const { getScrollPosition, scrollFinish } =  this.scrollData

    const scrollProgress = Math.round(getScrollPosition() * 100 / scrollFinish)

    this.setState({ scrollProgress })
  }

  _setCurrentAnchorId = () => {
    const { getScrollPosition, anchorCoords } =  this.scrollData
    const scrollPosition = getScrollPosition()

    let currentAnchorId = []
    for (let anchorId in anchorCoords) {
      if(anchorCoords.hasOwnProperty(anchorId)) {
        const anchor = anchorCoords[anchorId]
        if (scrollPosition >= anchor.top && scrollPosition < anchor.bottom) {
          currentAnchorId = [...currentAnchorId, anchorId]
        }
      }
    }

    this.setState({currentAnchorId})
  }

  setScrollTo = (anchorBlockId) => {
    const { anchorCoords } = this.scrollData

    this.scrollData.scrollTo = anchorCoords[anchorBlockId].top
    this.startScrollMotion()
  }

  startScrollMotion = () => {
    this.setState({scrollMotionActive: true})
  }

  finishScrollMotion = () => {
    this.setState({scrollMotionActive: false})
  }

  toggleMobileMenu = () => {
    this.setState(state =>({mobileMenuActive: !state.mobileMenuActive}))
  }

  _handleResize = () => {
    this._setAnchorCoords()
  }

  _handleScroll = () => {
    this._setCurrentAnchorId()
    this._setScrollProgress()
  }


  componentDidMount() {
    window.addEventListener("resize", this._handleResize)
  }

  componentDidUpdate() {
    const {loaded} = this.props

    if(loaded && this.initialRender) {
      this.initialRender = false
      this._setAnchorCoords()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const
      articles = this.props.loaded !== nextProps.loaded,
      currentAnchor = !compareArrays(this.state.currentAnchorId, nextState.currentAnchorId) && !this.state.scrollMotionActive,
      scrollMotion = this.state.scrollMotionActive !== nextState.scrollMotionActive,
      mobileMenu = this.state.mobileMenuActive !== nextState.mobileMenuActive

    return articles || currentAnchor || scrollMotion || mobileMenu
  }



  render() {
    console.log('render')
    const {articles} = this.props
    const {currentAnchorId, scrollMotionActive, mobileMenuActive, scrollProgress} = this.state
    const {scrollTo, getScrollPosition} = this.scrollData

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
                scrollMotionProgress: getScrollPosition() //from
              }}
              style={{
                scrollMotionProgress: spring(scrollTo, {stiffness: 280, damping: 28}) //to
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
