export default function EmailShareButton() {
  return (
    <a
      href="mailto:?subject=The%20Allenix%20Manifesto&body=Thought%20you%27d%20want%20to%20read%20this%3A%20https%3A%2F%2Fallenix.com%2Fmanifesto"
      className="font-mono email-share-btn"
      aria-label="Share by email"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      Email
    </a>
  )
}
