import { AuthGuard } from "@/components/auth-guard"

export default function ShowcasePage() {
  return (
    <AuthGuard>
      <div>
        <h1>Showcase Page</h1>
        <p>This is the showcase page for administrators.</p>
      </div>
    </AuthGuard>
  )
}
