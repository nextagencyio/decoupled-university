// Base node type
export interface DrupalNode {
  id: string
  title: string
  path: string
  created: {
    timestamp: number
  }
  changed: {
    timestamp: number
  }
}

// Paragraph types
export interface DrupalStatItem {
  id: string
  number: string
  label: string
}

export interface DrupalHighlightItem {
  id: string
  icon?: string
  title: string
  description?: {
    processed: string
  }
}

// Homepage
export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  statsItems?: DrupalStatItem[]
  featuredProgramsTitle?: string
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Academic Program
export interface DrupalProgram extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  degreeType?: string
  department?: DrupalTerm[]
  duration?: string
  credits?: number
  image?: DrupalImage
  highlights?: DrupalHighlightItem[]
}

export interface ProgramsData {
  nodePrograms: {
    nodes: DrupalProgram[]
  }
}

// Faculty Member
export interface DrupalFaculty extends DrupalNode {
  body?: {
    processed: string
  }
  position?: string
  department?: DrupalTerm[]
  email?: string
  phone?: string
  office?: string
  photo?: DrupalImage
  researchInterests?: string[]
  education?: {
    processed: string
  }
}

export interface FacultyData {
  nodeFaculties: {
    nodes: DrupalFaculty[]
  }
}

// Campus Event
export interface DrupalEvent extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  eventDate?: {
    timestamp: number
  }
  endDate?: {
    timestamp: number
  }
  location?: string
  eventType?: DrupalTerm[]
  registrationUrl?: string
  image?: DrupalImage
}

export interface EventsData {
  nodeEvents: {
    nodes: DrupalEvent[]
  }
}

// News Article
export interface DrupalNews extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  image?: DrupalImage
  category?: DrupalTerm[]
  featured?: boolean
}

export interface NewsData {
  nodeNewsItems: {
    nodes: DrupalNews[]
  }
}

// Basic Page
export interface DrupalPage extends DrupalNode {
  body?: {
    processed: string
  }
}

// Shared types
export interface DrupalImage {
  url: string
  alt?: string
  width?: number
  height?: number
  variations?: Array<{
    name: string
    url: string
    width: number
    height: number
  }>
}

export interface DrupalTerm {
  id: string
  name: string
  path?: string
}

// Legacy compatibility - Articles (keeping for reference)
export interface DrupalArticle extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  image?: DrupalImage
  tags?: DrupalTerm[]
}

export interface ArticleTeaserData {
  nodeArticles: {
    nodes: DrupalArticle[]
  }
}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
