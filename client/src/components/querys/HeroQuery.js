var heroQuery = `
hero{
  type:__typename
  ...on HeroBasicHero{
    heading
    description
    buttonText
    linksToOnsite{
      url
      uri
      slug
    }
    offsiteCheckbox
    linksToOffsite
    backgroundImage{
      url
      url
      height
      width
      title
      filename
    }
  }
  
  ...on HeroBlogHero{
    author{
      staffMemberName
      jobTitle
      title
      slug
    }
    heading
    description
    image{
      url
      url
      height
      width
      title
      filename
    }
  }
  
  ...on HeroTextHero{
    heading
    description
    headingAlignment
  }
  
  ...on HeroVideoHero{
    heading
    description
    backgroundImage{
      url
      url
      height
      width
      title
      filename
    }
    backgroundVideo{
      url
      url
      height
      width
      title
      filename
    }
    
  }
  
  ...on HeroIllustrationHero{
    heading
  description
  buttonText
  linksToOnsite{
    url
    uri
    slug
  }
  offsiteCheckbox
  backgroundImage{
    url
    height
    width
    title
    filename
  }
  backgroundColor
  }
}
`;



exports.heroQuery = heroQuery;