import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { UserPermissions } from '@/types/userProfile';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

// Define the form schema
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  permissions: z
    .object({
      canGenerateLeads: z.boolean(),
      canStartCampaigns: z.boolean(),
      canViewReports: z.boolean(),
      canManageTeam: z.boolean(),
      canManageSubscription: z.boolean(),
      canAccessAI: z.boolean(),
      canMoveCompanyTasks: z.boolean(),
      canEditCompanyProfile: z.boolean()
    })
    .refine((permissions) => Object.values(permissions).some(Boolean), {
      message: 'At least one permission must be enabled'
    })
});

type FormValues = z.infer<typeof formSchema>;

const defaultPermissions: UserPermissions = {
  canGenerateLeads: false,
  canStartCampaigns: false,
  canViewReports: false,
  canManageTeam: false,
  canManageSubscription: false,
  canAccessAI: false,
  canMoveCompanyTasks: false,
  canEditCompanyProfile: false
};

export const InviteEmployeeModal = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use react-hook-form for form management
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      permissions: defaultPermissions
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API request
      setTimeout(() => {
        toast.success(`Employee invited: ${data.email}`);
        setIsSubmitting(false);
        reset();
      }, 2000);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Invite New Employee</Button>
      </DialogTrigger>
      <DialogContent className={`rounded-lg ${theme === 'dark' ? 'dark' : ''}`}>
        <DialogHeader>
          <DialogTitle>Invite New Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input for Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter employee email"
                  className="mt-1 w-full"
                  required
                />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* UserPermissions */}
          <div className="space-y-2">
            <div className="text-sm font-semibold">Permissions</div>
            <div className="grid grid-cols-2 gap-4">
              {(
                Object.keys(defaultPermissions) as Array<keyof UserPermissions>
              ).map((permissionKey) => (
                <FormField
                  key={permissionKey}
                  control={control} // Corrected from form.control to just control
                  name={
                    `permissions.${permissionKey}` as `permissions.${keyof UserPermissions}`
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {permissionKey
                          .replace(/can/, 'Can ')
                          .replace(/([A-Z])/g, ' $1')}
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value as boolean} // Ensure it's treated as a boolean
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {errors.permissions && (
              <p className="text-sm text-red-500">
                {errors.permissions.message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="secondary"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!errors.permissions && !errors.email && isSubmitting}
            >
              {isSubmitting ? 'Inviting...' : 'Invite'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
