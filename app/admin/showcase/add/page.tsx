import { AuthGuard } from "@/components/auth-guard"

export default function AddShowcasePage() {
  return (
    <AuthGuard>
      <div>
        <h1>Add Showcase</h1>
        {/* Add your form or content for adding a showcase item here */}
      </div>
    </AuthGuard>
  )
}
