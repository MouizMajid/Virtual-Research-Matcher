import { Bell, Eye, EyeOff, Moon, Shield, Trash2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import api from "../lib/api";
import { toast } from "sonner";

type PasswordFormFields = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

export default function SettingsPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormFields>();

  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<PasswordFormFields> = async (formdata) => {
    try {
      await api.patch("/users/change-password", {
        currentPassword: formdata.currentPassword,
        newPassword: formdata.newPassword,
      });
      toast.success("Password updated", {
        description: "Your password has been changed successfully.",
      });
      reset();
    } catch (error: any) {
      const message = error?.response?.data;
      if (typeof message === "string" && message.toLowerCase().includes("current password")) {
        setError("currentPassword", { message });
      } else {
        toast.error("Failed to update password", {
          description: typeof message === "string" ? message : "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences.</p>
      </div>

      {/* Password */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Change Password</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium mb-1.5">Current Password</label>
            <div className="relative">
              <input
                {...register("currentPassword", { required: "Current password is required" })}
                type={showCurrent ? "text" : "password"}
                className="h-10 w-full rounded-xl border border-input bg-card px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.currentPassword && <p className="ml-1 text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">New Password</label>
            <div className="relative">
              <input
                {...register("newPassword", {
                  required: "New password is required",
                  validate: (value) => PASSWORD_REGEX.test(value) || "Password must meet all requirements"
                })}
                type={showNew ? "text" : "password"}
                className="h-10 w-full rounded-xl border border-input bg-card px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.newPassword && <p className="ml-1 text-xs text-red-500 mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) => value === newPassword || "Passwords do not match"
                })}
                type={showConfirm ? "text" : "password"}
                className="h-10 w-full rounded-xl border border-input bg-card px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="ml-1 text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: "Email notifications", desc: "Receive email updates about your applications" },
            { label: "Application updates", desc: "Get notified when application status changes" },
            { label: "New project matches", desc: "Be alerted about new projects matching your skills" },
            { label: "Marketing emails", desc: "Receive tips and platform updates" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button className={`relative h-6 w-11 rounded-full transition-colors ${i < 3 ? "bg-primary" : "bg-muted"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-primary-foreground shadow transition-transform ${i < 3 ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Appearance</h2>
        </div>
        <p className="text-sm text-muted-foreground">Toggle between light and dark mode using the theme button in the navigation bar.</p>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border-2 border-destructive/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="h-5 w-5 text-destructive" />
          <h2 className="font-semibold text-destructive">Danger Zone</h2>
        </div>
        <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button className="mt-4 rounded-xl border border-destructive bg-destructive/10 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/20 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
