// SecurityModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Eye } from 'lucide-react';
import { useSecurityStore, useModalStore } from '@/lib/stores/dashboard';

export const SecurityModal: React.FC = () => {
  const {
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    currentPassword,
    newPassword,
    confirmPassword,
    toggleShowCurrentPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword
  } = useSecurityStore();

  const { isSecurityModalOpen, closeSecurityModal } = useModalStore(); // Zustand Modal state

  return (
    <Dialog open={isSecurityModalOpen} onOpenChange={closeSecurityModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Security Settings</DialogTitle>
        </DialogHeader>

        {/* Password Change Section */}
        <div className="mt-4">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Please enter your current password to change your password.
          </p>
          <div className="mt-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium">
                Current Password*
              </label>
              <Input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={toggleShowCurrentPassword}
              >
                <Eye className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">New Password*</label>
              <Input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={toggleShowNewPassword}
              >
                <Eye className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">
                Confirm New Password*
              </label>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={toggleShowConfirmPassword}
              >
                <Eye className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <Button variant="outline" onClick={closeSecurityModal}>
              Cancel
            </Button>
            <Button className="bg-blue-600 text-white">Update Password</Button>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Two-Factor Authentication Section */}
        <div>
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Secure your account by enabling 2FA using SMS or an Authenticator
            app.
          </p>
          <div className="mt-4 space-y-4">
            <Button variant="secondary" className="w-full">
              Enable via SMS
            </Button>
            <Button variant="secondary" className="w-full">
              Enable via Authenticator App
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
