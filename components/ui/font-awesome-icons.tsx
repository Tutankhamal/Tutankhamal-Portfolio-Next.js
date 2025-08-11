"use client"

interface FontAwesomeIconProps {
  icon: string
  size?: number
  className?: string
}

export const FontAwesomeIcon = ({ icon, size = 24, className = "" }: FontAwesomeIconProps) => {
  return <i className={`${icon} ${className}`} style={{ fontSize: `${size}px` }} aria-hidden="true" />
}

// Specific brand icons for better type safety
export const DiscordIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <FontAwesomeIcon icon="fab fa-discord" size={size} className={className} />
)

export const SteamIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <FontAwesomeIcon icon="fab fa-steam" size={size} className={className} />
)

export const SoundCloudIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <FontAwesomeIcon icon="fab fa-soundcloud" size={size} className={className} />
)

export const GitHubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <FontAwesomeIcon icon="fab fa-github" size={size} className={className} />
)

export const LinkedInIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <FontAwesomeIcon icon="fab fa-linkedin" size={size} className={className} />
)

export const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <FontAwesomeIcon icon="fab fa-instagram" size={size} className={className} />
)

export const YouTubeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <FontAwesomeIcon icon="fab fa-youtube" size={size} className={className} />
)
