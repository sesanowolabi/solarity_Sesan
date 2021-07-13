
var basicBlocksQuery = `
basicBlocks{
  type:__typename
  ...on BasicBlocksAccordion{
    item{
      heading
      description{
        content
      }
    }
  }

  ...on BasicBlocksSingleImage{
    label
    heading
    description
    buttonText
    linksToOnsite{
      url
      uri
      slug
    }
    linksToOffsite
    image{
      url
      height
      width
      title
      filename
      transform_url: url(transform: singleImageBlock)
    }
  }

  ...on BasicBlocksSingleImageChecklist{
    label
    heading
    checklist{
      listItemText
    }
    buttonText
    linksToOnsite{
      url
      uri
      slug
    }
    linksToOffsite
    image{
      url
      height
      width
      title
      filename
      transform_url: url(transform: singleImageBlock)
    }
  }

  ...on BasicBlocksTwoImage{
    image1{
      url
      height
      width
      title
      filename
      transform_url: url(transform: twoImageBlock)
    }
    heading1
    description1{
      content
    }
    linkText1
    linksToOnsite1{
      uri
      url
      slug
    }
    linksToOffsite1
    image2{
      url
      height
      width
      title
      filename
      transform_url: url(transform: twoImageBlock)
    }
    heading2
    description2{
      content
    }
    linkText2
    linksToOnsite2{
      uri
      url
      slug
    }
    linksToOffsite2
    size
  }

  ...on BasicBlocksProcess{
    processSteps{
      heading
      description{
        content
      }
      icon{
        url
        filename
        title
        height
        width
      }
    }
  }

  ...on BasicBlocksNumberedListWithChecklist{
    numberedListHeading
    numberedList{
      heading
      description
    }
    checklistHeading
    checklist{
      listItemText
    }
  }

  ...on BasicBlocksTestimonial{
    quote
    memberName
  }

  ...on BasicBlocksThreeImage{
    icon1{
      url
      height
      width
      title
      filename
    }
    heading1
    description1I:description1
    link1Text
    linksToOnsite1{
      uri
      url
      slug
      title
    }
    linksToOffsite1
    icon2{
      url
      height
      width
      title
      filename
    }
    heading2
    description2I:description2
    link2Text
    linksToOnsite2{
      uri
      url
      slug
      title
    }
    linksToOffsite2
    icon3{
      url
      height
      width
      title
      filename
    }
    heading3
    description3I:description3
    link3Text
    linksToOnsite3{
      uri
      url
      slug
      title
    }
    linksToOffsite3
  }


  ...on BasicBlocksThreeIcon{
    icon1{
      url
      height
      width
      title
      filename
    }
    heading1
    description1I:description1
    link1Text
    linksToOnsite1{
      uri
      url
      slug
      title
    }
    linksToOffsite1
    icon2{
      url
      height
      width
      title
      filename
    }
    heading2
    description2I:description2
    link2Text
    linksToOnsite2{
      uri
      url
      slug
      title
    }
    linksToOffsite2
    icon3{
      url
      height
      width
      title
      filename
    }
    heading3
    description3I:description3
    link3Text
    linksToOnsite3{
      uri
      url
      slug
      title
    }
    linksToOffsite3
  }

  ...on BasicBlocksTwoVideoPlayer{
    video1PlayerType
    video1Link
    video1CoverPhoto{
      url
      height
      width
      title
      filename
    }
    video2PlayerType
    video2Link
    video2CoverPhoto{
      url
      height
      width
      title
      filename
    }
  }

  ...on BasicBlocksVideoPlayer{
    playerType
    videoLink
    videoCoverPhoto{
      url
      height
      width
      title
      filename
    }
  }

  ...on BasicBlocksTextBlock{
    heading
    desc:description{
      content
    }
  }

  ...on BasicBlocksCta{
    heading
    description
    buttonText
    linksToOnsite{
      url
      uri
      slug
    }
    linksToOffsite
    backgroundImage{
      url
      height
      width
      title
      filename
    }
  }

  ...on BasicBlocksBigCta{
    heading
    description
    buttonText
    emailAddress
    phoneNumber
    linksToOnsite{
      url
      uri
      slug
    }
    linksToOffsite
  }

  ...on BasicBlocksRatesTable{
    ratesPage{
      ...on Rates{
        rateTableTitles{
          table1stColumnTitle
          table2ndColumnTitle
          table3rdColumnTitle
        }
        rates{
          table1stColumnValue
          table2ndColumnValue
          table3rdColumnValue
        }
        ratesAdditionalDetails{
          detail
          title
        }
      }
    }
  }

  ...on BasicBlocksFullWidthImage{
    image{
      url
      height
      width
      title
      filename
    }
  }

  ...on BasicBlocksForm{
    scriptContents
    formId
    formType
  }
  ...on BasicBlocksCalculator{
    calculatorType
  }
}
`;



exports.basicBlocksQuery = basicBlocksQuery;
