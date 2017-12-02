import React from 'react';
import * as T from "prop-types";
import './styles.scss';
import {cssClassName} from 'utils'
const cn = cssClassName('kb-mobile-menu')

const _createArticleLinks = (articleId, articleTitle, sections, {currentAnchorId, setScrollTo, toggleMenu}) => {
  const activeArticle = currentAnchorId.includes(articleId)

  return (
    <li
      key={`${articleId}-links`}
      className={cn('article-links')}
    >
      <div
        onClick={() => {
          setScrollTo(articleId)
          toggleMenu()
        }}
        className={cn('article-link', {active: activeArticle})}
      >
        {articleTitle}
      </div>
      <nav className={cn('section-links')}>
        {sections.map(({title: sectionTitle, id: sectionId}, index) => {
          const activeSection = currentAnchorId.includes(sectionId)
          return (
            <div
              onClick={() => {
                setScrollTo(`${articleId}-section-${index + 1}`)
                toggleMenu()
              }}
              key={`${articleId}-section-link-${index + 1}`}
              className={cn('section-link', {active: activeSection})}
            >
              {sectionTitle}
            </div>
          )
        })}
      </nav>
    </li>
  )
}

const MobileMenu = ({mix, articles, active, ...props}) => (
  <div className={cn({active},[mix])}>
    <ul className={cn('links-list')}>
      {articles.map(({id: articleId, title, sections}) => {
        return _createArticleLinks(articleId, title, sections, props)
      })}
    </ul>
  </div>
)

MobileMenu.propTypes = {
  mix: T.string, //BEM mixin from parent block
  articles: T.array.isRequired,
  currentAnchorId: T.array.isRequired,
  setScrollTo: T.func.isRequired,
  toggleMenu: T.func.isRequired,
};

export default MobileMenu