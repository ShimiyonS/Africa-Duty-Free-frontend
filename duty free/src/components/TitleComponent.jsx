import React from 'react'

const TitleComponent = ({ headingClassName, heading }) => {
    return (
        <>
            <p className={`${headingClassName ? headingClassName : ' mb-0 justuspro-medium linear-bg-heading px-3 py-2 text-color-secondary'} `}>
                {heading}
            </p>
        </>
    )
}

export default TitleComponent