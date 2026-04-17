export type FlywheelUnit = 'labs' | 'studios' | 'capital'

export interface ConceptItem {
  key: string
  name: string
  desc: string
}

export interface TrackItem {
  key: string
  name: string
  desc: string
}

export interface UnitData {
  name: string
  forming: boolean
  desc: string
  type: 'labs' | 'studios' | 'capital' | 'magnolia'
  concepts?: ConceptItem[]
  items?: ConceptItem[]
  gtm?: TrackItem[]
  ops?: TrackItem[]
}

export const flywheelData: Record<string, UnitData> = {
  labs: {
    name: 'Labs',
    forming: false,
    type: 'labs',
    desc: 'We go deep inside your business, identify the highest-ROI opportunities, and deploy the tools, people, and platform that execute alongside you. Labs is the engine. It is how Allenix delivers measurable revenue growth and operational efficiency to every client we take on.',
    concepts: [
      {
        key: 'strategy',
        name: 'Strategy',
        desc: 'A four-week diagnostic that maps every revenue workflow and produces a prioritized AI Opportunity Map with dollar-quantified levers. The entry point for every engagement. We tell you what to build and what to stop building.',
      },
      {
        key: 'training',
        name: 'Training',
        desc: 'In-person (ideal) and virtual workshops that meet your operators where they are. We upskill the people who have to run the system after we leave.',
      },
    ],
    gtm: [
      { key: 'positioning', name: 'Positioning', desc: 'We define exactly who you are for, what you do for them, and why you win. The foundation every other growth activity is built on.' },
      { key: 'messaging', name: 'Messaging', desc: 'We translate your positioning into words that land with your actual buyer. Pitch language, proposal language, website copy, and sales scripts.' },
      { key: 'website', name: 'Website', desc: 'We rebuild or redesign your web presence to convert the traffic you are already getting. Built for the operator buyer, not the general market.' },
      { key: 'sales-enablement', name: 'Sales Enablement', desc: 'We build the tools your sales team needs to close faster. Pitch decks, one-pagers, case studies, proposal templates, and objection guides.' },
      { key: 'crm', name: 'CRM Optimization', desc: 'We rebuild your pipeline stages to match how deals actually move, automate the follow-up no one remembers, and create dashboards the CEO actually reads.' },
      { key: 'seo', name: 'SEO / AEO', desc: 'We optimize your digital presence for both search engines and AI answer engines. Your buyers are searching. We make sure you show up.' },
    ],
    ops: [
      { key: 'proposal-automation', name: 'Proposal Automation', desc: 'An agent that generates first-draft proposals in minutes from a short intake form. Cuts proposal time from hours to minutes. One of the fastest ROI wins in any engagement.' },
      { key: 'reporting', name: 'Reporting', desc: 'We design and automate the dashboards your leadership team actually uses. Real-time P&L impact, pipeline health, and growth OS performance in one view.' },
      { key: 'document-processing', name: 'Document Processing', desc: 'Agents that read, classify, and extract data from documents that slow your team down. RFPs, contracts, submittals, invoices. The manual work disappears.' },
      { key: 'workflow-automation', name: 'Workflow Automation', desc: 'We identify the five workflows eating the most time and build agents that handle them without a human in the loop. The starting point for everything Magnolia does.' },
    ],
  },
  studios: {
    name: 'Studios',
    forming: false,
    type: 'studios',
    desc: 'Studios does two things at once. It builds the Allenix brand, making us the publication of record for operator-led growth in America. And it is a profit-generating unit that deploys that same machine for our clients, across every marketing channel that matters. Every piece of content we produce makes the next client conversation easier. Studios is not overhead. It is a business.',
    items: [
      { key: 'editorial', name: 'Editorial', desc: 'The weekly Allenix newsletter and a quarterly print magazine highlighting American founder stories. The intellectual foundation that establishes what we believe and gives operators a reason to follow us before they are ready to buy.' },
      { key: 'podcast', name: 'Podcast', desc: 'Long-form conversations with American founder-CEOs. Our guest is our warm prospect. Nothing builds trust faster than a real conversation that does not feel like a sales call.' },
      { key: 'video', name: 'Video', desc: 'Long-form and short-form educational content distributed across social media channels. Our future clients watch us practice what we preach and grow our channel in the process.' },
      { key: 'social', name: 'Social', desc: "We meet your customers on every channel they live on. LinkedIn, Instagram, X, YouTube. Each platform gets content built for how that audience consumes. One message. Every channel. No audience left behind." },
      { key: 'events', name: 'Events', desc: 'Operator dinners, roundtables, and eventually an annual conference. The highest-trust, highest-conversion channel we have. The room closes relationships that content cannot.' },
      { key: 'research', name: 'Research', desc: 'The annual State of the American Operator report. Primary data that press, policy, and investors cite. This is what makes Allenix the source of record for its market.' },
    ],
  },
  capital: {
    name: 'Capital',
    forming: true,
    type: 'capital',
    desc: 'Labs validates companies. Capital acquires them. The same platform that made them more valuable runs inside from day one of the deal. We are not a private equity firm. We are the operator buyer that understands the American mid-market better than anyone. We built it. Allenix Capital turns one great firm into a portfolio of compounding ones, each running on Magnolia, each amplified by Studios. The third act of the machine.',
    items: [],
  },
  magnolia: {
    name: 'Magnolia',
    forming: false,
    type: 'magnolia',
    desc: 'The agentic operating system that runs underneath Labs, Studios, and Capital. Magnolia is what turns a services firm into a platform company. Every Labs engagement adds to it. Every acquisition runs on it. Every piece of Studios content trains it. It is the nervous system of Allenix: the connective tissue that makes all three units stronger together than apart.',
    items: [],
  },
}
