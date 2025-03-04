# Next.js Art Gallery Website

## Roadmap

- [ ] Fix the filters layout on mobile
- [ ] Re-do the ItemGrid component
  - [x] Don't display the bullet points
  - [x] Remove the hover effect, just add the title below the image
  - [x] Switch to using <Link> instead of the router ? Will it preload the page inside/images?
  - [ ] Add an animation when loading the images
  - [ ] Generate the pages for the 3 main types statically
  - [ ] Fix the single item when 2 wide
  - [ ] add the seo metadata
- [ ] Implement localization with next-intl
  - [ ] Single call to the API for all the UIElements, in both languages
  - [ ] Function to get the correct UIElements based on part of the UI and the locale
  - [ ] Which method is best for SEO?
- [ ] Home Page
  - [ ] How to parse the markdown content fetched from the API ?
  - [ ] Component to display a few items from the collection, maybe randomly + a link to the full collection
- [ ] Item Page
  - [ ] make the footer be on the bottom of the page, ie. expand the page to leave just enough space for the footer
  - [ ] Add the SEO metadata

## Learn

- [ ] Read the SEO next.js guide
- [ ] Read the recommended articles by Suzy

## Other

- [ ] Python script to generate SEO for each item w/ LLM
- [ ] Remove the white background from the images
- [ ] Hide the 'email' using HTML encoding
