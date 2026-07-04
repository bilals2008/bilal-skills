export interface Skill {
  slug: string
  name: string
  description: string
  category: string
  tags: string[]
  installCmd: string
  author: string
  skillContent: string
  examples?: SkillExample[]
}

export interface SkillExample {
  title: string
  description: string
  code: string
  language: string
}
