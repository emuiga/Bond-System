import { MembershipProvider } from '@/contexts/membership-context'

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MembershipProvider>
      {children}
    </MembershipProvider>
  )
}

