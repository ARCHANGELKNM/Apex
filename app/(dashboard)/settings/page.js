"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ProfileForm } from "@/components/settings/profile-form";
// import { AccountForm } from "@/components/settings/account-form";

export default function SettingsPage() {
  return (
    <div className="p-10 max-w-4xl space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <Tabs defaultValue="profile" className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <TabsList className="flex lg:flex-col bg-transparent lg:space-y-1 justify-start h-auto p-0">
            <TabsTrigger value="profile" className="justify-start px-4 py-2 hover:bg-muted w-full data-[state=active]:bg-muted">Profile</TabsTrigger>
            <TabsTrigger value="account" className="justify-start px-4 py-2 hover:bg-muted w-full data-[state=active]:bg-muted">Account</TabsTrigger>
            <TabsTrigger value="billing" className="justify-start px-4 py-2 hover:bg-muted w-full data-[state=active]:bg-muted">Billing</TabsTrigger>
          </TabsList>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <TabsContent value="profile" className="space-y-6">
            {/* <ProfileForm /> */}
          </TabsContent>
          <TabsContent value="account" className="space-y-6">
            {/* <AccountForm /> */}
          </TabsContent>
          <TabsContent value="billing">
            <div className="border rounded-lg p-6 bg-zinc-50/50">
              <h4 className="font-medium mb-2">Current Plan: Elite</h4>
              <p className="text-sm text-muted-foreground mb-4">You are on the single-tier paid plan with unlimited AI grading.</p>
              {/* Future Stripe Portal Link */}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
