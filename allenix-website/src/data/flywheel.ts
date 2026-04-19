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
        desc: 'Maps every revenue workflow. Produces a prioritized AI Opportunity Map with dollar-quantified levers. The entry point for every engagement.',
      },
      {
        key: 'training',
        name: 'Training',
        desc: 'In-person and virtual workshops that upskill your operators on every agent we build. Some clients start here.',
      },
    ],
    gtm: [
      { key: 'positioning', name: 'Positioning', desc: 'We define who you are for, what you do, and why you win. Everything else is built on this.' },
      { key: 'messaging', name: 'Messaging', desc: 'We translate your positioning into words that land with your buyer. Pitch language, proposals, website copy, and sales scripts.' },
      { key: 'website', name: 'Website', desc: 'We rebuild your web presence to convert the traffic you already have. Built for the operator buyer.' },
      { key: 'sales-enablement', name: 'Sales Enablement', desc: 'We build the tools your team needs to close faster. Decks, case studies, proposal templates, and objection guides.' },
      { key: 'crm', name: 'CRM Optimization', desc: 'We rebuild your pipeline, automate follow-up, and create dashboards the CEO actually reads.' },
      { key: 'seo', name: 'SEO / AEO', desc: 'We optimize your presence for search engines and AI answer engines. Your buyers are searching. We make sure you appear.' },
    ],
    ops: [
      { key: 'proposal-automation', name: 'Proposal Automation', desc: 'An agent that generates first-draft proposals from a short intake form. Cuts proposal time from hours to minutes.' },
      { key: 'reporting', name: 'Reporting', desc: 'We automate the dashboards your leadership actually uses. Pipeline health, P&L impact, and performance in one view.' },
      { key: 'document-processing', name: 'Document Processing', desc: 'Agents that read, classify, and extract data from slow documents. RFPs, contracts, invoices. The manual work disappears.' },
      { key: 'workflow-automation', name: 'Workflow Automation', desc: 'We identify the workflows eating the most time and build agents that handle them without a human in the loop.' },
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
