import React from 'react'
import A_Code from 'A_Code'
import A_RequestMethod from 'A_RequestMethod'
import * as T from "prop-types"
import './styles.scss'
import {cssClassName} from 'utils'
const cn = cssClassName('kb-article-section')

const _createSample = (headers, body, method, url) => (
  `curl --request ${method} \/\n`
   +`--url ${url} \/\n`
   +`${headers.length ? (headers.map(({key, value}) => (`--header '${key}: ${value}' \/\n`))) : (``)}`
   +`${body ? (`--data '${body}' \/\n`) : (``)}`
)

const Section = ({mix, anchorRef, sectionData}) => {

  if (!sectionData.type) {
    const {id, title, request:{method, header: headers, body, description}, response} = sectionData
    let {request:{url}} = sectionData
    url = url.raw || url
    return (
      <section
        ref={anchorRef}
        id={id}
        className={cn([mix])}
      >
        <h4 className={cn('title')}>
          <A_RequestMethod
            mix={cn('title-request-method')}
            type={method}
          />
          {title}
        </h4>

        <code className={cn('request-url')}>{url}</code>
        {description.length ? (<p className={cn('request-description')}>{description}</p>) : (null)}

        {headers.length ? (
          <div className={cn('request-info')}>
            <p className={cn('info-title')}>Headers</p>
            {headers.map(({key, value}, index) => (
              <p
                className={cn('request-params')}
                key={`${id}-header-${index + 1}`}
              >
                <span className={cn('request-params-key')}>{key}</span>
                <span className={cn('request-params-value')}>{value}</span>
              </p>
            ))}
          </div>
        ) : (null)}

        {body ? (
          <div className={cn('request-info')}>
            <p className={cn('info-title')}>Body</p>
            <A_Code
              codeString={body}
              language='json'
            />
          </div>
        ) : (null)}
        <div className={cn('request-info')}>
          <p className={cn('info-title')}>Sample request</p>
          <A_Code
            codeString={_createSample(headers, body, method, url)}
            language='curl'
          />
        </div>

        {response ? (
          <div className={cn('request-info')}>
            <p className={cn('info-title')}>Sample response</p>
            <A_Code
              codeString={response}
              language='json'
            />
          </div>
        ) : (null)}
      </section>
    )
  } else {
    const {id, title, content, sampleCode} = sectionData
    return (
      <section
        ref={anchorRef}
        id={id}
        className={cn([mix])}
      >
        <h4 className={cn('title')}>{title}</h4>
        <p
          className={cn('content')}
          dangerouslySetInnerHTML={{__html: content}}
        />
        <A_Code
          mix={cn('code-snippet')}
          codeString={sampleCode}
        />
      </section>
    )
  }
}

Section.propTypes = {
  mix: T.string, //BEM mixin from parent block
  sectionData: T.object.isRequired, //section data
};

export default Section