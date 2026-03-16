import PortfolioHeader from '@/components/portfolio-header'
import PortfolioAbout from '@/components/portfolio-about'
import PortfolioExperience from '@/components/portfolio-experience'
import PortfolioProjects from '@/components/portfolio-projects'
import PortfolioSkills from '@/components/portfolio-skills'
import PortfolioFooter from '@/components/portfolio-footer'

interface PortfolioData {
  personal: {
    name: string
    title: string
    tagline: string
    bio: string
    currentRole: string
    currentRoleDescription: string
    email: string
    location: string
  }
  about: {
    title: string
    sections: string[]
  }
  experience: Array<{
    period: string
    title: string
    company: string
    description: string
    skills: string[]
  }>
  projects: Array<{
    id: number
    title: string
    description: string
    longDescription: string
    image: string
    tags: string[]
    link: string
    featured: boolean
  }>
  skills: Array<{
    category: string
    items: string[]
  }>
  social: Array<{
    name: string
    url: string
    icon: string
  }>
}

async function getPortfolioData(): Promise<PortfolioData> {
  const fs = await import('fs').then(m => m.promises)
  const path = await import('path').then(m => m.default)
  
  const filePath = path.join(process.cwd(), 'public', 'portfolio.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

export const metadata = {
  title: 'Portfolio | Developer',
  description: 'Professional portfolio showcasing projects and experience',
  openGraph: {
    title: 'Portfolio | Developer',
    description: 'Professional portfolio showcasing projects and experience',
  },
}

export default async function Home() {
  const portfolioData = await getPortfolioData()

  return (
    <main className="bg-slate-900 min-h-screen">
      <PortfolioHeader data={portfolioData} />
      <PortfolioAbout data={portfolioData} />
      <PortfolioExperience data={portfolioData} />
      <PortfolioProjects data={portfolioData} />
      <PortfolioSkills data={portfolioData} />
      <PortfolioFooter data={portfolioData} />
    </main>
  )
}
