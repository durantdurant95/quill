"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "@supabase/supabase-js";
import { Download, FileText, HardDrive, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DataSettingsProps {
  user: User;
}

export function DataSettings({ user }: DataSettingsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    // Simulate data export process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExporting(false);
    toast.success(
      "Data export started. You'll receive an email when it's ready."
    );
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    // Simulate account deletion process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDeleting(false);
    toast.success(
      "Account deletion initiated. You'll receive a confirmation email."
    );
  };

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Download className="h-5 w-5 text-muted-foreground" />
          <div>
            <Label className="text-sm font-medium">Export your data</Label>
            <p className="text-xs text-muted-foreground">
              Download a copy of all your data
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleExportData}
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Export data"}
        </Button>
      </div>

      {/* Storage Usage */}
      <div className="p-4 border rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <HardDrive className="h-5 w-5 text-muted-foreground" />
          <Label className="text-sm font-medium">Storage Usage</Label>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Documents</span>
            <span>2.3 MB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Media files</span>
            <span>15.7 MB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Other data</span>
            <span>0.8 MB</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Total used</span>
              <span>18.8 MB</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: "18.8%" }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">
            18.8 MB of 100 MB used
          </p>
        </div>
      </div>

      {/* Data Retention */}
      <div className="p-4 border rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <Label className="text-sm font-medium">Data Retention</Label>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Account data is retained while your account is active</p>
          <p>
            • Account created: {new Date(user.created_at).toLocaleDateString()}
          </p>
          <p>• Deleted items are permanently removed after 30 days</p>
          <p>• Export data before account deletion for backup</p>
        </div>
      </div>

      {/* Delete Account */}
      <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
        <div className="flex items-center space-x-3">
          <Trash2 className="h-5 w-5 text-destructive" />
          <div>
            <Label className="text-sm font-medium text-destructive">
              Delete account
            </Label>
            <p className="text-xs text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Delete account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
