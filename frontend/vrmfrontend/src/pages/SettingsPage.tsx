import { Eye, EyeOff, Moon, Shield } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import api from "../lib/api";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

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
      <div className="vrmm-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Change Password</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <Label>Current Password</Label>
            <div className="relative">
              <Input
                {...register("currentPassword", { required: "Current password is required" })}
                type={showCurrent ? "text" : "password"}
                className="pr-10"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-xs text-destructive mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>New Password</Label>
            <div className="relative">
              <Input
                {...register("newPassword", {
                  required: "New password is required",
                  validate: (value) => PASSWORD_REGEX.test(value) || "Password must be at least 6 characters with an uppercase letter and special character"
                })}
                type={showNew ? "text" : "password"}
                className="pr-10"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-xs text-destructive mt-1">{errors.newPassword.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Confirm New Password</Label>
            <div className="relative">
              <Input
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) => value === newPassword || "Passwords do not match"
                })}
                type={showConfirm ? "text" : "password"}
                className="pr-10"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
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
