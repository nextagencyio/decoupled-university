import { gql } from '@apollo/client'

// Homepage query with stats
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        statsItems {
          ... on ParagraphStatItem {
            id
            number
            label
          }
        }
        featuredProgramsTitle
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

// Academic Programs
export const GET_PROGRAMS = gql`
  query GetPrograms($first: Int = 20) {
    nodePrograms(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeProgram {
          body {
            processed
            summary
          }
          degreeType
          department {
            ... on TermInterface {
              id
              name
            }
          }
          duration
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
          highlights {
            ... on ParagraphHighlightItem {
              id
              icon
              title
              description {
                processed
              }
            }
          }
        }
      }
    }
  }
`

export const GET_PROGRAM_BY_PATH = gql`
  query GetProgramByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeProgram {
            id
            title
            path
            body {
              processed
            }
            degreeType
            department {
              ... on TermInterface {
                id
                name
              }
            }
            duration
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            highlights {
              ... on ParagraphHighlightItem {
                id
                icon
                title
                description {
                  processed
                }
              }
            }
          }
        }
      }
    }
  }
`

// Faculty
export const GET_FACULTY = gql`
  query GetFaculty($first: Int = 50) {
    nodeFaculties(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeFaculty {
          body {
            processed
          }
          position
          department {
            ... on TermInterface {
              id
              name
            }
          }
          email
          phone
          office
          photo {
            url
            alt
            width
            height
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          researchInterests
          education {
            processed
          }
        }
      }
    }
  }
`

export const GET_FACULTY_BY_PATH = gql`
  query GetFacultyByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeFaculty {
            id
            title
            path
            body {
              processed
            }
            position
            department {
              ... on TermInterface {
                id
                name
              }
            }
            email
            phone
            office
            photo {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            researchInterests
            education {
              processed
            }
          }
        }
      }
    }
  }
`

// Events
export const GET_EVENTS = gql`
  query GetEvents($first: Int = 20) {
    nodeEvents(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeEvent {
          body {
            processed
            summary
          }
          eventDate {
            timestamp
          }
          endDate {
            timestamp
          }
          location
          eventType {
            ... on TermInterface {
              id
              name
            }
          }
          registrationUrl
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_EVENT_BY_PATH = gql`
  query GetEventByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeEvent {
            id
            title
            path
            body {
              processed
            }
            eventDate {
              timestamp
            }
            endDate {
              timestamp
            }
            location
            eventType {
              ... on TermInterface {
                id
                name
              }
            }
            registrationUrl
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// News
export const GET_NEWS = gql`
  query GetNews($first: Int = 20) {
    nodeNewsItems(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeNews {
          body {
            processed
            summary
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          category {
            ... on TermInterface {
              id
              name
            }
          }
          featured
        }
      }
    }
  }
`

export const GET_NEWS_BY_PATH = gql`
  query GetNewsByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeNews {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            category {
              ... on TermInterface {
                id
                name
              }
            }
            featured
          }
        }
      }
    }
  }
`

// Generic route query for pages and other content
export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeProgram {
            id
            title
            path
            body {
              processed
            }
            degreeType
            department {
              ... on TermInterface {
                id
                name
              }
            }
            duration
            highlights {
              ... on ParagraphHighlightItem {
                id
                icon
                title
                description {
                  processed
                }
              }
            }
          }
          ... on NodeFaculty {
            id
            title
            path
            body {
              processed
            }
            position
            department {
              ... on TermInterface {
                id
                name
              }
            }
            email
            phone
            office
            researchInterests
            education {
              processed
            }
          }
          ... on NodeEvent {
            id
            title
            path
            body {
              processed
            }
            eventDate {
              timestamp
            }
            endDate {
              timestamp
            }
            location
            eventType {
              ... on TermInterface {
                id
                name
              }
            }
            registrationUrl
          }
          ... on NodeNews {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            category {
              ... on TermInterface {
                id
                name
              }
            }
            featured
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredProgramsTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`

// Featured programs for homepage (limit to 3)
export const GET_FEATURED_PROGRAMS = gql`
  query GetFeaturedPrograms {
    nodePrograms(first: 3, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeProgram {
          degreeType
          department {
            ... on TermInterface {
              id
              name
            }
          }
          duration
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

// Featured news for homepage
export const GET_FEATURED_NEWS = gql`
  query GetFeaturedNews {
    nodeNewsItems(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeNews {
          body {
            summary
          }
          image {
            url
            alt
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          category {
            ... on TermInterface {
              id
              name
            }
          }
          featured
        }
      }
    }
  }
`

// Upcoming events for homepage
export const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents {
    nodeEvents(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeEvent {
          eventDate {
            timestamp
          }
          location
          eventType {
            ... on TermInterface {
              id
              name
            }
          }
        }
      }
    }
  }
`
