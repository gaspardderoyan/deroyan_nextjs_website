# Next.js Art Gallery Website

## Roadmap

- [ ] Fix the filters layout on mobile
- [ ] Re-do the ItemGrid component
  - [x] Don't display the bullet points
  - [x] Remove the hover effect, just add the title below the image
  - [x] Switch to using <Link> instead of the router ? Will it preload the page inside/images?
  - [x] Add an animation when loading the images
  - [ ] Generate the pages for the 3 main types statically
  - [x] Fix the single item when 2 wide
  - [ ] add the seo metadata
  - [ ] use smaller images? maybe depending on the screen size?
  - [ ] Re-do the way I fetch items for the collection page
    - [ ] Use server-side fetching and rendering, but not static generation
    - [ ] Add the filters, as well as the locale, as parameters to the fetchItems function
  - [ ] Less wide UI for the collection page
- [ ] Implement localization
  - [x] filters
  - [x] footer
  - [x] navbar
  - [ ] item page
  - [ ] collection page
  - [ ] Fix the locale switcher button to work with the query filters in the URL
- [ ] Home Page
  - [ ] Component to display a few items from the collection, maybe randomly + a link to the full collection
  - [ ] implement a basic UI
- [ ] Item Page

  - [ ] make the footer be on the bottom of the page, ie. expand the page to leave just enough space for the footer
  - [ ] Add the SEO metadata

- [ ] Permanent redirects from the previous website for both EN and FR

## Learn

- [ ] Read the SEO next.js guide
- [ ] Read the recommended articles by Suzy

## Other

- [ ] Python script to generate SEO for each item w/ LLM
- [ ] Remove the white background from the images
- [ ] Hide the 'email' using HTML encoding
- [ ] fix the texts for the items
