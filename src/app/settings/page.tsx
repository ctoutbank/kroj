"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User, Bell, Palette, Globe, Save, Moon, Sun, Monitor,
  BookOpen, FileDown, Shield, LogOut, HardDrive,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-6 py-6 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-lg">
            <TabsTrigger value="profile" className="text-xs"><User className="h-3.5 w-3.5 mr-1" /> Profile</TabsTrigger>
            <TabsTrigger value="preferences" className="text-xs"><Palette className="h-3.5 w-3.5 mr-1" /> Editor</TabsTrigger>
            <TabsTrigger value="export" className="text-xs"><FileDown className="h-3.5 w-3.5 mr-1" /> Export</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs"><Bell className="h-3.5 w-3.5 mr-1" /> Alerts</TabsTrigger>
            <TabsTrigger value="account" className="text-xs"><Shield className="h-3.5 w-3.5 mr-1" /> Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle className="text-base">Profile Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">DL</div>
                  <div>
                    <Button variant="outline" size="sm" className="text-xs">Change Photo</Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1 block">First Name</label><Input defaultValue="Denison" /></div>
                  <div><label className="text-sm font-medium mb-1 block">Last Name</label><Input defaultValue="Zimmer da Luz" /></div>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Email</label><Input defaultValue="denisonzl@gmail.com" readOnly className="text-muted-foreground" /></div>
                <div><label className="text-sm font-medium mb-1 block">Pen Name</label><Input placeholder="Your pen name (used in exports)" /></div>
                <div><label className="text-sm font-medium mb-1 block">Bio</label><textarea className="w-full h-20 rounded-md border px-3 py-2 text-sm resize-none" placeholder="A brief bio about you..." /></div>
                <Button className="gap-1.5"><Save className="h-4 w-4" /> Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader><CardTitle className="text-base">Editor Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                <SettingRow label="Theme" description="Choose your preferred interface theme">
                  <div className="flex gap-1">
                    {[{ icon: Sun, label: "Light" }, { icon: Moon, label: "Dark" }, { icon: Monitor, label: "System" }].map((t) => (
                      <Button key={t.label} variant="outline" size="sm" className="h-8 gap-1 text-xs"><t.icon className="h-3.5 w-3.5" />{t.label}</Button>
                    ))}
                  </div>
                </SettingRow>
                <Separator />
                <SettingRow label="Auto-save" description="Automatically save your work as you type"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Spell Check" description="Enable browser spell checking in the editor"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Typewriter Mode" description="Keep the cursor centered on screen while typing"><Switch /></SettingRow>
                <Separator />
                <SettingRow label="Focus Mode" description="Dim everything except the current paragraph"><Switch /></SettingRow>
                <Separator />
                <SettingRow label="Show Word Count" description="Display word count in the bottom bar"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Smart Quotes" description="Automatically convert straight quotes to curly quotes"><Switch defaultChecked /></SettingRow>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card>
              <CardHeader><CardTitle className="text-base">Default Export Settings</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                <SettingRow label="Default Format" description="Format used when clicking quick export">
                  <div className="flex gap-1">
                    {["ePub", "PDF", "DOCX"].map((f) => (
                      <Button key={f} variant={f === "ePub" ? "default" : "outline"} size="sm" className="h-7 text-xs">{f}</Button>
                    ))}
                  </div>
                </SettingRow>
                <Separator />
                <SettingRow label="Embed Fonts" description="Bundle fonts in your ePub exports"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Include Cover" description="Add cover image to exports"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Include TOC" description="Generate a table of contents"><Switch defaultChecked /></SettingRow>
                <Separator />
                <div>
                  <label className="text-sm font-medium mb-1 block">Default Trim Size</label>
                  <div className="flex gap-1">
                    {['5"x8"', '5.5"x8.5"', '6"x9"'].map((s) => (
                      <Button key={s} variant={s === '5.5"x8.5"' ? "default" : "outline"} size="sm" className="h-7 text-xs">{s}</Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                <SettingRow label="Email Notifications" description="Receive email for important updates"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Collaboration Alerts" description="Notify when collaborators make changes"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Comment Replies" description="Notify when someone replies to your comments"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Export Complete" description="Notify when book export finishes"><Switch defaultChecked /></SettingRow>
                <Separator />
                <SettingRow label="Weekly Digest" description="Receive a weekly summary of your writing activity"><Switch /></SettingRow>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader><CardTitle className="text-base">Account</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Storage</p>
                      <p className="text-xs text-muted-foreground">128 MB of 5 GB used</p>
                    </div>
                  </div>
                  <div className="w-32 bg-muted rounded-full h-2"><div className="bg-primary rounded-full h-2" style={{ width: "2.5%" }} /></div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Plan</p>
                    <p className="text-xs text-muted-foreground">Free tier — 5 books, 5 GB storage</p>
                  </div>
                  <Badge variant="secondary">Free</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Change Password</p>
                    <p className="text-xs text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">Change</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-destructive">Delete Account</p>
                    <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm" className="text-xs gap-1"><LogOut className="h-3 w-3" /> Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function SettingRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">K</div>
          <span className="font-semibold text-lg tracking-tight">Kroj</span>
        </Link>
        <nav className="ml-8 flex items-center gap-1">
          <Link href="/"><Button variant="ghost" size="sm" className="text-muted-foreground">Home</Button></Link>
          <Link href="/books"><Button variant="ghost" size="sm" className="text-muted-foreground">My Books</Button></Link>
          <Link href="/collaboration"><Button variant="ghost" size="sm" className="text-muted-foreground">Collaboration</Button></Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">DL</div>
        </div>
      </div>
    </header>
  );
}
