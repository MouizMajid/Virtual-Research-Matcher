import { Moon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences.</p>
      </div>

      {/* Theme */}
      <div className="vrmm-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Appearance</h2>
        </div>
        <p className="text-sm text-muted-foreground">Toggle between light and dark mode using the theme button in the navigation bar.</p>
      </div>
    </div>
  );
}
